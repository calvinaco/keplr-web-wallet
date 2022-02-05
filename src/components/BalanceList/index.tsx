import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { Denom, Coin } from '../../apptypes.d';
import BlockieAvatar from '../BlockieAvatar';

function BalanceList(props: BalanceListProps) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {
        props.balances.map((coin: Coin) => (
          <ListItem
            key={coin.denom}
            secondaryAction={
              <IconButton edge="end" aria-label="transfer">
                <SendIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <BlockieAvatar value={coin.denom} />
            </ListItemAvatar>
            <ListItemText primary={`${coin.amount} ${coin.humanReadableDenom}`} secondary={coin.denom} />
          </ListItem>
        ))
      }
    </List>
  );
}

export type BalanceListProps = {
  balances: Coin[],
  onStartTransfer: (denom: Denom) => void,
}

export default BalanceList;
