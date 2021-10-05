import { Avatar } from '../Avatar';
import { ProfileAvatarIcon } from '../Icons';
interface Props {
  src: string;
}

const ProfileAvatarCard: React.FC<Props> = ({ src }) => {
  return (
    <Avatar
      path={src}
      w={{ base: '5rem', sm: '5.5rem', md: '6rem', lg: '7rem' }}
      h={{ base: '5rem', sm: '5.5rem', md: '6rem', lg: '7rem' }}
      icon={
        <ProfileAvatarIcon
          fontSize={{ base: '3.5rem', md: '4rem', lg: '4.8rem' }}
        />
      }
      type="User"
    />
  );
};

export default ProfileAvatarCard;
