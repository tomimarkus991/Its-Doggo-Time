import { Box, Center } from '@chakra-ui/react';
import { useUser } from '../../../context';
import { AvatarProfile } from '../../Avatar';
import { Name } from '../../Headers';

interface Props {}

const ProfileNameAndAvatarMiddle: React.FC<Props> = () => {
  const { username, user_avatar_url } = useUser();
  return (
    <Center flexDirection="row" display={{ base: 'flex', sm: 'none' }}>
      <Box mr={2}>
        <AvatarProfile src={user_avatar_url} />
      </Box>

      <Name
        name={username}
        textProps={{
          fontSize: '4xl',
        }}
      />
    </Center>
  );
};

export default ProfileNameAndAvatarMiddle;
