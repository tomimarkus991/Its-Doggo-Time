import {
  Box,
  Flex,
  HStack,
  IconButton,
  Input,
  VStack,
} from '@chakra-ui/react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { AvatarProfile } from '../../components/Avatar';
import AvatarUpload from '../../components/Avatar/AvatarUpload/AvatarUpload';
import EditButtons from '../../components/Buttons/EditButtons';
import MyProfileContainer from '../../components/Containers/MyProfileContainer';
import { Name } from '../../components/Headers';
import Invites from '../../components/Invites';
import MainLayout from '../../components/Layouts/MainLayout';
import PageHeader from '../../components/Layouts/Pages/PageHeader';
import {
  HeaderAvatar,
  NameAndAvatar,
} from '../../components/Layouts/Profile';
import { MyGroupsLink } from '../../components/Links';
import Skeleton from '../../components/Skeleton';
import { useAuth } from '../../context/authContext/AuthContext';
import useColors from '../../hooks/useColors';
import useToast from '../../hooks/useToast';
import { InviteDataType, StringOrUndefined } from '../../types';
import { supabase } from '../../utils/supabaseClient';

const Profile: React.FC = () => {
  const { user } = useAuth();

  const [username, setUsername] = useState<StringOrUndefined>();
  const [old_username, setOldUsername] = useState<StringOrUndefined>();
  const [avatar_url, setAvatarUrl] = useState<StringOrUndefined>();
  const [userInvites, setUserInvites] = useState<InviteDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserdataLoading, setIsUserdataLoading] =
    useState<boolean>(true);
  const { showToast } = useToast();
  // const [areInvitesLoading, setAreInvitesLoading] =
  //   useState<boolean>(true);
  const [isEditable, setIsEditable] = useState(false);
  const { penColor } = useColors();

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

    try {
      // update username
      await supabase.from('profiles').upsert(profile_updates, {
        returning: 'minimal',
      });
      // update all receivers usernames
      await supabase
        .from('invites')
        .update(
          { receiver: username },
          {
            returning: 'minimal',
          },
        )
        .eq('receiver', old_username);

      // update all senders usernames
      await supabase
        .from('invites')
        .update(
          { sender: username },
          {
            returning: 'minimal',
          },
        )
        .eq('sender', old_username);
      setOldUsername(username);
    } catch (error) {
      throw error;
    } finally {
      showToast({
        title: 'Group Updated',
        description: 'Your Group has been updated.',
      });
    }
  };

  const updateAvatar = async (avatar_url: StringOrUndefined) => {
    try {
      setIsLoading(true);
      const updates = {
        id: user?.id,
        avatar_url,
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
      setIsLoading(false);
      showToast({
        title: 'Photo Updated',
        description: 'Your Profile Photo has been updated.',
      });
    }
  };

  useEffect(() => {
    const fetchUserdata = async () => {
      try {
        setIsUserdataLoading(true);

        let { data, error } = await supabase
          .from('profiles')
          .select(
            `
            id,
            username,
            avatar_url
        `,
          )
          .eq('id', user?.id)
          .single();

        setOldUsername(data.username);
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);

        if (error) throw error.message;
      } catch (error) {
        throw error;
      } finally {
        setIsUserdataLoading(false);
      }
    };

    fetchUserdata();
  }, []);

  return (
    <MainLayout
      leftSide={
        <Skeleton
          isLoading={isUserdataLoading}
          props={{
            borderRadius: 100,
            w: { sm: '95%', md: '90%', lg: 'initial' },
            h: 'fit-content',
          }}
        >
          <HeaderAvatar>
            {isEditable ? (
              <VStack>
                <AvatarUpload
                  onUpload={(url: string) => {
                    setAvatarUrl(url);
                    updateAvatar(url);
                  }}
                  avatar_url={avatar_url}
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
                    width={{ base: '3xs', xl: '2xs' }}
                  />
                  <EditButtons
                    buttonGroupProps={{
                      mt: { base: 0, sm: '2' },
                      alignItems: 'center',
                      size: 'sm',
                    }}
                    onCrossClick={cancelSave}
                    onCheckClick={submitSave}
                  />
                </VStack>
              </VStack>
            ) : (
              <>
                <NameAndAvatar
                  title={username}
                  avatar_url={avatar_url}
                  avatar="User"
                />
                <IconButton
                  onClick={() => setIsEditable(true)}
                  aria-label="Edit"
                  bgColor="transparent"
                  _hover={{ bgColor: 'transparent' }}
                  icon={
                    <FontAwesomeIcon
                      icon={faPen}
                      size={'lg'}
                      color={penColor}
                    />
                  }
                />
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
                    setAvatarUrl(url);
                    updateAvatar(url);
                  }}
                  avatar_url={avatar_url}
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
                    width={{ base: '3xs', xl: '2xs' }}
                  />

                  <EditButtons
                    buttonGroupProps={{
                      mt: { base: 0, sm: '2' },
                      alignItems: 'center',
                      size: 'sm',
                    }}
                    onCrossClick={cancelSave}
                    onCheckClick={submitSave}
                  />
                </VStack>
              </HStack>
            ) : (
              <Flex
                flexDirection="row"
                display={{ base: 'flex', sm: 'none' }}
                alignItems="center"
              >
                <Box mr={2}>
                  <AvatarProfile src={avatar_url} />
                </Box>

                <Name
                  title={username}
                  textProps={{
                    fontSize: '4xl',
                  }}
                />
                <IconButton
                  onClick={() => setIsEditable(true)}
                  aria-label="Edit"
                  bgColor="transparent"
                  _hover={{ bgColor: 'transparent' }}
                  icon={
                    <FontAwesomeIcon
                      icon={faPen}
                      size={'lg'}
                      color={penColor}
                    />
                  }
                />
              </Flex>
            )}
          </Flex>

          <PageHeader>My Profile</PageHeader>

          <MyProfileContainer isLoading={isLoading} />
        </>
      }
      rightSide={
        <>
          <Invites
            userInvites={userInvites}
            setUserInvites={setUserInvites}
            currentUsername={username}
          />
          <MyGroupsLink />
        </>
      }
    />
  );
};
export default Profile;
