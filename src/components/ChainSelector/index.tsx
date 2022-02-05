import React from 'react';
import { ChainConfig, ChainId } from '../../apptypes.d';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectInputProps } from '@mui/material/Select/SelectInput';

function ChainSelector(props: ChainSelectorProps) {
  const handleSelectChange :SelectInputProps<ChainId>['onChange'] = (event) => {
    const newChain = props.chainList.find(chain => chain.id === event.target.value)!;
    props.onChange(newChain);
  }

  return (
    <FormControl fullWidth>
      <Select
        value={props.currentChain.id || ''}
        onChange={handleSelectChange}
      >
        {
          props.chainList.map(chain => (
            <MenuItem key={chain.id} value={chain.id}>{chain.name}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}

export type ChainSelectorProps = {
  currentChain: ChainConfig,
  chainList: ChainConfig[],
  onChange: (chain: ChainConfig) => void;
};

export default ChainSelector;
