import { Currency } from '../../apptypes.d';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectProps } from '@mui/material/Select';
import { SelectInputProps } from '@mui/material/Select/SelectInput';
import React from 'react';

function CurrencySelect(props: CurrencySelectProps) {
  const handleChange: SelectInputProps<CoinMinimalDenom>['onChange'] = (event) => {
    if (!props.onChange) {
      return;
    }

    const newCurrency = props.currencyList.find(
      (currency) => currency.coinMinimalDenom === event.target.value,
    )!;
    props.onChange(newCurrency);
  };

  return (
    <Select {...props} onChange={handleChange}>
      {props.currencyList.map((currency) => (
        <MenuItem key={currency.coinMinimalDenom} value={currency.coinMinimalDenom}>
          {currency.coinDenom}
        </MenuItem>
      ))}
    </Select>
  );
}

export type CurrencySelectProps = Omit<SelectProps<CoinMinimalDenom>, 'onChange'> & {
  currencyList: Currency[];
  onChange?: (currency: Currency) => void;
};

type CoinMinimalDenom = string;

export default CurrencySelect;
