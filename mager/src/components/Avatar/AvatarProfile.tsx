import { BlackProfileIcon } from '../Icons/Profile/BlackProfileIcon';
import { Avatar } from './Avatar';

interface Props {
  src: string;
}

export const AvatarProfile: React.FC<Props> = ({ src }) => {
  return (
    <Avatar
      src={src}
      w={{ base: '8rem', sm: '7rem', md: '9rem' }}
      h={{ base: '8rem', sm: '7rem', md: '9rem' }}
      icon={
        <BlackProfileIcon
          fontSize={{ base: '5.5rem', sm: '5rem', md: '6rem' }}
        />
      }
    />
  );
};