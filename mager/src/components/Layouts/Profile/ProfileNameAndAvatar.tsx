import { Box, Center } from '@chakra-ui/react';
import { useUser } from '../../../context';
import { AvatarProfile } from '../../Avatar';
import { Name } from '../../Headers';

interface Props {}

const ProfileNameAndAvatar: React.FC<Props> = ({}) => {
  const { username, user_avatar_url } = useUser();
  return (
    <Center flexDirection={{ sm: 'row', lg: 'column' }}>
      <Box mr={{ sm: '6', lg: '0' }}>
        <AvatarProfile src={user_avatar_url} />
      </Box>

      <Name
        name={username}
        textProps={{
          fontSize: { sm: '4xl', md: '5xl' },
        }}
      />
    </Center>
  );
};

export default ProfileNameAndAvatar;
