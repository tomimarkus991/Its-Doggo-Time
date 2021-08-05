import { IconButton, Text, VStack } from '@chakra-ui/react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ProfileType, StringOrUndefined } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import { ProfileAvatarCard } from '../Avatar/Cards';

interface Props {
  member: ProfileType;
  isEditable: boolean;
  group_id: StringOrUndefined;
  creator_id: StringOrUndefined;
}

export const MemberCard: React.FC<Props> = ({
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
      <Text fontSize={28}>{username}</Text>
      <>
        {isEditable && creator_id !== id ? (
          <IconButton
            onClick={() => removeUser()}
            position="absolute"
            bottom="0"
            right="-4"
            aria-label="Remove User"
            bgColor="transparent"
            _hover={{ bgColor: 'transparent' }}
            icon={
              <FontAwesomeIcon icon={faTrash} size={'lg'} color="red" />
            }
          />
        ) : null}
      </>
    </VStack>
  );
};
