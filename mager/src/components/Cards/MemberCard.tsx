import { Box, Text, VStack } from '@chakra-ui/react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ProfileAvatarCard } from '.';
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
      <Text fontSize={{ base: '20', sm: '24', md: '28', lg: '28' }}>
        {username}
      </Text>

      {creator_id !== id && isEditable && (
        <Box
          as={FontAwesomeIcon}
          color="red"
          fontSize={{
            base: '2.1rem',
            sm: '2.2rem',
            md: '2.3rem',
            lg: '2.5rem',
          }}
          icon={faTrash}
          bgColor="white"
          py="2"
          px="2"
          position="absolute"
          cursor="pointer"
          onClick={() => removeUser()}
          right="0%"
          bottom="25%"
          borderRadius="100"
        />
      )}
    </VStack>
  );
};

export default MemberCard;
