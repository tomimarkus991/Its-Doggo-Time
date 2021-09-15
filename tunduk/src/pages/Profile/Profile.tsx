import {
  Box,
  Grid,
  Heading,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AvatarProfile, AvatarUpload } from '../../components/Avatar';
import { GradientButton } from '../../components/Buttons';
import ColorMode from '../../components/ColorMode';
import { Name } from '../../components/Headers';
import Invites from '../../components/Invites';
import MainLayout from '../../components/Layouts/MainLayout';
import {
  HeaderAvatar,
  NameAndAvatar,
} from '../../components/Layouts/Profile';
import { MyGroupsLink } from '../../components/Links';
import Skeleton from '../../components/Skeleton';
import { GradientButtonText } from '../../components/Text';
import { useAuth } from '../../context/authContext/AuthContext';
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
      showToast({
        title: 'Profile Updated',
        description: 'Your Profile has been updated.',
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
          }}
        >
          <HeaderAvatar
            nameAndAvatar={
              <NameAndAvatar
                title={username}
                avatar_url={avatar_url as string}
                avatar="User"
              />
            }
          />
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
              justifyContent={{ base: 'center', sm: 'flex-start' }}
              flexDirection={{ base: 'column', sm: 'row' }}
              alignItems="center"
              display={{ base: 'flex', sm: 'none' }}
              mt={{ base: 12, sm: 0 }}
              mb={{ base: 10, sm: 0 }}
            >
              <AvatarProfile src={avatar_url as string} />
              <Name title={username} />
            </HStack>
            <Heading
              textAlign="center"
              fontSize={{ base: '4xl', sm: '4xl' }}
              mb={{ base: 4, sm: 0 }}
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
                  <Input
                    variant={'removeDefault'}
                    autoCapitalize="off"
                    value={username || ''}
                    onChange={e => setUsername(e.target.value)}
                    size="lg"
                    fontSize="2xl"
                    borderRadius="25"
                    maxLength={12}
                    placeholder="Username"
                  />
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
