import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  toast,
  useColorMode,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '@supabase/supabase-js';
import React, { useContext, useEffect, useState } from 'react';
import { AvatarProfile, AvatarUpload } from '../../components/Avatar';
import { GradientButton } from '../../components/Buttons';
import { Heading, Name } from '../../components/Headers';
import Invites from '../../components/Invites';
import MainLayout from '../../components/Layouts/MainLayout';
import { MyGroupsLink } from '../../components/Links';
import { AuthContext } from '../../context/authContext';
import {
  InviteGroupsType,
  ProfileType,
  StringOrUndefined,
} from '../../types';
import { supabase } from '../../utils/supabaseClient';

const Profile: React.FC = () => {
  const { session } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<StringOrUndefined>();
  const [avatar_url, setAvatarUrl] = useState<StringOrUndefined>();
  const [userInvites, setUserInvites] = useState<InviteGroupsType[]>();
  const [userData, setUserData] = useState<ProfileType>();
  const [user] = useState<User | null>(supabase.auth.user());
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const getProfile = async () => {
    try {
      setLoading(true);
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, avatar_url`)
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async ({
    username,
    avatar_url,
  }: {
    username: StringOrUndefined;
    avatar_url: StringOrUndefined;
  }) => {
    try {
      setLoading(true);
      if (!user) throw new Error('Not Authenticated');

      const updates = {
        id: user.id,
        username,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
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

  const fetchUserGroups = async () => {
    try {
      let { data, error } = await supabase
        .from('profiles')
        .select(
          `
          id,
          username,
          avatar_url,
          groups (id, group_name, avatar_url, creator_id)
      `,
        )
        .eq('id', user?.id);
      if (!data) throw error;

      setUserData(data[0]);
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  };

  const fetchInvites = async () => {
    try {
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
        .eq('receiver', userData?.username);
      if (!data) throw error;
      setUserInvites(data);

      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchInvites();
  }, [userData]);

  useEffect(() => {
    fetchUserGroups();
    getProfile();
  }, []);
  return (
    <Box>
      {session ? (
        <MainLayout
          leftSide={
            <>
              <AvatarProfile src={avatar_url} />
              <AvatarUpload
                onUpload={(url: string) => {
                  setAvatarUrl(url);
                  updateProfile({ username, avatar_url: url });
                }}
              />
              <Name title={username} />
            </>
          }
          middle={
            <Box mt="8">
              <Box mb="8">
                <Heading title="My Profile" />
              </Box>
              <Flex
                h="md"
                w="100%"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                id="1"
              >
                <VStack
                  id="2"
                  h="sm"
                  w="xl"
                  borderRadius={20}
                  boxShadow="lg"
                >
                  <VStack id="3" w="2xs">
                    <Input
                      value={username || ''}
                      onChange={e => setUsername(e.target.value)}
                      size="lg"
                      fontSize="2xl"
                      borderRadius="25"
                      borderColor="beez.900"
                      maxLength={20}
                    />
                    <Input
                      value={user?.email}
                      disabled
                      size="lg"
                      fontSize="xl"
                      borderRadius="25"
                      borderColor="beez.900"
                    />
                    <Input
                      type="password"
                      value="tererere"
                      onChange={e => setUsername(e.target.value)}
                      size="lg"
                      fontSize="2xl"
                      borderRadius="25"
                      borderColor="beez.900"
                    />
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
                        onClick={() =>
                          updateProfile({ username, avatar_url })
                        }
                        colorScheme="pink"
                        disabled={loading}
                        borderRadius="20"
                        size="lg"
                        fontSize="xl"
                      >
                        {loading ? 'Updating...' : 'Update'}
                      </Button>
                      <GradientButton
                        onClick={() => supabase.auth.signOut()}
                      >
                        Sign Out
                      </GradientButton>
                    </HStack>
                  </VStack>
                </VStack>
              </Flex>
            </Box>
          }
          rightSide={
            <>
              <Invites userInvites={userInvites} />
              <MyGroupsLink />
            </>
          }
        />
      ) : null}
    </Box>
  );
};
export default Profile;
