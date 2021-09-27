import { Avatar } from '../Avatar';
import { GroupAvatarIcon } from '../Icons';

interface Props {
  src: string;
}

const GroupAvatarCard: React.FC<Props> = ({ src }) => {
  return (
    <Avatar
      src={src}
      w={{ base: '6rem', md: '7rem' }}
      h={{ base: '6rem', md: '7rem' }}
      icon={<GroupAvatarIcon fontSize={{ base: '4.5rem', md: '5rem' }} />}
    />
  );
};

export default GroupAvatarCard;
