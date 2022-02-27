import { atom } from 'recoil';

type MinimalDenom = string;

const pendingTransferMinimalDenomAtom = atom<MinimalDenom>({
  key: 'pendingTransferMinimalDenom',
  default: '',
});

export default pendingTransferMinimalDenomAtom;
