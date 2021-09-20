import {
  Box,
  Center,
  Grid,
  Heading,
  HStack,
  IconButton,
  Input,
  VStack,
} from '@chakra-ui/react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AvatarProfile } from '../../components/Avatar';
import AvatarUpload from '../../components/Avatar/AvatarUpload/AvatarUpload';
import { GradientButton } from '../../components/Buttons';
import EditButtons from '../../components/Buttons/EditButtons';
import ColorMode from '../../components/ColorMode';
import { Name } from '../../components/Headers';
import Invites from '../../components/Invites';
import MainLayout from '../../components/Layouts/MainLayout';
import { HeaderAvatar } from '../../components/Layouts/Profile';
import { MyGroupsLink } from '../../components/Links';
import Skeleton from '../../components/Skeleton';
import { GradientButtonText } from '../../components/Text';
import { useAuth } from '../../context/authContext/AuthContext';
import useColors from '../../hooks/useColors';
import useToast from '../../hooks/useToast';
import { InviteDataType, StringOrUndefined } from '../../types';
import { supabase } from '../../utils/supabaseClient';

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const router = useHistory();

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
                </VStack>
              </VStack>
            ) : (
              <VStack flexDirection={{ sm: 'row', lg: 'column' }}>
                <Box mr={{ sm: 4, md: 6, lg: 0 }}>
                  <AvatarProfile src={avatar_url} />
                </Box>
                <HStack flex={1}>
                  <Name
                    title={username}
                    textProps={{
                      fontSize: { sm: '4xl', md: '5xl' },
                    }}
                  />
                </HStack>
              </VStack>
            )}
          </HeaderAvatar>
        </Skeleton>
      }
      middle={
        <Grid
          h={{ base: '100%', sm: '90%' }}
          templateRows={{ base: '0.4fr 1fr', sm: '0.2fr 1fr' }}
          justifyContent={{ base: 'center', lg: 'normal' }}
          alignItems={{ base: 'center', lg: 'normal' }}
        >
          <HStack
            display={{ base: 'flex', sm: 'none' }}
            my="4"
            justifyContent="center"
            alignItems="center"
          >
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
                </VStack>
              </VStack>
            ) : (
              <VStack>
                <AvatarProfile src={avatar_url} />
                <HStack flex={1}>
                  <Name title={username} />
                </HStack>
              </VStack>
            )}
          </HStack>
          <Center display={{ base: 'none', sm: 'flex' }}>
            <Heading fontSize="4xl">My Profile</Heading>
          </Center>
          <Center>
            <VStack
              layerStyle="shadow-and-bg"
              h="xs"
              w={{ base: 'xs', sm: 'sm', md: 'md' }}
              borderRadius={20}
              justifyContent="center"
            >
              <VStack w="xs">
                {isEditable ? (
                  <EditButtons
                    buttonGroupProps={{
                      mt: { base: 0, sm: '2' },
                      alignItems: 'center',
                      size: 'sm',
                    }}
                    onCrossClick={cancelSave}
                    onCheckClick={submitSave}
                  />
                ) : (
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
                )}
                {/* Toggle Color Mode */}
                <Box pt="10">
                  <ColorMode />
                </Box>
                {/*  Sign out */}
                <HStack spacing="8" pt="8">
                  <GradientButton
                    onClick={async () => {
                      router.push('/');
                      await signOut();
                    }}
                    isLoading={isLoading}
                    loadingText="Signing out"
                  >
                    <GradientButtonText fontSize={20}>
                      Sign Out
                    </GradientButtonText>
                  </GradientButton>
                </HStack>
              </VStack>
            </VStack>
          </Center>
        </Grid>
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
