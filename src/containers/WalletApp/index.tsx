import { styled } from '@mui/system';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useRef } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilCallback, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { WalletType } from '../../apptypes.d';
import { errorMessageGuard } from '../../error';
import balanceOfSelectorFamily, { allBalanceOfSelector } from '../../recoil/balanceOf';
import currentChainAtom from '../../recoil/currentChain';
import currentWalletAtom from '../../recoil/currentWallet';
import isPendingToConnectKeplrAtom from '../../recoil/isPendingToConnectKeplr';
import { getAccountTokenBalanceList } from '../../service/cosmos';
import WalletMain from '../WalletMain';
import Layout from './Layout';

const Container = styled('div')({
  borderRadius: 4,
  backgroundColor: '#fff',
});

function WalletApp() {
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const navigate = useNavigate();

  const [isPendingToConnectKeplr, setIsPendingToConnectKeplr] = useRecoilState(
    isPendingToConnectKeplrAtom,
  );
  const [currentWallet, setCurrentWallet] = useRecoilState(currentWalletAtom);
  const resetCurrentWallet = useResetRecoilState(currentWalletAtom);
  const allBalanceOf = useRecoilValue(allBalanceOfSelector);
  const resetAllBalanceOf = useResetRecoilState(allBalanceOfSelector);
  const currentChain = useRecoilValue(currentChainAtom);

  console.log(allBalanceOf);

  const isConnectingKeplr = useRef(false);
  const connectKeplr = useCallback(
    () =>
      (async () => {
        resetCurrentWallet();
        resetAllBalanceOf();
        isConnectingKeplr.current = true;
        try {
          await window.keplr!.enable(currentChain.id);
        } catch (err) {
          const message = errorMessageGuard(err);
          enqueueSnackbar(`Error connecting Keplr wallet: ${message}`, {
            variant: 'error',
          });
          return;
        }

        try {
          const key = await window.keplr!.getKey(currentChain.id);
          setCurrentWallet({
            name: key.name,
            type: key.isNanoLedger ? WalletType.Ledger : WalletType.Local,
            address: key.bech32Address,
          });
        } catch (err) {
          const message = errorMessageGuard(err);
          enqueueSnackbar(`Error requesting Keplr key: ${message}`, {
            variant: 'error',
          });
          return;
        }

        await updateCurrentWallet();
      })().finally(() => {
        isConnectingKeplr.current = false;
        setIsPendingToConnectKeplr(false);
      }),
    [currentChain], // eslint-disable-line react-hooks/exhaustive-deps
  );
  const updateCurrentWallet = useCallback(
    () =>
      (async () => {
        try {
          const key = await window.keplr!.getKey(currentChain.id);
          setCurrentWallet({
            name: key.name,
            type: key.isNanoLedger ? WalletType.Ledger : WalletType.Local,
            address: key.bech32Address,
          });
        } catch (err) {
          const message = errorMessageGuard(err);
          enqueueSnackbar(`Error requesting Keplr key: ${message}`, {
            variant: 'error',
          });
          return;
        }
      })(),
    [currentChain], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const updateWalletBalances = useRecoilCallback(
    ({ set }) =>
      () =>
        (async () => {
          if (currentWallet === null) {
            return;
          }
          try {
            const tokenBalanceList = await getAccountTokenBalanceList(
              currentChain.rpcBaseURLs.lcd,
              currentWallet!.address,
            );
            tokenBalanceList.forEach((tokenBalance) => {
              set(balanceOfSelectorFamily(tokenBalance.denom), tokenBalance);
            });
          } catch (err) {
            const message = errorMessageGuard(err);
            enqueueSnackbar(`Error retrieving wallet balances: ${message}`, {
              variant: 'error',
            });
          }
        })(),
    [currentChain, currentWallet], // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    window.addEventListener('keplr_keystorechange', (event) => {
      connectKeplr();
    });
  });

  useEffect(() => {
    setIsPendingToConnectKeplr(true);
  }, [currentChain]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isPendingToConnectKeplr && !isConnectingKeplr.current) {
      connectKeplr();
    }
  }, [isPendingToConnectKeplr]); // eslint-disable-line react-hooks/exhaustive-deps

  let lastWalletAddress = useRef(currentWallet?.address);
  useEffect(() => {
    console.log(140);
    if (lastWalletAddress.current !== currentWallet?.address) {
      lastWalletAddress.current = currentWallet?.address;
      updateWalletBalances();
    }
  }, [currentWallet]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WalletMain />} />
      </Route>
    </Routes>
  );
}

export default WalletApp;
