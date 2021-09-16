import { Flex, Box } from '@chakra-ui/react';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StringOrUndefined } from '../../../types';
import { AvatarGroup, AvatarProfile } from '../../Avatar';
import { Name } from '../../Headers';

interface Props {
  title: StringOrUndefined;
  avatar_url: string;
  avatar: 'User' | 'Group';
  AvatarUpload?: any;
}

export const NameAndEditableAvatar: React.FC<Props> = ({
  title,
  avatar_url,
  avatar,
  AvatarUpload,
}) => {
  return (
    <Flex
      id="flex2"
      justifyContent="center"
      alignItems="center"
      flexDirection={{ sm: 'row', lg: 'column' }}
    >
      <Flex
        id="editable avatar box"
        mr={{ sm: '6', lg: '0' }}
        cursor="pointer"
      >
        {AvatarUpload}

        {avatar === 'User' ? (
          <AvatarProfile src={avatar_url} />
        ) : (
          <AvatarGroup src={avatar_url} />
        )}
        <Box position="relative" left="-35%">
          <Box
            as={FontAwesomeIcon}
            bgColor="white"
            py="2"
            px="2"
            bottom="-5%"
            borderRadius="100"
            position="absolute"
            icon={faImage}
            cursor="pointer"
            size="3x"
          />
        </Box>
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
