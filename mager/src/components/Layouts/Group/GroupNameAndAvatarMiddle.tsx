import { Box, Center } from '@chakra-ui/react';
import { useGroup } from '../../../context';
import { AvatarGroup } from '../../Avatar';
import { Name } from '../../Headers';

interface Props {}

const GroupNameAndAvatarMiddle: React.FC<Props> = () => {
  const { groupname, group_avatar_url } = useGroup();
  return (
    <Center display={{ base: 'flex', sm: 'none' }}>
      <Box mr={2}>
        <AvatarGroup src={group_avatar_url} />
      </Box>

      <Name
        name={groupname}
        textProps={{
          fontSize: '4xl',
        }}
      />
    </Center>
  );
};

export default GroupNameAndAvatarMiddle;
