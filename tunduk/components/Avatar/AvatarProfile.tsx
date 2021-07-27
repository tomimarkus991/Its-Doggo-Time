import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from './Avatar';

interface Props {
  src: string;
}

export const AvatarProfile: React.FC<Props> = ({ src }) => {
  return (
    <Avatar
      src={src}
      size="3xl"
      icon={<FontAwesomeIcon icon={faUser} size="6x" />}
    />
  );
};
