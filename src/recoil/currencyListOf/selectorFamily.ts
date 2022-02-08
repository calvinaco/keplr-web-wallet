import { selectorFamily } from 'recoil';
import { Currency } from '../../apptypes.d';
import chainListAtom from '../chainList';
import customCurrencyListOfAtomFamily from '../customCurrencyListOf';

const currencyListOfSelectorFamily = selectorFamily<Currency[], string>({
  key: 'currencyListOf',
  get:
    (chainId: string) =>
    ({ get }) => {
      const chain = get(chainListAtom).find((chain) => chain.id === chainId);
      if (!chain) {
        return [];
      }

      const customCurrencyList = get(customCurrencyListOfAtomFamily(chainId));

      return [...chain.currencyList, ...customCurrencyList];
    },
});

export default currencyListOfSelectorFamily;
