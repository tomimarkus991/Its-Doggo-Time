import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorMode,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {
  faEye,
  faEyeSlash,
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AvatarProfile, AvatarUpload } from '../../components/Avatar';
import { GradientButton } from '../../components/Buttons';
import { Heading, Name } from '../../components/Headers';
import Invites from '../../components/Invites';
import MainLayout from '../../components/Layouts/MainLayout';
import { MyGroupsLink } from '../../components/Links';
import Skeleton from '../../components/Skeleton';
import { useAuth } from '../../context/authContext/AuthContext';
import {
  InviteGroupsType,
  ProfileType,
  StringOrUndefined,
} from '../../types';
import { supabase } from '../../utils/supabaseClient';

const Profile: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, signOut } = useAuth();
  const toast = useToast();
  const router = useHistory();

  const [username, setUsername] = useState<StringOrUndefined>();
  const [password, setPassword] = useState<StringOrUndefined>();
  const [avatar_url, setAvatarUrl] = useState<StringOrUndefined>();
  const [userInvites, setUserInvites] = useState<InviteGroupsType[]>();
  const [userdata, setUserdata] = useState<ProfileType>();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserdataLoading, setIsUserdataLoading] =
    useState<boolean>(true);
  const [areInvitesLoading, setAreInvitesLoading] =
    useState<boolean>(true);

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

      setUserdata(data);
      setUsername(data.username);
      setAvatarUrl(data.avatar_url);

      if (error) throw error.message;
    } catch (error) {
      alert(error.message);
    } finally {
      setIsUserdataLoading(false);
    }
  };

  const fetchInvites = async () => {
    try {
      setAreInvitesLoading(true);
      const { data, error } = await supabase
        .from('invites')
        .select(
          `
            id,
            receiver,
            sender,
            group_id,
            groups (id, group_name, avatar_url)
          `,
        )
        .eq('receiver', userdata?.username);
      if (error) throw error.message;

      setUserInvites(data as InviteGroupsType[]);
    } catch (error) {
      alert(error.message);
    } finally {
      setAreInvitesLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      setIsLoading(true);
      const updates = {
        id: user?.id,
        username,
        updated_at: new Date(),
      };

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal',
      });

      await supabase.auth.update({
        password,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
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
    fetchInvites();
  }, [userdata]);

  useEffect(() => {
    fetchUserdata();
  }, []);
  return (
    <MainLayout
      leftSide={
        <Skeleton
          isLoading={isUserdataLoading}
          props={{ borderRadius: 100 }}
        >
          <AvatarProfile src={avatar_url as string} />
          <AvatarUpload
            onUpload={(url: string) => {
              setAvatarUrl(url);
              updateAvatar(url);
            }}
            title="Update photo"
          />
          <Name title={username} />
        </Skeleton>
      }
      middle={
        <Box mt="8">
          <Box mb="8">
            <Heading title="My Profile" />
          </Box>
          <VStack h="md">
            <VStack h="sm" w="xl" borderRadius={20} boxShadow="lg">
              <VStack w="2xs">
                <Input
                  value={username || ''}
                  onChange={e => setUsername(e.target.value)}
                  size="lg"
                  fontSize="3xl"
                  borderRadius="25"
                  borderColor="beez.900"
                  maxLength={20}
                  placeholder="Username"
                  _placeholder={{ color: 'gray.800' }}
                />
                <Input
                  value={user?.email}
                  disabled
                  size="lg"
                  fontSize="xl"
                  borderRadius="25"
                  borderColor="beez.900"
                />
                <InputGroup justifyContent="center" alignItems="center">
                  <Input
                    type={show ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="off"
                    placeholder="Password"
                    size="lg"
                    fontSize="xl"
                    borderRadius="25"
                    borderColor="beez.900"
                    _placeholder={{ color: 'gray.800' }}
                  />
                  <InputRightElement
                    id="input roigs"
                    width="3rem"
                    h="100%"
                  >
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
                  <Button onClick={toggleColorMode} variant="ghost">
                    {colorMode === 'light' ? (
                      <FontAwesomeIcon icon={faMoon} size="2x" />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSun}
                        color="#D69E2E"
                        size="2x"
                      />
                    )}
                  </Button>
                </Box>
                {/* Update & Sign out */}
                <HStack pt="8">
                  <Button
                    onClick={updateProfile}
                    colorScheme="pink"
                    isLoading={isLoading}
                    borderRadius="20"
                    size="lg"
                    fontSize="xl"
                    loadingText="Updating"
                  >
                    Update
                  </Button>

                  <GradientButton
                    onClick={async () => {
                      router.push('/');
                      await signOut();
                    }}
                    isLoading={isLoading}
                    loadingText="Signing out"
                  >
                    <Text fontSize={30} color="gray.800">
                      Sign Out
                    </Text>
                  </GradientButton>
                </HStack>
              </VStack>
            </VStack>
          </VStack>
        </Box>
      }
      rightSide={
        <>
          <Invites userInvites={userInvites} />
          <MyGroupsLink />
        </>
      }
    />
  );
};
export default Profile;
