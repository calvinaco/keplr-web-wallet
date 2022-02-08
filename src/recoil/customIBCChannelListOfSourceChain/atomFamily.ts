import { atomFamily } from 'recoil';
import { IBCSourceChainChannel } from '../../apptypes.d';

const customIBCChannelListOfSourceChainAtomFamily = atomFamily<
  IBCSourceChainChannel[],
  SourceChainId
>({
  key: 'customIBCChannelListOf',
  default: [],
});

type SourceChainId = string;

export default customIBCChannelListOfSourceChainAtomFamily;
