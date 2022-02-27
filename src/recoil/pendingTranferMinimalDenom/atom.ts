import { atom } from 'recoil';

type MinimalDenom = string;

const pendingTranferMinimalDenomAtom = atom<MinimalDenom | null>({
  key: 'pendingTranferMinimalDenom',
  default: '',
});

export default pendingTranferMinimalDenomAtom;
