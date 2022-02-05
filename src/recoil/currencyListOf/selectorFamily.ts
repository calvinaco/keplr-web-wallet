import { ChainId, Currency } from '../../apptypes.d';
import chainListAtom from '../chainList';
import customCurrencyListOfAtomFamily from '../customCurrencyListOf';
import { selectorFamily } from 'recoil';

const currencyListOfSelectorFamily = selectorFamily<Currency[], ChainId>({
  key: 'currencyListOf',
  get:
    (chainId: ChainId) =>
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
