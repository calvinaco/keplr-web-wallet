import { atom, atomFamily } from 'recoil'
import { Denom, TokenBalance } from '../../apptypes.d';

// _balancesAtomFamily and _balanceDenomListAtom are internal atoms to support a reset-all-able
// balance atom family.

const _balancesAtomFamily = atomFamily<TokenBalance, Denom>({
  key: 'balances',
  default: (denom: Denom) => ({
    denom,
    humanReadableDenom: denom,
    amount: '0',
  })
});

const _balanceDenomListAtom = atom<Denom[]>({
  key: 'balanceDenoms',
  default: [],
});

export {
  _balancesAtomFamily,
  _balanceDenomListAtom,
};
