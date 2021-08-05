import { GroupProfileIcon } from '../Icons/Profile/GroupProfileIcon';
import { Avatar } from './Avatar';

interface Props {
  src: string;
}

export const AvatarGroup: React.FC<Props> = ({ src }) => {
  return (
    <Avatar
      src={src}
      w={{ base: '6rem', sm: '7rem', md: '9rem' }}
      h={{ base: '6rem', sm: '7rem', md: '9rem' }}
      icon={
        <GroupProfileIcon
          fontSize={{ base: '4rem', sm: '5rem', md: '7rem' }}
        />
      }
    />
  );
};
