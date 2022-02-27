import { Coin } from '../../apptypes.d';
import { atom, atomFamily } from 'recoil';

// _balancesAtomFamily and _balanceDenomListAtom are internal atoms to support a reset-all-able
// balance atom family.

type MinimalDenom = string;

const _balancesAtomFamily = atomFamily<Coin, MinimalDenom>({
  key: 'balances',
  default: (minimalDenom: MinimalDenom) => ({
    denom: minimalDenom,
    amount: '0',
    humanReadableDenom: minimalDenom,
    humanReadableAmount: '0',
  }),
});

const _balanceDenomListAtom = atom<MinimalDenom[]>({
  key: 'balanceDenomLists',
  default: [],
});

export { _balancesAtomFamily, _balanceDenomListAtom };
