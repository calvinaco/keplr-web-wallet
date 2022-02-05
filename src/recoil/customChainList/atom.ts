import { ChainConfig } from '../../apptypes.d';
import { atom } from 'recoil';

const customChainListAtom = atom<ChainConfig[]>({
  key: 'customChainList',
  default: [],
});

export default customChainListAtom;
