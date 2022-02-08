import { selectorFamily } from 'recoil';
import { IBCSourceChainChannel } from '../../apptypes.d';
import defaultIBCChannels from '../../config/defaultIBCChannelList';
import customIBCChannelListOfSourceChainAtomFamily from '../customIBCChannelListOfSourceChain';

const ibcChannelListOfSourceChainSelectorFamily = selectorFamily<IBCSourceChainChannel[], string>({
  key: 'ibcChannelListOfSourceChain',
  get:
    (sourceChainId: string) =>
    ({ get }) => {
      const customIBCChannelList = get(customIBCChannelListOfSourceChainAtomFamily(sourceChainId));

      if (!defaultIBCChannels.hasOwnProperty(sourceChainId)) {
        return customIBCChannelList;
      }

      return [...defaultIBCChannels[sourceChainId], ...customIBCChannelList];
    },
});

export default ibcChannelListOfSourceChainSelectorFamily;
