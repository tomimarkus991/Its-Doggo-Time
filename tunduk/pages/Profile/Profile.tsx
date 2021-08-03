import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
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
import { Heading, Name } from '../../components/Headers';
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
  const [userInvites, setUserInvites] = useState<InviteDataType[]>();
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
      if (
        !error.message.includes(
          'JSON.parse: unexpected end of data at line 1 column 1 of the JSON data',
        )
      ) {
        alert(error);
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
      alert(error.message);
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
        alert(error.message);
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
          props={{ borderRadius: 100 }}
        >
          <VStack>
            <AvatarProfile src={avatar_url as string} />
            <AvatarUpload
              onUpload={(url: string) => {
                setAvatarUrl(url);
                updateAvatar(url);
              }}
              title="Update photo"
            />
            <Name title={username} />
          </VStack>
        </Skeleton>
      }
      middle={
        <Box mt="8">
          <Box mb="8">
            <Heading title="My Profile" fontSize={50} />
          </Box>
          <VStack id="tere">
            <VStack
              style={{ boxShadow: '1px 1px 8px 2px #DDCDBF' }}
              h="sm"
              w="xl"
              borderRadius={20}
              justifyContent="center"
            >
              <VStack w="xs">
                <Input
                  value={username || ''}
                  onChange={e => setUsername(e.target.value)}
                  size="lg"
                  fontSize="2xl"
                  borderRadius="25"
                  borderColor="beez.700"
                  maxLength={20}
                  placeholder="Username"
                  _placeholder={{ color: 'gray.800' }}
                />
                <Input
                  value={user?.email}
                  disabled
                  size="lg"
                  fontSize="2xl"
                  borderRadius="25"
                  borderColor="beez.700"
                />
                <InputGroup justifyContent="center" alignItems="center">
                  <Input
                    type={show ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="off"
                    placeholder="Password"
                    size="lg"
                    fontSize="2xl"
                    borderRadius="25"
                    borderColor="beez.700"
                    _placeholder={{ color: 'gray.800' }}
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
                {/* Toggle Color Mode */}
                <Box pt="10">
                  <ColorMode />
                </Box>
                {/* Update & Sign out */}
                <HStack pt="8">
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
          </VStack>
        </Box>
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
