import { Box, Flex, HStack, VStack } from '@chakra-ui/react';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { InviteGroupsType, ProfileType } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import { AvatarProfile } from '../Avatar';
import { GradientButton } from '../Buttons';
import { GroupsContainer } from '../Containers';
import { Heading, Name } from '../Headers';
import Invites from '../Invites';
import { TopMainBar } from '../Layouts';
import MainLayout from '../Layouts/MainLayout';
import { ProfileLink } from '../Links';

const LoggedIn: React.FC = () => {
  const [userInvites, setUserInvites] = useState<InviteGroupsType[]>();
  const [userData, setUserData] = useState<ProfileType>();

  const [user] = useState<User | null>(supabase.auth.user());

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
    fetchUserGroups();
  }, []);
  useEffect(() => {
    fetchInvites();
  }, [userData]);

  return (
    <MainLayout
      leftSide={
        <>
          <AvatarProfile src={userData?.avatar_url} />
          <Name title={userData?.username} />
        </>
      }
      middle={
        <Box mt="8">
          <Box mb="8">
            <Heading title="Groups" />
          </Box>
          <GroupsContainer userGroups={userData?.groups} />
        </Box>
      }
      rightSide={
        <>
          <Invites userInvites={userInvites} />
          <ProfileLink />
        </>
      }
    />
  );
};
export default LoggedIn;
