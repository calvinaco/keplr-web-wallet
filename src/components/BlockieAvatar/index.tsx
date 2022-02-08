import Avatar, { AvatarProps } from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import makeBlockie from 'ethereum-blockies-base64';

export type BlockieAvatarProps = AvatarProps & {
  value: string;
};

function BlockieAvatar(props: BlockieAvatarProps) {
  if (props.value === '') {
    return <Avatar />;
  }

  return (
    <Tooltip title={props.value}>
      <Avatar alt={props.value} src={makeBlockie(props.value)} {...props} />
    </Tooltip>
  );
}

export default BlockieAvatar;
