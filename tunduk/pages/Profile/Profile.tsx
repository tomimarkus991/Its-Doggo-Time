import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AvatarProfile, AvatarUpload } from '../../components/Avatar';
import { GradientButton } from '../../components/Buttons';
import ColorMode from '../../components/ColorMode';
import { Name } from '../../components/Headers';
import { DoggoIcon } from '../../components/Icons/Doggo';
import Invites from '../../components/Invites';
import MainLayout from '../../components/Layouts/MainLayout';
import { MyGroupsLink } from '../../components/Links';
import Skeleton from '../../components/Skeleton';
import { GradientButtonText } from '../../components/Text';
import { useAuth } from '../../context/authContext/AuthContext';
import { InviteDataType, StringOrUndefined } from '../../types';
import { supabase } from '../../utils/supabaseClient';

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const toast = useToast();
  const router = useHistory();

  const [username, setUsername] = useState<StringOrUndefined>();
  const [old_username, setOldUsername] = useState<StringOrUndefined>();
  const [password, setPassword] = useState<StringOrUndefined>();
  const [avatar_url, setAvatarUrl] = useState<StringOrUndefined>();
  const [userInvites, setUserInvites] = useState<InviteDataType[]>([]);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserdataLoading, setIsUserdataLoading] =
    useState<boolean>(true);
  // const [areInvitesLoading, setAreInvitesLoading] =
  //   useState<boolean>(true);

  const updateProfile = async (username: StringOrUndefined) => {
    try {
      setIsLoading(true);

      const profile_updates = {
        id: user?.id,
        username,
        updated_at: new Date(),
      };

      // update username
      await supabase.from('profiles').upsert(profile_updates, {
        returning: 'minimal',
      });

      // update password
      if (password?.length) {
        await supabase.auth.update({
          password,
        });
      }

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
    } catch (error) {
      if (error instanceof Error) {
        if (
          !error.message.includes(
            'JSON.parse: unexpected end of data at line 1 column 1 of the JSON data',
          )
        ) {
          alert(error);
        }
      }
    } finally {
      setIsLoading(false);
      toast({
        title: 'Profile Updated',
        description: 'Your Profile has been updated.',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top',
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
      toast({
        title: 'Photo Updated',
        description: 'Your Profile Photo has been updated.',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top',
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
            w: { sm: '100%', md: '100%', lg: 'initial' },
          }}
        >
          <Flex
            id="flex1"
            flexDirection={{ sm: 'row', lg: 'column' }}
            mx={{ sm: '6', lg: 'none' }}
            mt={{ sm: '6', lg: 'none' }}
            justifyContent={{ sm: 'flex-start' }}
            alignItems={{ sm: 'center', lg: 'flex-end' }}
          >
            <Flex
              id="flex2"
              justifyContent="center"
              alignItems="center"
              flexDirection={{ base: 'row', lg: 'column' }}
            >
              <Center flexDirection="column" mr={{ sm: '6', lg: '0' }}>
                <AvatarProfile src={avatar_url as string} />
              </Center>

              <Name title={username} />
            </Flex>
            <Spacer display={{ sm: 'block', lg: 'none' }} />
            <DoggoIcon
              display={{ sm: 'block', lg: 'none' }}
              fontSize={{ sm: '10rem' }}
            />
          </Flex>
        </Skeleton>
      }
      middle={
        <VStack
          id="5"
          justifyContent="center"
          alignItems="center"
          h={{ base: '100%' }}
        >
          <Grid
            h={{ base: '100%' }}
            templateRows={{ base: '0.4fr 0.1fr 1fr', sm: '0.2fr 1fr' }}
          >
            <HStack
              justifyContent="flex-start"
              alignItems="center"
              display={{ base: 'flex', sm: 'none' }}
            >
              <AvatarProfile src={avatar_url as string} />
              <Name title={username} />
            </HStack>
            <Heading
              textAlign="center"
              fontSize={{ base: '4xl', sm: '4xl' }}
            >
              My Profile
            </Heading>
            <VStack
              layerStyle="shadow-and-bg"
              h="sm"
              w={{ base: 'sm', md: 'md', lg: 'lg', xl: 'xl' }}
              borderRadius={20}
              justifyContent="center"
            >
              <VStack w="xs">
                <Skeleton
                  isLoading={isUserdataLoading}
                  props={{ borderRadius: 100 }}
                >
                  <VStack>
                    <Input
                      variant={'removeDefault'}
                      autoCapitalize="off"
                      value={username || ''}
                      onChange={e => setUsername(e.target.value)}
                      size="lg"
                      fontSize="2xl"
                      borderRadius="25"
                      maxLength={20}
                      placeholder="Username"
                    />
                    {user?.app_metadata.provider === 'email' ? (
                      <InputGroup
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Input
                          variant={'removeDefault'}
                          type={show ? 'text' : 'password'}
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          autoComplete="off"
                          autoCapitalize="off"
                          placeholder="Password"
                          size="lg"
                          fontSize="2xl"
                          borderRadius="25"
                        />
                        <InputRightElement width="3rem" h="100%">
                          {show ? (
                            <FontAwesomeIcon
                              icon={faEye}
                              onClick={() => setShow(!show)}
                              cursor="pointer"
                              color="#2A2828"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faEyeSlash}
                              onClick={() => setShow(!show)}
                              cursor="pointer"
                              color="#2A2828"
                            />
                          )}
                        </InputRightElement>
                      </InputGroup>
                    ) : null}
                  </VStack>
                </Skeleton>
                <Box>
                  <AvatarUpload
                    onUpload={(url: string) => {
                      setAvatarUrl(url);
                      updateAvatar(url);
                    }}
                    title="Change Avatar"
                  />
                </Box>
                {/* Toggle Color Mode */}
                <Box pt="10">
                  <ColorMode />
                </Box>
                {/* Update & Sign out */}
                <HStack spacing="8" pt="8">
                  <GradientButton
                    onClick={() => updateProfile(username)}
                    isLoading={isLoading}
                    loadingText="Updating"
                  >
                    <GradientButtonText fontSize={20}>
                      Update
                    </GradientButtonText>
                  </GradientButton>

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
          </Grid>
        </VStack>
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
