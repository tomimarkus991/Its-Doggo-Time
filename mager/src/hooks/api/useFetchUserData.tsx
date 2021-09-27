import { Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useAuth, useGroup, useUser } from '../../context';
import { ProfileAndGroupsType } from '../../types';
import { supabase } from '../../utils/supabaseClient';

export const useFetchUserData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { setUsername, setUserAvatarUrl } = useUser();
  const { setGroups } = useGroup();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        let { data } = await supabase
          .from('profiles')
          .select(
            `
              id,
              username,
              avatar_url,
              groups (id, group_name, avatar_url, creator_id)
          `,
          )
          .eq('id', user?.id)
          .single();

        const _userdata: ProfileAndGroupsType = data;

        if (_userdata === null) return <Box>No data</Box>;

        const { username, avatar_url, groups } = _userdata;

        setUsername(username);
        setUserAvatarUrl(avatar_url);
        setGroups(groups);

        return <Box>Error</Box>;
      } catch (err) {
        throw err;
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { isLoading };
};
