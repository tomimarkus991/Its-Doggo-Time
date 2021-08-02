import { BlackProfileIcon } from '../Icons/Profile/BlackProfileIcon';
import { Avatar } from './Avatar';

interface Props {
  src: string;
}

export const AvatarProfile: React.FC<Props> = ({ src }) => {
  return (
    <Avatar
      src={src}
      size="3xl"
      icon={<BlackProfileIcon width="6rem" height="6rem" />}
    />
  );
};
