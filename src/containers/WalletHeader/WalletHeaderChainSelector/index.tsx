import { ChainConfig } from '../../../apptypes.d';
import ChainSelect from '../../../components/ChainSelect';
import chainListSelector from '../../../recoil/chainList/selector';
import currentChainAtom from '../../../recoil/currentChain';
import React, { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

function WalletHeaderChainSelector() {
  const [currentChain, setCurrentChain] = useRecoilState(currentChainAtom);
  const chainList = useRecoilValue(chainListSelector);

  const handleChainSelectorChange = useCallback((chain: ChainConfig) => {
    setCurrentChain(chain);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ChainSelect
      value={currentChain.id}
      chainList={chainList}
      onChange={handleChainSelectorChange}
    />
  );
}

export default WalletHeaderChainSelector;
