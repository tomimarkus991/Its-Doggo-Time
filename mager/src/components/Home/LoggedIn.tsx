import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import { useFetchUserData } from '../../hooks/api';
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
import { Skeleton } from '../Skeleton';

const LoggedIn: React.FC = () => {
  const { setUsername } = useUser();

  useSubscribeToGroupInserts();
  const { user } = useAuth();
  const { isLoading } = useFetchUserData();

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
        <Skeleton
          isLoading={isLoading}
          props={{
            borderRadius: 100,
            w: { sm: '95%', md: '90%', lg: 'initial' },
          }}
        >
          <HeaderAvatar>
            <ProfileNameAndAvatar />
          </HeaderAvatar>
        </Skeleton>
      }
      middle={
        <>
          <ProfileNameAndAvatarMiddle />

          <PageHeader>Groups</PageHeader>
          <GroupsContainer isLoading={isLoading} />
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
