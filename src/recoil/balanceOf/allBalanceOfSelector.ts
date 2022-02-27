import { Coin } from '../../apptypes.d';
import currencyListOfSelector from '../currencyListOf';
import currentChainAtom from '../currentChain';
import { _balanceDenomListAtom } from './atom';
import balanceOfSelectorFamily from './selectorFamily';
import { DefaultValue, selector } from 'recoil';

// A special selector that helps get and reset all balanceOf selector family members with
// useRecoilValue(allBalanceOfSelector) and useResetRecoilState(allBalanceOfSelector).
const allBalanceOfSelector = selector<Coin[]>({
  key: 'allBalanceOf',
  get: ({ get }) => {
    const balances = get(_balanceDenomListAtom)
      .map((denom) => get(balanceOfSelectorFamily(denom)))
      .map((balance) => ({
        ...balance,
      }));

    const currencyList = get(currencyListOfSelector(get(currentChainAtom).id));
    currencyList
      .filter((currency) => currency.alwaysDisplay)
      .forEach((currency) => {
        if (!balances.find((balance) => balance.denom === currency.coinMinimalDenom)) {
          balances.push({
            denom: currency.coinMinimalDenom,
            amount: '0',
            humanReadableDenom: currency.coinDenom,
            humanReadableAmount: '0',
          });
        }
      });

    return balances.sort((a, b) => {
      const aScore = currencyList.findIndex((currency) => currency.coinMinimalDenom === a.denom);
      if (aScore === -1) {
        return currencyList.length;
      }
      const bScore = currencyList.findIndex((currency) => currency.coinMinimalDenom === b.denom);
      if (bScore === -1) {
        return currencyList.length;
      }

      return aScore - bScore;
    });
  },
  set: ({ get, reset }, balance) => {
    if (balance instanceof DefaultValue) {
      get(_balanceDenomListAtom).forEach((denom) => {
        reset(balanceOfSelectorFamily(denom));
      });
      reset(_balanceDenomListAtom);
      return;
    }
    // Do nothing
    throw new Error('unsupported set operation');
  },
});

export default allBalanceOfSelector;
