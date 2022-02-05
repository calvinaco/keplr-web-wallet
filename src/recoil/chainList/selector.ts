import { ChainConfig } from '../../apptypes.d';
import { defaultChainList } from '../../config';
import customChainListAtom from '../customChainList/atom';
import { RecoilValueReadOnly, selector } from 'recoil';

const chainListSelector: RecoilValueReadOnly<ChainConfig[]> = selector({
  key: 'chainList',
  get: ({ get }): ChainConfig[] => {
    const customChainList = get(customChainListAtom);
    return [...defaultChainList, ...customChainList];
  },
});

export default chainListSelector;
