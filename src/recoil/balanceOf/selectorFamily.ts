import { Coin, Denom } from '../../apptypes.d';
import { _balanceDenomListAtom, _balancesAtomFamily } from './atom';
import { DefaultValue, selectorFamily } from 'recoil';

const balanceOfSelectorFamily = selectorFamily<Coin, Denom>({
  key: 'balanceOf',
  get:
    (denom: Denom) =>
    ({ get }) => {
      const balance = get(_balancesAtomFamily(denom));
      return balance;
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
