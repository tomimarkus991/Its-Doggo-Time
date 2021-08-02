import { GroupProfileIcon } from '../Icons/Profile/GroupProfileIcon';
import { Avatar } from './Avatar';

interface Props {
  src: string;
}

export const AvatarInvite: React.FC<Props> = ({ src }) => {
  return (
    <Avatar
      src={src}
      size="xl"
      icon={<GroupProfileIcon fontSize="5rem" />}
    />
  );
};
