import { Box, Center } from '@chakra-ui/react';
import { useGroup } from '../../../context';
import { AvatarGroup } from '../../Avatar';
import { Name } from '../../Headers';

interface Props {}

const GroupNameAndAvatar: React.FC<Props> = ({}) => {
  const { groupname, group_avatar_url } = useGroup();
  return (
    <Center flexDirection={{ sm: 'row', lg: 'column' }}>
      <Box mr={{ sm: '6', lg: '0' }}>
        <AvatarGroup src={group_avatar_url} />
      </Box>

      <Name
        name={groupname}
        textProps={{
          fontSize: { sm: '4xl', md: '5xl' },
        }}
      />
    </Center>
  );
};

export default GroupNameAndAvatar;
