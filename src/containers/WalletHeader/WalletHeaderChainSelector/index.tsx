import React, { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Chain } from '../../../apptypes.d';
import ChainSelect from '../../../components/ChainSelect';
import chainListSelector from '../../../recoil/chainList/selector';
import currentChainAtom from '../../../recoil/currentChain';

function WalletHeaderChainSelector() {
  const [currentChain, setCurrentChain] = useRecoilState(currentChainAtom);
  const chainList = useRecoilValue(chainListSelector);

  const handleChainSelectorChange = useCallback((chain: Chain) => {
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
