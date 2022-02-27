import BalanceList from '../../components/BalanceList';
import WalletAddressLabel from '../../components/WalletAddressLabel';
import { allBalanceOfSelector } from '../../recoil/balanceOf';
import currentChainAtom from '../../recoil/currentChain';
import currentWalletAtom from '../../recoil/currentWallet';
import pendingTranferMinimalDenomAtom from '../../recoil/pendingTranferMinimalDenom';
import ConnectKeplrButton from '../ConnectKeplrButton';
import Transfer from '../Transfer';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

type MinimalDenom = string;

const Separator = styled('div')({
  padding: 15,
});

enum TABS {
  Assets = 0,
  Transfer,
  History,
}

function WalletMain(props: WalletMainProps) {
  const currentWallet = useRecoilValue(currentWalletAtom);
  const currentChain = useRecoilValue(currentChainAtom);
  const allBalanceOf = useRecoilValue(allBalanceOfSelector);
  const setPendingTransferMinimalDenom = useSetRecoilState(pendingTranferMinimalDenomAtom);
  const [tabPage, setTabPage] = useState<number>(0);

  if (currentWallet === null) {
    return <ConnectKeplrButton />;
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === TABS.History) {
      window.open(
        currentChain.explorerURLs.account.replaceAll('{account}', currentWallet.address),
        'blank',
      );
      return;
    }
    setTabPage(newValue);
  };

  const handleStartTransfer = (minimalDenom: MinimalDenom) => {
    setPendingTransferMinimalDenom(minimalDenom);
    setTabPage(1);
  };

  return (
    <Box
      sx={{ borderRadius: '8px', p: '15px', backgroundColor: '#fff' }}
      display="flex"
      justifyContent="center"
      alignItems="center">
      <Box sx={{ width: '600px' }}>
        <Typography sx={{ padding: '15px' }} fontSize="25px">
          {currentWallet.name}
        </Typography>
        <WalletAddressLabel address={currentWallet.address} copyable />
        <Separator />
        <Tabs centered value={tabPage} onChange={handleTabChange}>
          <Tab label="Assets" />
          <Tab label="Transfer" />
          <Tab label="History" />
        </Tabs>
        {tabPage === TABS.Assets && (
          <BalanceList balances={allBalanceOf} onStartTransfer={handleStartTransfer} />
        )}
        {tabPage === TABS.Transfer && <Transfer />}
      </Box>
    </Box>
  );
}

export type WalletMainProps = {};

export default WalletMain;
