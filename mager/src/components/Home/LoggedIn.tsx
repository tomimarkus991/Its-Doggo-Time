import { Center } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import { useSubscribeToGroupInserts } from '../../hooks/subcribe';
import { supabase } from '../../utils/supabaseClient';
import { GroupsContainer } from '../Containers';
import { Invites } from '../Invites';
import { HeaderAvatar, MainLayout, PageHeader } from '../Layouts';
import {
  ProfileNameAndAvatar,
  ProfileNameAndAvatarMiddle,
} from '../Layouts/Profile';
import { ProfileLink } from '../Links';

const LoggedIn: React.FC = () => {
  const { setUsername } = useUser();

  const { user } = useAuth();

  useEffect(() => {
    const updateOAuthData = async () => {
      // check if user has a profile
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

      // if such profile doesn't exist
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout
      leftSide={
        <HeaderAvatar>
          <ProfileNameAndAvatar />
        </HeaderAvatar>
      }
      middle={
        <>
          <ProfileNameAndAvatarMiddle />
          <Center my={{ md: 4, lg: 0 }}>
            <PageHeader>Groups</PageHeader>
          </Center>
          <GroupsContainer />
        </>
      }
      rightSide={
        <>
          <Invites />
          <ProfileLink />
        </>
      }
    />
  );
};
export default LoggedIn;
