import { IBCChannelConfig } from '../apptypes.d';
import chainList from './chains';

const defaultIBCChannels: IBCChannelConfig = chainList.reduce<IBCChannelConfig>(
  (channels, chain) => {
    channels[chain.chain.id] = chain.ibcChannelList;

    return channels;
  },
  {},
);

export default defaultIBCChannels;
