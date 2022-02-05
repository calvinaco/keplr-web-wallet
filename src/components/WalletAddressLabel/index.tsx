import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import copy from 'copy-to-clipboard';
import React, { MouseEventHandler } from 'react';
import BlockieAvatar from '../BlockieAvatar';

function WalletAddressLabel(props: WalletAddressLabelProps) {
  const addressEllipsis = props.address.slice(0, 10) + '...' + props.address.slice(-8);

  const [value, setValue] = React.useState(addressEllipsis);
  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (!props.copyable) {
      return;
    }

    copy(addressEllipsis);
    setValue('Copied!');
    setTimeout(() => {
      setValue(addressEllipsis);
    }, 1000);
  };
  const isDisabled = !props.copyable;

  return (
    <Tooltip title={props.address}>
      <Button
        sx={{
          borderRadius: 4,
          paddingRight: '25px',
          paddingLeft: '25px',
          textTransform: 'none',
        }}
        variant="outlined"
        endIcon={<ContentCopyRoundedIcon />}
        onClick={handleButtonClick}
        disabled={isDisabled}>
        <BlockieAvatar
          sx={{
            marginRight: '10px',
          }}
          value={props.address}
        />
        <Typography
          sx={{
            width: '200px',
          }}>
          {value}
        </Typography>
      </Button>
    </Tooltip>
  );
}

export type WalletAddressLabelProps = {
  address: string;
  copyable?: boolean;
};

export default WalletAddressLabel;
