import { Avatar } from '../Avatar';
import { GroupAvatarIcon } from '../Icons';

interface Props {
  path: string | undefined;
}

const GroupAvatarCard: React.FC<Props> = ({ path }) => {
  return (
    <Avatar
      path={path}
      w={{ base: '6rem', md: '7rem' }}
      h={{ base: '6rem', md: '7rem' }}
      icon={<GroupAvatarIcon fontSize={{ base: '4.5rem', md: '5rem' }} />}
      type="Group"
    />
  );
};

export default GroupAvatarCard;
