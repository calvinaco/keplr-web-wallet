import React, { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ChainConfig } from '../../../apptypes.d';
import ChainSelector from '../../../components/ChainSelector';
import chainListSelector from '../../../recoil/chainList/selector';
import currentChainAtom from '../../../recoil/currentChain';

function WalletHeaderChainSelector() {
  const [currentChain, setCurrentChain] = useRecoilState(currentChainAtom);
  const chainList = useRecoilValue(chainListSelector);

  const handleChainSelectorChange = useCallback((chain: ChainConfig) => {
    setCurrentChain(chain);
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
