import { atom, selector } from 'recoil';
import { Chain } from '../../apptypes.d';
import chainListSelector from '../chainList/selector';

const currentChainAtom = atom<Chain>({
  key: 'currentChain',
  default: selector({
    key: 'firstChainOnChainList',
    get: ({ get }): Chain => {
      const chainList = get(chainListSelector);
      return chainList[0];
    },
  }),
});

export default currentChainAtom;
