import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Chain, ChainSource } from '../../../apptypes.d';
import ChainSelector from '../../../components/ChainSelector';
import KeplrConfigs from '../../../config/keplrConfigs';
import { errorMessageGuard } from '../../../error';
import chainListSelector from '../../../recoil/chainList/selector';
import currentChainAtom from '../../../recoil/currentChain';
import { addChainToKeplr } from '../../../service/keplr';

function WalletHeaderChainSelector() {
  const { enqueueSnackbar } = useSnackbar();
  const [currentChain, setCurrentChain] = useRecoilState(currentChainAtom);
  const chainList = useRecoilValue(chainListSelector);

  const handleChainSelectorChange = useCallback((chain: Chain) => {
    (async () => {
      if (chain.source === ChainSource.AppDefault) {
        try {
          await addChainToKeplr(KeplrConfigs[chain.id]);
        } catch (err) {
          const message = errorMessageGuard(err);
          enqueueSnackbar(`error suggesting custom chain ${chain.name} to Keplr: ${message}`, {
            variant: 'error',
          });
          return;
        }
      }
      setCurrentChain(chain);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ChainSelector
      currentChain={currentChain}
      chainList={chainList}
      onChange={handleChainSelectorChange}
    />
  );
}

export default WalletHeaderChainSelector;
