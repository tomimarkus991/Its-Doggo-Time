import { Avatar } from './Avatar';
import GroupAvatarIcon from '../Icons/Avatar/Group';
import { StringOrUndefined } from '../../types';
interface Props {
  src: StringOrUndefined;
}

export const AvatarGroup: React.FC<Props> = ({ src }) => {
  return (
    <Avatar
      src={src}
      w={{ base: '6rem', sm: '7rem', md: '9rem' }}
      h={{ base: '6rem', sm: '7rem', md: '9rem' }}
      icon={
        <GroupAvatarIcon
          fontSize={{ base: '4rem', sm: '5rem', md: '7rem' }}
        />
      }
    />
  );
};
