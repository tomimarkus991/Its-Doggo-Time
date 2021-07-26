import {
  Box,
  FormLabel,
  Input,
  HStack,
  Button,
  Flex,
} from '@chakra-ui/react';
import { User } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { StringOrUndefined } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import { UserProfileIcon } from '../Icons/Profile/UserProfileIcon';
import { Avatar } from './Avatar';
import { AvatarUpload } from './AvatarUpload';

interface Props {}

const Account: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<StringOrUndefined>();
  const [avatar_url, setAvatarUrl] = useState<StringOrUndefined>();
  const [user] = useState<User | null>(supabase.auth.user());

  useEffect(() => {
    getProfile();
  }, []);

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
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center" flexDir="column">
      <Box>
        <Avatar
          src={avatar_url}
          size={'2xl'}
          icon={<UserProfileIcon fontSize="8.2rem" />}
        />
        <AvatarUpload
          onUpload={(url: string) => {
            setAvatarUrl(url);
            updateProfile({ username, avatar_url: url });
          }}
        />
      </Box>
      <Box>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input id="email" value={user?.email} disabled />
      </Box>
      <Box>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          id="username"
          value={username || ''}
          onChange={e => setUsername(e.target.value)}
        />
      </Box>

      <HStack mt={2}>
        <Button
          onClick={() => updateProfile({ username, avatar_url })}
          disabled={loading}
          colorScheme="purple"
          w="100%"
        >
          {loading ? 'Updating...' : 'Update'}
        </Button>
        <Button
          onClick={() => supabase.auth.signOut()}
          colorScheme="blue"
          w="100%"
        >
          Sign Out
        </Button>
      </HStack>
    </Flex>
  );
};

export default Account;
