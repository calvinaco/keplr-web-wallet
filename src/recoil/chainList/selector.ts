import { selector, RecoilValueReadOnly } from 'recoil';
import { Chain } from '../../apptypes.d';
import { defaultChainList } from '../../config';
import customChainListAtom from '../customChainList/atom';

const chainListSelector: RecoilValueReadOnly<Chain[]> = selector({
  key: 'chainList',
  get: ({ get }): Chain[] => {
    const customChainList = get(customChainListAtom);
    return [
      ...defaultChainList,
      ...customChainList,
    ];
  }  
});

export default chainListSelector;
