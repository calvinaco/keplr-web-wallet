import { ChainConfig } from '../../apptypes.d';
import chainListSelector from '../chainList/selector';
import { atom, selector } from 'recoil';

const currentChainAtom = atom<ChainConfig>({
  key: 'currentChain',
  default: selector({
    key: 'firstChainOnChainList',
    get: ({ get }): ChainConfig => {
      const chainList = get(chainListSelector);
      return chainList[0];
    },
  }),
});

export default currentChainAtom;
