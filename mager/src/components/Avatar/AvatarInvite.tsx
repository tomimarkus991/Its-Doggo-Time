import GroupAvatarIcon from '../Icons/Avatar/Group';
import { Avatar } from './Avatar';

interface Props {
  src: string;
}

export const AvatarInvite: React.FC<Props> = ({ src }) => {
  return (
    <Avatar
      src={src}
      w={{ base: '6rem', md: '7rem' }}
      h={{ base: '6rem', md: '7rem' }}
      icon={<GroupAvatarIcon fontSize={{ base: '4.5rem', md: '5rem' }} />}
    />
  );
};
