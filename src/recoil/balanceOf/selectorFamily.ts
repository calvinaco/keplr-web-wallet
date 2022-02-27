import { Coin } from '../../apptypes.d';
import currencyListOfSelectorFamily from '../currencyListOf';
import currentChainAtom from '../currentChain';
import { _balanceDenomListAtom, _balancesAtomFamily } from './atom';
import BigNumber from 'bignumber.js';
import { DefaultValue, selectorFamily } from 'recoil';

type MinimalDenom = string;

const balanceOfSelectorFamily = selectorFamily<Coin, MinimalDenom>({
  key: 'balanceOf',
  get:
    (minimalDenom: MinimalDenom) =>
    ({ get }) => {
      const balance = get(_balancesAtomFamily(minimalDenom));
      const currency = get(currencyListOfSelectorFamily(get(currentChainAtom).id)).find(
        (currency) => currency.coinMinimalDenom === minimalDenom,
      );
      if (!currency) {
        return balance;
      }

      return {
        ...balance,
        humanReadableDenom: currency.coinDenom,
        humanReadableAmount: new BigNumber(balance.amount)
          .dividedBy(new BigNumber(10).pow(currency.coinDecimals))
          .toFormat(currency.coinDecimals),
      };
    },
  set:
    (minimalDenom: MinimalDenom) =>
    ({ get, set, reset }, balance) => {
      if (balance instanceof DefaultValue) {
        reset(_balancesAtomFamily(minimalDenom));
        set(_balanceDenomListAtom, (prevState) => prevState.filter((d) => d !== minimalDenom));
        return;
      }
      set(_balancesAtomFamily(minimalDenom), balance);
      if (!get(_balanceDenomListAtom).includes(minimalDenom)) {
        set(_balanceDenomListAtom, (prevState) => [...prevState, minimalDenom]);
      }
    },
});

export default balanceOfSelectorFamily;
