import { atom } from 'recoil';

const isPendingToConnectKeplr = atom({
  key: 'isPendingToConnectKeplr',
  default: false,
});

export default isPendingToConnectKeplr;
