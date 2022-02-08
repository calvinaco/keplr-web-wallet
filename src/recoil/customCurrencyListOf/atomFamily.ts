import { atomFamily } from 'recoil';
import { Currency } from '../../apptypes.d';

const customCurrencyListOfAtomFamily = atomFamily<Currency[], ChainId>({
  key: 'customCurrencyListOf',
  default: [],
});

type ChainId = string;

export default customCurrencyListOfAtomFamily;
