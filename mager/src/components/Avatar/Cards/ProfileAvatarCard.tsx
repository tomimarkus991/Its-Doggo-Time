import { Avatar } from '../Avatar';
import ProfileAvatarIcon from '../../Icons/Avatar/Profile';
interface Props {
  src: string;
}

export const ProfileAvatarCard: React.FC<Props> = ({ src }) => {
  return (
    <Avatar
      src={src}
      w={{ base: '5rem', sm: '5.5rem', md: '6rem', lg: '7rem' }}
      h={{ base: '5rem', sm: '5.5rem', md: '6rem', lg: '7rem' }}
      icon={
        <ProfileAvatarIcon
          fontSize={{ base: '3.5rem', md: '4rem', lg: '4.8rem' }}
        />
      }
    />
  );
};
