import { ChainConfig } from '../../apptypes.d';
import ChainSelect from '../../components/ChainSelect';
import balanceOfSelectorFamily from '../../recoil/balanceOf';
import chainListSelector from '../../recoil/chainList/selector';
import currencyListOfSelectorFamily from '../../recoil/currencyListOf';
import currentChainAtom from '../../recoil/currentChain';
import currentWalletAtom from '../../recoil/currentWallet';
import Box from '@mui/material/Box';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import BigNumber from 'bignumber.js';
import React, { InputHTMLAttributes, useCallback, useState } from 'react';
import { ChangeEventHandler } from 'react';
import { ChangeEvent } from 'react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';
import { useRecoilValue } from 'recoil';

function TransferFormControl(props: Omit<FormControlProps, 'margin' | 'fullWidth'>) {
  return <FormControl sx={{ margin: 1 }} fullWidth {...props} />;
}

const AmountInputComponent = React.forwardRef<
  NumberFormat<NumberFormatCustomProps>,
  NumberFormatCustomProps
>(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
});

interface NumberFormatCustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

type TransferProps = {
  denom: string;
};

function Transfer(props: TransferProps) {
  const currentChain = useRecoilValue(currentChainAtom);
  const chainList = useRecoilValue(chainListSelector);
  const currentWallet = useRecoilValue(currentWalletAtom);
  const currencyList = useRecoilValue(currencyListOfSelectorFamily(currentChain.id));
  const balance = useRecoilValue(balanceOfSelectorFamily(props.denom));
  const currency = currencyList.find((currency) => currency.coinMinimalDenom === props.denom);
  if (!currency) {
    throw new Error('Currency not found');
  }
  const [amount, setAmount] = useState<string>('0');
  const handleAmountChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (new BigNumber(balance.humanReadableAmount).isLessThan(event.target.value)) {
        setAmount(balance.humanReadableAmount);
        return;
      }
      setAmount(event.target.value);
    },
    [balance],
  );

  const [toAddress, setToAddress] = useState<string>('');
  const handleToAddressChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setToAddress(event.target.value);
  }, []);
  const [toChain, setToChain] = useState<ChainConfig>(currentChain);
  const handleToChainChange = useCallback((chain: ChainConfig) => {
    setToChain(chain);
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box sx={{ width: '600px' }}>
        <TransferFormControl>
          <TextField
            sx={{
              input: { textAlign: 'center' },
            }}
            label="From"
            value={currentWallet!.address}
            InputProps={{
              startAdornment: (
                <InputAdornment sx={{ marginRight: 1 }} position="start">
                  {currentChain.name}
                </InputAdornment>
              ),
            }}
            disabled
          />
        </TransferFormControl>
        <TransferFormControl>
          <InputLabel id="transfer-to-chain-label">Destination Chain</InputLabel>
          <ChainSelect
            value={toChain.id}
            onChange={handleToChainChange}
            chainList={chainList}
            labelId="transfer-from-chain-label"
            id="toChain"
            label="Destination Chain"
          />
        </TransferFormControl>
        <TransferFormControl>
          <TextField label="Destination Address" onChange={handleToAddressChange} />
        </TransferFormControl>
        <TransferFormControl>
          <TextField
            label="Amount"
            value={amount}
            onChange={handleAmountChange}
            name="amount"
            id="amount"
            InputProps={{
              inputComponent: AmountInputComponent as any,
              endAdornment: (
                <InputAdornment sx={{ marginLeft: 1 }} position="end">
                  CRO
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
          <FormHelperText>
            Make sure you have reserved small amount as transaction fee or your transaction may
            fail.
          </FormHelperText>
        </TransferFormControl>
      </Box>
    </Box>
  );
}

export default Transfer;
