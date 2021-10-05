import { Avatar } from '.';
import { GroupAvatarIcon } from '../Icons';
import { StringOrUndefined } from '../../types';
interface Props {
  src: StringOrUndefined;
}

const AvatarGroup: React.FC<Props> = ({ src }) => {
  return (
    <Avatar
      path={src}
      w={{ base: '7rem', md: '9rem' }}
      h={{ base: '7rem', md: '9rem' }}
      icon={<GroupAvatarIcon fontSize={{ base: '5rem', md: '7rem' }} />}
      type="Group"
    />
  );
};

export default AvatarGroup;
