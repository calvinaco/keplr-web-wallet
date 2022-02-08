import BalanceList from '../../components/BalanceList';
import WalletAddressLabel from '../../components/WalletAddressLabel';
import { allBalanceOfSelector } from '../../recoil/balanceOf';
import currentChainAtom from '../../recoil/currentChain';
import currentWalletAtom from '../../recoil/currentWallet';
import ConnectKeplrButton from '../ConnectKeplrButton';
import Transfer from '../Transfer';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';

const Separator = styled('div')({
  padding: 15,
});

function WalletMain(props: WalletMainProps) {
  const currentWallet = useRecoilValue(currentWalletAtom);
  const currentChain = useRecoilValue(currentChainAtom);
  const allBalanceOf = useRecoilValue(allBalanceOfSelector);
  const [tabPage, setTabPage] = useState<number>(0);

  if (currentWallet === null) {
    return <ConnectKeplrButton />;
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 2) {
      window.open(
        currentChain.explorerURLs.account.replaceAll('{account}', currentWallet.address),
        'blank',
      );
      return;
    }
    setTabPage(newValue);
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
        {tabPage === 0 && (
          <BalanceList balances={allBalanceOf} onStartTransfer={() => setTabPage(1)} />
        )}
        {tabPage === 1 && <Transfer />}
      </Box>
    </Box>
  );
}

export type WalletMainProps = {};

export default WalletMain;
