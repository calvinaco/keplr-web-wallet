import { atom } from 'recoil';
import { Chain } from '../../apptypes.d';

const customChainListAtom = atom<Chain[]>({
  key: 'customChainList',
  default: [],
});

export default customChainListAtom;
