import { GroupProfileIcon } from '../../Icons/Profile/GroupProfileIcon';
import { Avatar } from '../Avatar';

interface Props {
  src: string;
}

export const GroupAvatarCard: React.FC<Props> = ({ src }) => {
  return (
    <Avatar
      src={src}
      w={{ base: '6rem', md: '7rem' }}
      h={{ base: '6rem', md: '7rem' }}
      icon={<GroupProfileIcon fontSize={{ base: '4.5rem', md: '5rem' }} />}
    />
  );
};
