import { StringOrUndefined } from '../../types';
import { GroupProfileIcon } from '../Icons/Profile/GroupProfileIcon';
import { Avatar } from './Avatar';

interface Props {
  src: StringOrUndefined;
}

export const AvatarGroup: React.FC<Props> = ({ src }) => {
  return (
    <Avatar
      src={src}
      size="3xl"
      icon={<GroupProfileIcon fontSize="7rem" />}
    />
  );
};
