import { ChainSource, WalletType } from '../../apptypes.d';
import { keplrConfigs } from '../../config';
import { errorMessageGuard } from '../../error';
import balanceOfSelectorFamily, { allBalanceOfSelector } from '../../recoil/balanceOf';
import currentChainAtom from '../../recoil/currentChain';
import currentWalletAtom from '../../recoil/currentWallet';
import isPendingToConnectKeplrAtom from '../../recoil/isPendingToConnectKeplr';
import { getAccountCoinList } from '../../service/cosmos';
import { addChainToKeplr } from '../../service/keplr';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useRef } from 'react';
import { useRecoilCallback, useRecoilState, useResetRecoilState } from 'recoil';

function WalletAppStateEffect() {
  const { enqueueSnackbar } = useSnackbar();

  const [isPendingToConnectKeplr, setIsPendingToConnectKeplr] = useRecoilState(
    isPendingToConnectKeplrAtom,
  );
  const [currentWallet, setCurrentWallet] = useRecoilState(currentWalletAtom);
  const resetCurrentWallet = useResetRecoilState(currentWalletAtom);
  const resetAllBalanceOf = useResetRecoilState(allBalanceOfSelector);
  const [currentChain, setCurrentChain] = useRecoilState(currentChainAtom);

  const prevChain = useRef(currentChain);
  useEffect(() => {
    (async () => {
      if (currentChain.source === ChainSource.AppDefault) {
        try {
          await addChainToKeplr(keplrConfigs[currentChain.id]);
        } catch (err) {
          setCurrentChain(prevChain.current);

          const message = errorMessageGuard(err);
          enqueueSnackbar(
            `Error suggesting custom chain ${currentChain.name} to Keplr: ${message}`,
            {
              variant: 'error',
            },
          );
          return;
        }
      }
      prevChain.current = currentChain;

      setIsPendingToConnectKeplr(true);
    })();
  }, [enqueueSnackbar, setCurrentChain, setIsPendingToConnectKeplr, currentChain]);

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
    [currentChain, enqueueSnackbar, setCurrentWallet],
  );

  const isConnectingKeplr = useRef(false);
  const connectKeplr = useCallback(
    () =>
      (async () => {
        if (isConnectingKeplr.current) {
          return;
        }
        isConnectingKeplr.current = true;

        resetCurrentWallet();
        resetAllBalanceOf();
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
    [
      currentChain,
      enqueueSnackbar,
      setIsPendingToConnectKeplr,
      resetCurrentWallet,
      resetAllBalanceOf,
      updateCurrentWallet,
      setCurrentWallet,
    ],
  );

  const updateWalletBalances = useRecoilCallback(
    ({ set }) =>
      () =>
        (async () => {
          if (currentWallet === null) {
            return;
          }
          try {
            const tokenBalanceList = await getAccountCoinList(
              currentChain.rpcBaseURLs.lcd,
              currentWallet!.address,
            );
            tokenBalanceList.forEach((coin) => {
              set(balanceOfSelectorFamily(coin.denom), coin);
            });
          } catch (err) {
            const message = errorMessageGuard(err);
            enqueueSnackbar(`Error retrieving wallet balances: ${message}`, {
              variant: 'error',
            });
          }
        })(),
    [currentChain, currentWallet, enqueueSnackbar],
  );

  useEffect(() => {
    if (isPendingToConnectKeplr) {
      connectKeplr();
    }
  }, [isPendingToConnectKeplr, connectKeplr]);

  useEffect(() => {
    window.addEventListener('keplr_keystorechange', (event) => {
      connectKeplr();
    });
  }, [connectKeplr]);

  let prevWalletAddress = useRef(currentWallet?.address);
  useEffect(() => {
    if (prevWalletAddress.current !== currentWallet?.address) {
      prevWalletAddress.current = currentWallet?.address;
      updateWalletBalances();
    }
  }, [currentWallet, updateWalletBalances]);

  return null;
}

export default WalletAppStateEffect;
