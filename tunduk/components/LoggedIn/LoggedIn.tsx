import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext/AuthContext';
import {
  InviteDataType,
  ProfileType,
  StringOrUndefined,
} from '../../types';
import { supabase } from '../../utils/supabaseClient';
import { AvatarProfile } from '../Avatar';
import { GroupsContainer } from '../Containers';
import { Heading, Name } from '../Headers';
import Invites from '../Invites';
import MainLayout from '../Layouts/MainLayout';
import { ProfileLink } from '../Links';
import Skeleton from '../Skeleton';

const LoggedIn: React.FC = () => {
  const [userInvites, setUserInvites] = useState<
    InviteDataType[] | undefined
  >();
  const [userdata, setUserdata] = useState<ProfileType>();
  const [username, setUsername] = useState<StringOrUndefined>();
  const { user } = useAuth();
  const [isUserdataLoading, setIsUserdataLoading] =
    useState<boolean>(true);

  const fetchUserdata = async () => {
    try {
      setIsUserdataLoading(true);
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
      if (data === null) return null;
      setUserdata(data);
      setUsername(data.username);
      return null;
    } finally {
      setIsUserdataLoading(false);
    }
  };

  const updateOAuthData = async () => {
    let { data, error } = await supabase
      .from('profiles')
      .select(
        `
      id,
      username
  `,
      )
      .eq('id', user?.id)
      .single();
    if (
      data == null &&
      error?.message.includes(
        'JSON object requested, multiple (or no) rows returned',
      )
    ) {
      const updates = {
        id: user?.id,
        username: user?.user_metadata.full_name,
        updated_at: new Date(),
      };
      const { data: updatedData } = await supabase
        .from('profiles')
        .upsert(updates, {
          returning: 'representation', // Don't return the value after inserting
        })
        .single();
      setUsername(updatedData.username);
    }
  };

  useEffect(() => {
    updateOAuthData();
    fetchUserdata();
  }, []);

  return (
    <MainLayout
      leftSide={
        <Skeleton
          isLoading={isUserdataLoading}
          props={{ borderRadius: 100 }}
        >
          <AvatarProfile src={userdata?.avatar_url as string} />
          <Name title={username} />
        </Skeleton>
      }
      middle={
        <Box mt="8">
          <Box mb="8">
            <Heading title="Groups" />
          </Box>
          <GroupsContainer
            userGroups={userdata?.groups}
            isLoading={isUserdataLoading}
            username={username}
          />
        </Box>
      }
      rightSide={
        <>
          <Invites
            userInvites={userInvites}
            setUserInvites={setUserInvites}
            currentUsername={username}
          />
          <ProfileLink />
        </>
      }
    />
  );
};
export default LoggedIn;
