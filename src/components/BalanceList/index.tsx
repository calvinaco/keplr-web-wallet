import { Coin } from '../../apptypes.d';
import BlockieAvatar from '../BlockieAvatar';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

type MinimalDenom = string;

function BalanceList(props: BalanceListProps) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {props.balances.map((coin: Coin) => (
        <ListItem
          key={coin.denom}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="transfer"
              onClick={() => {
                props.onStartTransfer(coin.denom);
              }}>
              <SendIcon />
            </IconButton>
          }>
          <ListItemAvatar>
            <BlockieAvatar value={coin.denom} />
          </ListItemAvatar>
          <ListItemText
            primary={`${coin.humanReadableAmount} ${coin.humanReadableDenom}`}
            secondary={`${coin.amount} ${coin.denom}`}
          />
        </ListItem>
      ))}
    </List>
  );
}

export type BalanceListProps = {
  balances: Coin[];
  onStartTransfer: (minimalDenom: MinimalDenom) => void;
};

export default BalanceList;
