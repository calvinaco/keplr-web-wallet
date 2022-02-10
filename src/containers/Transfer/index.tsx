import { Chain, Currency, IBCSourceChainChannel, Wallet, WalletType } from '../../apptypes.d';
import ChainSelect from '../../components/ChainSelect';
import CurrencySelect from '../../components/CurrencySelect';
import IBCChannelSelect from '../../components/IBCChannelSelect';
import balanceOfSelectorFamily, { allBalanceOfSelector } from '../../recoil/balanceOf';
import chainListSelector from '../../recoil/chainList/selector';
import currencyListOfSelectorFamily from '../../recoil/currencyListOf';
import currentChainAtom from '../../recoil/currentChain';
import currentWalletAtom from '../../recoil/currentWallet';
import ibcChannelListOfSelectorFamily from '../../recoil/ibcChannelListOf';
import { DeliverTxResponse, SigningStargateClient } from '@cosmjs/stargate';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
import Long from 'long';
import { DateTime, DurationLike } from 'luxon';
import { useSnackbar } from 'notistack';
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import NumberFormat from 'react-number-format';
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

type TransferProps = {};

type FormError = {
  toChain?: string;
  toAddress?: string;
  token?: string;
  amount?: string;
  ibcChannel?: string;
};

const ibcTimeoutDurationMarkList: {
  value: number;
  duration: DurationLike;
  label: string;
}[] = [
  {
    value: 0,
    duration: { minutes: 5 },
    label: '5 mins',
  },
  {
    value: 1,
    duration: { minutes: 15 },
    label: '15 mins',
  },
  {
    value: 2,
    duration: { hour: 1 },
    label: '1 hour',
  },
  {
    value: 3,
    duration: { hours: 2 },
    label: '6 hours',
  },
  {
    value: 4,
    duration: { day: 1 },
    label: '1 day',
  },
];

function ibcTimeoutDurationValueText(value: number) {
  return ibcTimeoutDurationMarkList.find((mark) => mark.value === value)?.label || 'test';
}

function Transfer(props: TransferProps) {
  const { enqueueSnackbar } = useSnackbar();
  const currentChain = useRecoilValue(currentChainAtom);
  const chainList = useRecoilValue(chainListSelector);
  const currentWallet = useRecoilValue(currentWalletAtom) as Wallet;
  const currencyList = useRecoilValue(currencyListOfSelectorFamily(currentChain.id));
  const allBalanceOf = useRecoilValue(allBalanceOfSelector);
  const tokenList: Currency[] = useMemo(
    () =>
      allBalanceOf.map((balance) => {
        const currencyDef = currencyList.find(
          (currency) => currency.coinMinimalDenom === balance.denom,
        );
        if (currencyDef) {
          return currencyDef;
        }
        return {
          coinMinimalDenom: balance.denom,
          coinDenom: balance.humanReadableDenom,
          coinDecimals: 0,
          alwaysDisplay: false,
        };
      }),
    [allBalanceOf, currencyList],
  );
  const [token, setToken] = useState<Currency>(tokenList[0]);
  useEffect(() => {
    setToken(tokenList[0]);
  }, [tokenList]);
  const handleTokenChange = useCallback((currency: Currency) => {
    setAmount('0');
    setToken(currency);
  }, []);

  const balance = useRecoilValue(balanceOfSelectorFamily(token.coinMinimalDenom));
  const [amount, setAmount] = useState<string>('0');
  useEffect(() => {
    if (new BigNumber(amount).isGreaterThan(balance.humanReadableAmount)) {
      setAmount(balance.humanReadableAmount);
    }
  }, [balance]); // eslint-disable-line react-hooks/exhaustive-deps
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
  const minimalCoinAmount = useMemo(
    () => new BigNumber(amount).multipliedBy(new BigNumber(10).pow(token.coinDecimals)),
    [token, amount],
  );

  const [toAddress, setToAddress] = useState<string>('');
  const handleToAddressChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setToAddress(event.target.value);
  }, []);
  const [toChain, setToChain] = useState<Chain>(currentChain);
  const handleToChainChange = useCallback((chain: Chain) => {
    setToChain(chain);
  }, []);
  useEffect(() => {
    setToAddress('');
    setToChain(currentChain);
  }, [currentChain]);

  const isIBCTransfer = useMemo(() => currentChain.id !== toChain.id, [currentChain, toChain]);

  const ibcChannels = useRecoilValue(
    ibcChannelListOfSelectorFamily({
      sourceChainId: currentChain.id,
      destinationChainId: toChain.id,
    }),
  );
  const [ibcChannel, setIBCChannel] = useState<IBCSourceChainChannel | null>(
    ibcChannels.length > 0 ? ibcChannels[0] : null,
  );
  useEffect(() => {
    setIBCChannel(ibcChannels.length > 0 ? ibcChannels[0] : null);
  }, [ibcChannels]);
  const handleIBCChannelChange = useCallback((channel: IBCSourceChainChannel) => {
    setIBCChannel(channel);
  }, []);
  const [ibcTimeoutMark, setIBCTimeoutMark] = useState<number>(1);
  const handleIBCTimeoutChange = useCallback(
    (event: Event, value: number | number[], activeThumb: number) => {
      setIBCTimeoutMark(value as number);
    },
    [],
  );
  const ibcTimeout = useMemo(() => {
    return ibcTimeoutDurationMarkList[ibcTimeoutMark].duration;
  }, [ibcTimeoutMark]);

  const [isSending, setIsSending] = useState<boolean>(false);
  const notifyDeliveryTxResult = useCallback(
    (result: DeliverTxResponse) => {
      if (result.code === 0) {
        enqueueSnackbar(
          <Typography>
            Transaction (
            <a
              target="_blank"
              href={currentChain.explorerURLs.transaction.replaceAll(
                '{transaction}',
                result.transactionHash,
              )}
              rel="noreferrer">
              {result.transactionHash}
            </a>
            ) broadcasted successfully
          </Typography>,
          {
            variant: 'success',
          },
        );
      } else {
        enqueueSnackbar(
          <Typography>
            Transaction (
            <a
              target="_blank"
              href={currentChain.explorerURLs.transaction.replaceAll(
                '{transaction}',
                result.transactionHash,
              )}
              rel="noreferrer">
              {result.transactionHash}
            </a>
            ) failed on chain
          </Typography>,
          {
            variant: 'error',
          },
        );
      }
    },
    [enqueueSnackbar, currentChain],
  );

  const [formErr, setFormErr] = useState<FormError>({});
  const validateFormInputs = useCallback((): boolean => {
    const formErr: FormError = {};
    if (!chainList.find((chain) => chain.id === toChain.id)) {
      formErr.toChain = 'Invalid chain';
    }

    if (toAddress === '') {
      formErr.toAddress = 'Missing destination address';
    }

    if (!allBalanceOf.find((balance) => balance.denom === token.coinMinimalDenom)) {
      formErr.token = 'Invalid token';
    }

    if (
      new BigNumber(amount).isGreaterThan(
        allBalanceOf.find((balance) => balance.denom === token.coinMinimalDenom)!.amount,
      )
    ) {
      formErr.amount = 'Insufficient balance';
    }

    if (currentChain.id !== toChain.id) {
      if (!ibcChannel) {
        enqueueSnackbar('No available IBC channel', {
          variant: 'error',
        });
        formErr.ibcChannel = 'No available IBC channel';
      }
    }

    setFormErr(formErr);
    return Object.keys(formErr).length === 0;
  }, [
    allBalanceOf,
    chainList,
    currentChain,
    ibcChannel,
    toAddress,
    amount,
    toChain,
    enqueueSnackbar,
    token,
  ]);
  const sendOnKeplr = useCallback(
    () =>
      (async () => {
        setIsSending(true);
        const offlineSigner =
          currentWallet.type === WalletType.Ledger
            ? window.getOfflineSignerOnlyAmino!(currentChain.id)
            : window.getOfflineSigner!(currentChain.id);
        const cosmJS = await SigningStargateClient.connectWithSigner(
          currentChain.rpcBaseURLs.tendermint,
          offlineSigner,
        );

        // TODO: form validation
        if (isIBCTransfer) {
          const result = await cosmJS.sendIbcTokens(
            currentWallet.address,
            toAddress,
            {
              denom: token.coinMinimalDenom,
              amount: minimalCoinAmount.toString(10),
            },
            'transfer',
            ibcChannel!.channelId,
            {
              revisionNumber: Long.fromNumber(0),
              revisionHeight: Long.fromNumber(0),
            },
            DateTime.now().setZone('utc').plus(ibcTimeout).toMillis() * 1000000,
            {
              amount: [],
              gas: '200000',
            },
            '',
          );
          notifyDeliveryTxResult(result);
        } else {
          const result = await cosmJS.sendTokens(
            currentWallet.address,
            toAddress,
            [
              {
                denom: token.coinMinimalDenom,
                amount: minimalCoinAmount.toString(10),
              },
            ],
            {
              amount: [],
              gas: '200000',
            },
            '',
          );
          notifyDeliveryTxResult(result);
        }
      })().finally(() => {
        setIsSending(false);
      }),
    [
      currentChain,
      currentWallet,
      minimalCoinAmount,
      toAddress,
      token,
      isIBCTransfer,
      ibcChannel,
      ibcTimeout,
      notifyDeliveryTxResult,
    ],
  );

  const handleSend = useCallback(() => {
    if (validateFormInputs()) {
      sendOnKeplr();
    }
  }, [sendOnKeplr, validateFormInputs]);

  return (
    <React.Fragment>
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
          labelId="transfer-from-chain-label"
          label="Destination Chain"
          chainList={chainList}
          value={toChain.id}
          onChange={handleToChainChange}
          disabled={isSending}
        />
        {formErr.toChain && <FormHelperText error>{formErr.toChain}</FormHelperText>}
      </TransferFormControl>
      <TransferFormControl>
        <TextField
          label="Destination Address"
          value={toAddress}
          onChange={handleToAddressChange}
          disabled={isSending}
        />
        {formErr.toAddress && <FormHelperText error>{formErr.toAddress}</FormHelperText>}
      </TransferFormControl>
      <TransferFormControl>
        <InputLabel id="transfer-denom-label">Token</InputLabel>
        <CurrencySelect
          labelId="transfer-denom-label"
          label="Token"
          currencyList={tokenList}
          value={token.coinMinimalDenom}
          onChange={handleTokenChange}
          disabled={isSending}
        />

        {formErr.token && <FormHelperText error>{formErr.token}</FormHelperText>}
      </TransferFormControl>
      <TransferFormControl>
        <TextField
          label="Amount"
          InputProps={{
            inputComponent: AmountInputComponent as any,
            endAdornment: (
              <InputAdornment sx={{ marginLeft: 1 }} position="end">
                {token.coinDenom}
              </InputAdornment>
            ),
          }}
          variant="outlined"
          value={amount}
          onChange={handleAmountChange}
          disabled={isSending}
        />
        {formErr.amount && <FormHelperText error>{formErr.amount}</FormHelperText>}
        <FormHelperText>
          Max: {balance.humanReadableAmount} {balance.humanReadableDenom}
        </FormHelperText>
        <FormHelperText>
          Make sure you have reserved small amount of transaction fee or your transaction may fail.
        </FormHelperText>
      </TransferFormControl>

      {isIBCTransfer && ibcChannel && (
        <React.Fragment>
          <TransferFormControl>
            <InputLabel id="transfer-ibc-channel-label">IBC Channel</InputLabel>
            <IBCChannelSelect
              labelId="transfer-ibc-channel-label"
              label="IBC Channel"
              ibcChannelList={ibcChannels}
              destinationChainIdValue={toChain.id}
              channelIdValue={ibcChannel!.channelId}
              onChange={handleIBCChannelChange}
              disabled={isSending}
            />
            {formErr.ibcChannel && <FormHelperText error>{formErr.ibcChannel}</FormHelperText>}
          </TransferFormControl>
          <TransferFormControl>
            <Box sx={{ marginTop: 1, marginRight: 3, marginBottom: 1, marginLeft: 3 }}>
              <Typography align="left">IBC Timeout</Typography>
              <Slider
                min={ibcTimeoutDurationMarkList[0].value}
                max={ibcTimeoutDurationMarkList[ibcTimeoutDurationMarkList.length - 1].value}
                aria-label="IBC Timeout"
                marks={ibcTimeoutDurationMarkList}
                getAriaValueText={ibcTimeoutDurationValueText}
                step={null}
                valueLabelDisplay="off"
                value={ibcTimeoutMark}
                onChange={handleIBCTimeoutChange}
                disabled={isSending}
              />
            </Box>
          </TransferFormControl>
        </React.Fragment>
      )}
      <Button
        sx={{ marginTop: '8px' }}
        variant="contained"
        onClick={handleSend}
        disabled={isSending}>
        {isSending ? 'Reviewing on Keplr...' : 'Send on Keplr'}
      </Button>
    </React.Fragment>
  );
}

export default Transfer;
