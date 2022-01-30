import Box, { BoxProps } from "@mui/material/Box";
import styled from "@mui/system/styled";
import React from "react";

const SingleLineItem = styled((props: BoxProps) => <Box {...props} />)({
  flexShrink: 0,
});

function WalletHeader() {
  return (
    <React.Fragment>
      <SingleLineItem
        sx={{ display: 'flex', padding: 1, borderRadius: 1 }}
      >
        <SingleLineItem>Keplr Web Wallet (Unofficial)</SingleLineItem>
        <Box sx={{ flexGrow: 1 }}></Box>
        <SingleLineItem>Network</SingleLineItem>
        <SingleLineItem>Avatar</SingleLineItem>
      </SingleLineItem>
    </React.Fragment>
  );
}

export default WalletHeader;
