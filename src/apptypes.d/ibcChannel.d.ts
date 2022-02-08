export type IBCChannelConfig = {
  [sourceChainId: string]: IBCSourceChainChannel[];
};

export type IBCSourceChainChannel = {
  destinationChainId: string;
  channelId: string;
  label?: string;
};
