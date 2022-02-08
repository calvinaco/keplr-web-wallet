import { selectorFamily } from 'recoil';
import { IBCSourceChainChannel } from '../../apptypes.d';
import ibcChannelListOfSourceChainSelectorFamily from './ibcChannelListOfSourceChainSelectorFamily';

const ibcChannelListOfSelectorFamily = selectorFamily<
  IBCSourceChainChannel[],
  IBCChannelListAccessor
>({
  key: 'ibcChannelListOfSourceChain',
  get:
    ({ sourceChainId, destinationChainId }: IBCChannelListAccessor) =>
    ({ get }) => {
      const channelListOfSourceChain = get(
        ibcChannelListOfSourceChainSelectorFamily(sourceChainId),
      );

      return channelListOfSourceChain.filter(
        (channel) => channel.destinationChainId === destinationChainId,
      );
    },
});

export type IBCChannelListAccessor = {
  sourceChainId: string;
  destinationChainId: string;
};

export default ibcChannelListOfSelectorFamily;
