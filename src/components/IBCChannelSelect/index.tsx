import { IBCSourceChainChannel } from '../../apptypes.d';
import chainListSelector from '../../recoil/chainList';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectProps } from '@mui/material/Select';
import { SelectInputProps } from '@mui/material/Select/SelectInput';
import React, { useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

function IBCChannelSelect(props: IBCChannelSelectProps) {
  const allChainList = useRecoilValue(chainListSelector);

  const groupedIBCChannels = useMemo(() => {
    return props.ibcChannelList.reduce<{
      [destinationChainId: string]: IBCSourceChainChannel[];
    }>((groupedIBCChannels, channel) => {
      if (!groupedIBCChannels[channel.destinationChainId]) {
        groupedIBCChannels[channel.destinationChainId] = [];
      }

      groupedIBCChannels[channel.destinationChainId].push(channel);

      return groupedIBCChannels;
    }, {});
  }, [props.ibcChannelList]);

  const menuItemElemList = useMemo(() => {
    return Object.keys(groupedIBCChannels).reduce<JSX.Element[]>(
      (elementList, destinationChainId) => {
        const sourceChainChannels = groupedIBCChannels[destinationChainId];
        const destinationChainName =
          allChainList.find((chain) => chain.id === destinationChainId)?.name || destinationChainId;

        return [
          ...elementList,
          <ListSubheader key={destinationChainId}>{destinationChainName}</ListSubheader>,
          ...sourceChainChannels.map((sourceChainChannel) => (
            <MenuItem
              key={`${destinationChainId}-${sourceChainChannel.channelId}`}
              value={`${destinationChainId}-${sourceChainChannel.channelId}`}>
              {destinationChainName} - {sourceChainChannel.channelId}{' '}
              {sourceChainChannel.label && `(${sourceChainChannel.label})`}
            </MenuItem>
          )),
        ];
      },
      [],
    );
  }, [groupedIBCChannels, allChainList]);

  const handleChange: SelectInputProps<SourceChainChannelId>['onChange'] = useCallback(
    (event) => {
      if (!props.onChange) {
        return;
      }

      const newChannel = props.ibcChannelList.find(
        (channel) => `${channel.destinationChainId}-${channel.channelId}` === event.target.value,
      )!;
      props.onChange(newChannel);
    },
    [props.onChange, props.ibcChannelList], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const value = useMemo(() => {
    if (props.destinationChainIdValue && props.channelIdValue) {
      return `${props.destinationChainIdValue}-${props.channelIdValue}`;
    }

    return undefined;
  }, [props.destinationChainIdValue, props.channelIdValue]);

  return (
    <Select {...props} value={value} onChange={handleChange}>
      {menuItemElemList}
    </Select>
  );
}

export type IBCChannelSelectProps = Omit<
  SelectProps<SourceChainChannelId>,
  'onChange' | 'value'
> & {
  ibcChannelList: IBCSourceChainChannel[];
  onChange?: (ibcChannel: IBCSourceChainChannel) => void;
  destinationChainIdValue?: string;
  channelIdValue?: string;
};

type SourceChainChannelId = string;

export default IBCChannelSelect;
