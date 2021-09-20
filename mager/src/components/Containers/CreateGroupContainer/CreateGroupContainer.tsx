import { IconButton, VStack, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../../context/authContext/AuthContext';
import { StringOrUndefined } from '../../../types';
import { supabase } from '../../../utils/supabaseClient';
import AvatarUpload from '../../Avatar/AvatarUpload';
import { AddLogCheckboxIcon } from '../../Icons/Logs';
import MainContainerLayout from '../../Layouts/Containers/MainContainerLayout';

const CreateGroupContainer: React.FC = () => {
  const [group_name, setGroupname] = useState<StringOrUndefined>();
  const [group_avatar_url, setGroupAvatarUrl] =
    useState<StringOrUndefined>();
  const { user } = useAuth();
  const router = useHistory();

  const createGroup = async () => {
    try {
      const updates = {
        group_name,
        avatar_url: group_avatar_url,
        creator_id: user?.id,
        updated_at: new Date(),
      };

      let { data, error } = await supabase
        .from('groups')
        .insert(updates, {
          returning: 'representation',
        })
        .single();
      try {
        const memberUpdates = {
          profile_id: user?.id,
          group_id: data.id,
        };

        let { error } = await supabase
          .from('members')
          .insert(memberUpdates, {
            returning: 'minimal',
          });
        if (error) throw error.message;
      } catch (error) {
        throw error;
      }

      if (error) throw error.message;
    } catch (error) {
      throw error;
    } finally {
      router.push('/');
    }
  };

  return (
    <MainContainerLayout
      mainH={{ base: 'xs', md: 'sm' }}
      isLoading={false}
      containerProps={{
        w: { base: 'xs', sm: 'sm', lg: 'md' },
        h: { base: 'xs', md: 'sm' },
      }}
      button={
        <IconButton
          onClick={() => createGroup()}
          mt={4}
          h="100%"
          aria-label="Add Log Button"
          bgColor="transparent"
          _hover={{ bgColor: 'transparent' }}
          // isDisabled={if you already have 4 groups}
          icon={
            <AddLogCheckboxIcon
              fontSize={{
                base: '5rem',
                md: '6rem',
                lg: '7rem',
              }}
            />
          }
        />
      }
    >
      <VStack pb="12" spacing={4} minW="16rem">
        <AvatarUpload
          onUpload={(url: string) => {
            setGroupAvatarUrl(url);
          }}
          avatar_url={group_avatar_url}
          avatar="Group"
        />
        <Input
          variant={'removeDefault'}
          autoCapitalize="off"
          value={group_name}
          onChange={e => setGroupname(e.target.value)}
          isRequired
          size="lg"
          fontSize="2xl"
          maxW="2xs"
          borderRadius="25"
          placeholder="Group name"
        />
      </VStack>
    </MainContainerLayout>
  );
};
export default CreateGroupContainer;
