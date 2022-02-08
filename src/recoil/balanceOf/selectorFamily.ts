import { Coin, Denom } from '../../apptypes.d';
import currencyListOfSelectorFamily from '../currencyListOf';
import currentChainAtom from '../currentChain';
import { _balanceDenomListAtom, _balancesAtomFamily } from './atom';
import BigNumber from 'bignumber.js';
import { DefaultValue, selectorFamily } from 'recoil';

const balanceOfSelectorFamily = selectorFamily<Coin, Denom>({
  key: 'balanceOf',
  get:
    (denom: Denom) =>
    ({ get }) => {
      const balance = get(_balancesAtomFamily(denom));
      const currency = get(currencyListOfSelectorFamily(get(currentChainAtom).id)).find(
        (currency) => currency.coinMinimalDenom === denom,
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
    (denom: Denom) =>
    ({ get, set, reset }, balance) => {
      if (balance instanceof DefaultValue) {
        reset(_balancesAtomFamily(denom));
        set(_balanceDenomListAtom, (prevState) => prevState.filter((d) => d !== denom));
        return;
      }
      set(_balancesAtomFamily(denom), balance);
      if (!get(_balanceDenomListAtom).includes(denom)) {
        set(_balanceDenomListAtom, (prevState) => [...prevState, denom]);
      }
    },
});

export default balanceOfSelectorFamily;
