import { selector } from 'recoil';
import currentWalletAtom from './atom';

const currentAddressSelector = selector<string>({
  key: 'currentWallet/Address',
  get: ({ get }) => {
    const wallet = get(currentWalletAtom);
    if (wallet === null) {
      return '';
    }

    return wallet.address;
  },
});

export default currentAddressSelector;
