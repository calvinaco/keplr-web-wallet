import React from 'react';
import { Network } from '@apptypes.d';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export type NetworkSelectorProps = {
  currentNetwork: Network,
  networkList: Network[],
};

function NetworkSelector(props: NetworkSelectorProps) {
  return (
    <FormControl fullWidth>
      <InputLabel id="network-select-label">Network</InputLabel>
      <Select
        labelId="network-select-label"
        value={props.currentNetwork || ''}
        label="Network"
        // onChange={handleChange}
      >
        {
          props.networkList.map(network => (
            <MenuItem value={network.id}>{network.name}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}