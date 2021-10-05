import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton, Text, VStack } from '@chakra-ui/react';
import { ProfileAvatarCard } from '.';
import { useColors } from '../../hooks';
import { MemberType, StringOrUndefined } from '../../types';
import { supabase } from '../../utils/supabaseClient';

interface Props {
  member: MemberType;
  isEditable: boolean;
  group_id: StringOrUndefined;
  creator_id: StringOrUndefined;
}

const MemberCard: React.FC<Props> = ({
  member,
  isEditable,
  group_id,
  creator_id,
}) => {
  const { id, username, avatar_url } = member;
  const { containerBackgroundColor } = useColors();

  const removeUser = async () => {
    try {
      await supabase
        .from('members')
        .delete()
        .eq('profile_id', id)
        .eq('group_id', group_id);
    } catch (error) {
      throw error;
    }
  };

  return (
    <VStack spacing={0} position="relative">
      <ProfileAvatarCard src={avatar_url} />
      <Text fontSize={{ base: '23', sm: '24', md: '28', lg: '28' }}>
        {username}
      </Text>

      {creator_id == id && isEditable && (
        <IconButton
          aria-label="Remove"
          colorScheme="red"
          size="md"
          icon={<DeleteIcon color="red.500" fontSize={'1.3rem'} />}
          bgColor={containerBackgroundColor}
          border="2px"
          borderColor="beez.700"
          position="absolute"
          cursor="pointer"
          onClick={() => removeUser()}
          right={{ base: '0', sm: '5%' }}
          bottom="25%"
          isRound
        />
      )}
    </VStack>
  );
};

export default MemberCard;
