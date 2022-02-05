import Box, { BoxProps } from '@mui/material/Box';
import styled from '@mui/system/styled';
import React from 'react';
import { useRecoilValue } from 'recoil';
import BlockieAvatar from '../../components/BlockieAvatar';
import { currentAddressSelector } from '../../recoil/currentWallet';
import WalletHeaderChainSelector from './WalletHeaderChainSelector';

const SingleLineItem = styled((props: BoxProps) => <Box {...props} />)({
  flexGrow: 0,
  flexShrink: 0,
  alignItems: 'center',
  paddingRight: '0.5rem',
  paddingLeft: '0.5rem',
});

function WalletHeader() {
  const currentAddress = useRecoilValue(currentAddressSelector);

  return (
    <React.Fragment>
      <SingleLineItem sx={{ display: 'flex', padding: 1, borderRadius: 1 }}>
        <SingleLineItem
          sx={{
            flexWrap: 'wrap',
            flexShrink: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}>
          Keplr Web Wallet (Unofficial)
        </SingleLineItem>
        <Box sx={{ flexGrow: 1 }}></Box>
        <SingleLineItem>
          <WalletHeaderChainSelector />
        </SingleLineItem>
        <SingleLineItem>
          <BlockieAvatar value={currentAddress} />
        </SingleLineItem>
      </SingleLineItem>
    </React.Fragment>
  );
}

export default WalletHeader;
