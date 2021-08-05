import { BlackProfileIcon } from '../../Icons/Profile/BlackProfileIcon';
import { Avatar } from '../Avatar';

interface Props {
  src: string;
}

export const ProfileAvatarCard: React.FC<Props> = ({ src }) => {
  return (
    <Avatar
      src={src}
      w={{ base: '6rem', md: '7rem' }}
      h={{ base: '6rem', md: '7rem' }}
      icon={<BlackProfileIcon fontSize={{ base: '4rem', md: '4.5rem' }} />}
    />
  );
};
