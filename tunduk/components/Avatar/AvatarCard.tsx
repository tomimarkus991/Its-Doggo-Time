import { AvatarIconType } from '../../types';
import { Avatar } from './Avatar';

interface Props {
  src: string;
  icon: AvatarIconType;
}

export const AvatarCard: React.FC<Props> = ({ src, icon }) => {
  return <Avatar src={src} size="xl" icon={icon} />;
};
