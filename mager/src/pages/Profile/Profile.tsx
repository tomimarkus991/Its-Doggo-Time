import { Center, Flex, HStack, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AvatarUpload } from '../../components/Avatar';
import { EditButtons, PenButton } from '../../components/Buttons';
import { MyProfileContainer } from '../../components/Containers';
import { Invites } from '../../components/Invites';
import {
  HeaderAvatar,
  MainLayout,
  PageHeader,
} from '../../components/Layouts';
import {
  ProfileNameAndAvatar,
  ProfileNameAndAvatarMiddle,
} from '../../components/Layouts/Profile';
import { MyGroupsLink } from '../../components/Links';
import { Skeleton } from '../../components/Skeleton';
import { useAuth } from '../../context';
import { useUser } from '../../context/UserContext';
import { useToast } from '../../hooks';
import { useFetchUserProfile } from '../../hooks/api';
import { StringOrUndefined } from '../../types';
import { supabase } from '../../utils/supabaseClient';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const {
    username,
    setUsername,
    user_avatar_url,
    setUserAvatarUrl,
    old_username,
    setOldUsername,
  } = useUser();

  const [isAvatarLoading, setIsAvatarLoading] = useState(false);

  const { showToast } = useToast();
  const [isEditable, setIsEditable] = useState(false);

  const { isLoading } = useFetchUserProfile();

  const cancelSave = () => {
    setUsername(old_username);
    setIsEditable(false);
  };

  const submitSave = async () => {
    setIsEditable(false);
    const profile_updates = {
      id: user?.id,
      username,
      updated_at: new Date(),
    };
    if (username !== old_username) {
      try {
        // update username
        await supabase.from('profiles').upsert(profile_updates, {
          returning: 'minimal',
        });

        // delete all invites for that user
        await supabase
          .from('invites')
          .delete()
          .eq('sender', old_username)
          .eq('receiver', old_username);

        setOldUsername(username);
      } catch (error) {
        throw error;
      } finally {
        showToast({
          title: 'Group Updated',
          description: 'Your Group has been updated.',
        });
      }
    }
  };

  const updateAvatar = async (user_avatar_url: StringOrUndefined) => {
    try {
      setIsAvatarLoading(true);
      const updates = {
        id: user?.id,
        avatar_url: user_avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal',
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    } finally {
      setIsAvatarLoading(false);
      showToast({
        title: 'Photo Updated',
        description: 'Your Profile Photo has been updated.',
      });
    }
  };

  return (
    <MainLayout
      leftSide={
        <Skeleton
          isLoading={isLoading}
          props={{
            borderRadius: 100,
            w: { sm: '95%', md: '90%', lg: 'initial' },
            h: 'fit-content',
          }}
        >
          <HeaderAvatar>
            {isEditable ? (
              <HStack flexDirection={{ sm: 'row', lg: 'column' }}>
                <AvatarUpload
                  onUpload={(url: string) => {
                    setUserAvatarUrl(url);
                    updateAvatar(url);
                  }}
                  avatar_url={user_avatar_url}
                  avatar="User"
                />
                <VStack>
                  <Input
                    variant={'removeDefault'}
                    autoCapitalize="off"
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                    isDisabled={!isEditable}
                    borderRadius="50"
                    fontSize="3xl"
                    size="lg"
                    mt="4"
                    bg="white"
                    width={{ sm: '3xs', xl: '2xs' }}
                  />
                  <EditButtons
                    buttonGroupProps={{
                      mt: 2,
                      size: 'sm',
                    }}
                    onCrossClick={cancelSave}
                    onCheckClick={submitSave}
                  />
                </VStack>
              </HStack>
            ) : (
              <>
                <ProfileNameAndAvatar />
                <PenButton onClick={() => setIsEditable(true)} />
              </>
            )}
          </HeaderAvatar>
        </Skeleton>
      }
      middle={
        <>
          <Flex flexDirection="row" display={{ base: 'flex', sm: 'none' }}>
            {isEditable ? (
              <HStack>
                <AvatarUpload
                  onUpload={(url: string) => {
                    setUserAvatarUrl(url);
                    updateAvatar(url);
                  }}
                  avatar_url={user_avatar_url}
                  avatar="User"
                />

                <VStack>
                  <Input
                    variant={'removeDefault'}
                    autoCapitalize="off"
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                    isDisabled={!isEditable}
                    borderRadius="50"
                    fontSize="3xl"
                    size="lg"
                    mt="4"
                    bg="white"
                    width="3xs"
                  />

                  <EditButtons
                    buttonGroupProps={{
                      size: 'sm',
                    }}
                    onCrossClick={cancelSave}
                    onCheckClick={submitSave}
                  />
                </VStack>
              </HStack>
            ) : (
              <Center>
                <ProfileNameAndAvatarMiddle />
                <PenButton onClick={() => setIsEditable(true)} />
              </Center>
            )}
          </Flex>
          <PageHeader>My Profile</PageHeader>
          <MyProfileContainer isLoading={isAvatarLoading} />
        </>
      }
      rightSide={
        <>
          <Invites />
          <MyGroupsLink />
        </>
      }
    />
  );
};
export default Profile;
