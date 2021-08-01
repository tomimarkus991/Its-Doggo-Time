import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext/AuthContext';
import {
  GroupType,
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
  const [avatar_url, setAvatarUrl] = useState<StringOrUndefined>();
  const [groups, setGroups] = useState<GroupType[]>();
  const { user } = useAuth();
  const [isUserdataLoading, setIsUserdataLoading] =
    useState<boolean>(true);

  useEffect(() => {
    const listenForMemberInserts = () => {
      // when a you are inserted to members
      // (by accepting invite or directly from database)
      supabase
        .from(`members:profile_id=eq.${user?.id}`)
        .on('INSERT', async payload => {
          // you get the group_id from payload
          // and get group_name and avatar_url
          let { data: group } = await supabase
            .from('groups')
            .select(
              `
            id,
            group_name,
            avatar_url
        `,
            )
            .eq('id', payload.new.group_id)
            .single();
          const { id, group_name, avatar_url } = group as GroupType;

          const newGroup: GroupType = {
            id,
            group_name,
            avatar_url,
          };
          // update frontend with new data
          setGroups((oldData: any) => [...oldData, newGroup]);
        })
        .subscribe();
    };

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

        const _userdata: ProfileType = data;

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

    listenForMemberInserts();
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
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <AvatarProfile src={avatar_url as string} />
            <Name title={username} />
          </Flex>
        </Skeleton>
      }
      middle={
        <Box mt="8">
          <Box mb="8">
            <Heading title="Groups" />
          </Box>
          <GroupsContainer
            userGroups={groups}
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
