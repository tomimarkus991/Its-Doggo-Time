import { Box, IconButton, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useCreateGroup } from '../../hooks/mutations';
import { AvatarUpload } from '../Avatar';
import { AddLogCheckboxIcon } from '../Icons';
import { MainContainerLayout } from '../Layouts';

const CreateGroupContainer: React.FC = () => {
  const [groupname, setGroupname] = useState('');
  const [group_avatar_url, setGroupAvatarUrl] = useState('');

  const router = useHistory();

  const { mutate, isSuccess } = useCreateGroup(
    groupname,
    group_avatar_url,
  );

  if (isSuccess) {
    router.push('/');
  }

  return (
    <MainContainerLayout
      isLoading={false}
      containerProps={{
        w: { base: 'xs', sm: 'sm', lg: 'md' },
        h: { base: 'xs', md: 'sm' },
      }}
      button={
        <Box
          as={IconButton}
          onClick={() => mutate()}
          mt={4}
          h="100%"
          aria-label="Create Group Button"
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
          value={groupname}
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
