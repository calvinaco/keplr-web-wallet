import { atom } from 'recoil';
import { Wallet } from '../../apptypes.d';

const currentWalletAtom = atom<Wallet | null>({
  key: 'currentWallet',
  default: null,
});

export default currentWalletAtom;
