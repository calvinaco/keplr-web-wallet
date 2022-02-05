import { ChainId, Currency } from '../../apptypes.d';
import { defaultChainList } from '../../config';
import { atomFamily } from 'recoil';

const customCurrencyListOfAtomFamily = atomFamily<Currency[], ChainId>({
  key: 'customCurrencyListOf',
  default: [],
});

export default customCurrencyListOfAtomFamily;
