import { Coin, Denom } from '../../apptypes.d';
import { atom, atomFamily } from 'recoil';

// _balancesAtomFamily and _balanceDenomListAtom are internal atoms to support a reset-all-able
// balance atom family.

const _balancesAtomFamily = atomFamily<Coin, Denom>({
  key: 'balances',
  default: (denom: Denom) => ({
    denom,
    amount: '0',
    humanReadableDenom: denom,
    humanReadableAmount: '0',
  }),
});

const _balanceDenomListAtom = atom<Denom[]>({
  key: 'balanceDenomLists',
  default: [],
});

export { _balancesAtomFamily, _balanceDenomListAtom };
