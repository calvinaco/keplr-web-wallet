import { ChainConfig, ChainId } from '../../apptypes.d';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectProps } from '@mui/material/Select';
import { SelectInputProps } from '@mui/material/Select/SelectInput';
import React from 'react';

function ChainSelector(props: ChainSelectorProps) {
  const handleSelectChange: SelectInputProps<ChainId>['onChange'] = (event) => {
    if (!props.onChange) {
      return;
    }

    const newChain = props.chainList.find((chain) => chain.id === event.target.value)!;
    props.onChange(newChain);
  };

  return (
    <Select {...props} onChange={handleSelectChange}>
      {props.chainList.map((chain) => (
        <MenuItem key={chain.id} value={chain.id}>
          {chain.name}
        </MenuItem>
      ))}
    </Select>
  );
}

export type ChainSelectorProps = Omit<SelectProps<ChainId>, 'onChange'> & {
  chainList: ChainConfig[];
  onChange?: (chain: ChainConfig) => void;
};

export default ChainSelector;
