import { atom, RecoilState } from 'recoil';
import { Network } from '@apptypes.d';

const currentNetworkAtom: RecoilState<Network | null> = atom({
  key: 'currentNetwork',
  default: null,
});

export default currentNetworkAtom;