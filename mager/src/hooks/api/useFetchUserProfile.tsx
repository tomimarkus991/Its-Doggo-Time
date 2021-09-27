import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAuth, useUser } from '../../context';
import { ProfileAndGroupsType } from '../../types';
import { supabase } from '../../utils/supabaseClient';

export const useFetchUserProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { setUsername, setUserAvatarUrl, setOldUsername } = useUser();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        let { data } = await supabase
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

        const _userdata: ProfileAndGroupsType = data;

        if (_userdata === null) return <Box>No data</Box>;

        const { username, avatar_url } = _userdata;

        setOldUsername(username);
        setUsername(username);
        setUserAvatarUrl(avatar_url);

        return <Box>Error</Box>;
      } catch (err) {
        throw err;
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { isLoading };
};
