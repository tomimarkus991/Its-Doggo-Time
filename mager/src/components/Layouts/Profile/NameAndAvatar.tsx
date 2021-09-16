import { Flex } from '@chakra-ui/react';
import { StringOrUndefined } from '../../../types';
import { AvatarGroup, AvatarProfile } from '../../Avatar';
import { Name } from '../../Headers';

interface Props {
  title: StringOrUndefined;
  avatar_url: string;
  avatar: 'User' | 'Group';
}

export const NameAndAvatar: React.FC<Props> = ({
  title,
  avatar_url,
  avatar,
}) => {
  return (
    <Flex
      id="flex2"
      justifyContent="center"
      alignItems="center"
      flexDirection={{ sm: 'row', lg: 'column' }}
    >
      <Flex id="regular avatar box" mr={{ sm: '6', lg: '0' }}>
        {avatar === 'User' ? (
          <AvatarProfile src={avatar_url} />
        ) : (
          <AvatarGroup src={avatar_url} />
        )}
      </Flex>

      <Name
        title={title}
        textProps={{
          fontSize: { sm: '4xl', md: '5xl' },
        }}
      />
    </Flex>
  );
};
