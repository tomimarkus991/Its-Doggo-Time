import { Box, Flex } from '@chakra-ui/react';
import { StringOrUndefined } from '../../../types';
import { AvatarGroup, AvatarProfile } from '../../Avatar';
import { Name } from '../../Headers';

interface Props {
  name: StringOrUndefined;
  avatar_url: StringOrUndefined;
  avatar: 'User' | 'Group';
}

export const NameAndAvatarMiddle: React.FC<Props> = ({
  name,
  avatar_url,
  avatar,
}) => {
  return (
    <Flex
      flexDirection="row"
      display={{ base: 'flex', sm: 'none' }}
      alignItems="center"
    >
      <Box mr={2}>
        {avatar === 'User' ? (
          <AvatarProfile src={avatar_url} />
        ) : (
          <AvatarGroup src={avatar_url} />
        )}
      </Box>

      <Name
        title={name}
        textProps={{
          fontSize: '4xl',
        }}
      />
    </Flex>
  );
};
