import { selector, DefaultValue } from 'recoil';
import { TokenBalance } from '../../apptypes.d';
import { _balanceDenomListAtom } from './atom';
import balanceOfSelectorFamily from './selectorFamily';

// A special selector that helps get and reset all balanceOf selector family members with
// useRecoilValue(allBalanceOfSelector) and useResetRecoilState(allBalanceOfSelector).
const allBalanceOfSelector = selector<TokenBalance[]>({
  key: 'allBalanceOf',
  get: ({ get }) => get(_balanceDenomListAtom).map(denom => (
    get(balanceOfSelectorFamily(denom)))
  ),
  set: ({ get, reset }, balance) => {
    if (balance instanceof DefaultValue) {
      get(_balanceDenomListAtom).forEach(denom => {
        reset(balanceOfSelectorFamily(denom));
      });
      reset(_balanceDenomListAtom);
      return;
    }
    // Do nothing
    throw new Error('unsupported set operation');
  },
})

export default allBalanceOfSelector;
