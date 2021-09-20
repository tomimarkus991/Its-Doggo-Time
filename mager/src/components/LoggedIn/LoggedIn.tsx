import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext/AuthContext';
import { useSubscribeToGroupInserts } from '../../hooks/subcribe';
import {
  GroupType,
  InviteDataType,
  ProfileAndGroupsType,
  StringOrUndefined,
} from '../../types';
import { supabase } from '../../utils/supabaseClient';
import { GroupsContainer } from '../Containers';
import Invites from '../Invites';
import MainLayout from '../Layouts/MainLayout';
import PageHeader from '../Layouts/Pages/PageHeader';
import {
  HeaderAvatar,
  NameAndAvatar,
  NameAndAvatarMiddle,
} from '../Layouts/Profile';
import { ProfileLink } from '../Links';
import Skeleton from '../Skeleton';

const LoggedIn: React.FC = () => {
  const [userInvites, setUserInvites] = useState<InviteDataType[]>([]);
  const [username, setUsername] = useState<StringOrUndefined>();
  const [avatar_url, setAvatarUrl] = useState<StringOrUndefined>();
  const [groups, setGroups] = useState<GroupType[]>([]);
  const { user } = useAuth();
  const [isUserdataLoading, setIsUserdataLoading] =
    useState<boolean>(true);

  const { subscribeToGroupInserts } = useSubscribeToGroupInserts({
    userId: user?.id,
    setGroups,
  });

  useEffect(() => {
    subscribeToGroupInserts();

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

        const _userdata: ProfileAndGroupsType = data;

        if (_userdata === null) return <Box>No data</Box>;

        const { username, avatar_url, groups } = _userdata;

        setUsername(username);
        setAvatarUrl(avatar_url);
        setGroups(groups);

        return <Box>Error</Box>;
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
    updateOAuthData();
    fetchUserdata();
    return () => {
      supabase.removeSubscription(subscribeToGroupInserts());
    };
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
          <HeaderAvatar>
            <NameAndAvatar
              title={username}
              avatar_url={avatar_url}
              avatar="User"
            />
          </HeaderAvatar>
        </Skeleton>
      }
      middle={
        <>
          <NameAndAvatarMiddle
            name={username}
            avatar_url={avatar_url}
            avatar="User"
          />

          <PageHeader>Groups</PageHeader>

          <GroupsContainer
            userGroups={groups}
            isLoading={isUserdataLoading}
            username={username}
          />
        </>
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
