import { Avatar } from './Avatar';
import ProfileAvatarIcon from '../Icons/Avatar/Profile';
import { StringOrUndefined } from '../../types';
interface Props {
  src: StringOrUndefined;
}

export const AvatarProfile: React.FC<Props> = ({ src }) => {
  return (
    <Avatar
      src={src}
      w={{ base: '7rem', sm: '7rem', md: '9rem' }}
      h={{ base: '7rem', sm: '7rem', md: '9rem' }}
      icon={
        <ProfileAvatarIcon
          fontSize={{ base: '5rem', sm: '5rem', md: '6rem' }}
        />
      }
    />
  );
};
