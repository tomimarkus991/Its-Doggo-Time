import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LeaveGroupButton } from '../../components/Buttons';
import { MembersContainer } from '../../components/Containers';
import { MainLayout } from '../../components/Layouts';
import { PageHeaderBack } from '../../components/Layouts/Pages';
import {
  HeaderAvatar,
  NameAndAvatar,
  NameAndAvatarMiddle,
} from '../../components/Layouts/Profile';
import { ProfileAndMyGroups } from '../../components/Links';
import { AddNewMemberModal } from '../../components/Modals';
import { Skeleton } from '../../components/Skeleton';
import { useAuth } from '../../context';
import { useGroup } from '../../context/GroupContext';
import { useFetchGroupData } from '../../hooks/api';
import {
  useSubscribeToMemberDeletes,
  useSubscribeToMemberInserts,
} from '../../hooks/subcribe';
import { GroupPageDataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';

interface RouteParams {
  group_id: string;
}
const Members: React.FC = () => {
  const { group_id } = useParams<RouteParams>();
  const { user } = useAuth();

  const { groupname, group_avatar_url, setMembers, creator_id } =
    useGroup();

  const { subscribetoMemberInserts } = useSubscribeToMemberInserts({
    group_id,
  });

  const { isLoading } = useFetchGroupData(group_id);

  const fetchUpdatedMembers = async () => {
    try {
      let { data, error } = await supabase
        .from('groups')
        .select(
          `
          id,
          profiles (id, username, avatar_url)
        `,
        )
        .eq('id', group_id)
        .single();
      let _groupData: GroupPageDataType = data;
      const { profiles } = _groupData;

      setMembers(profiles);

      if (error) throw error.message;
    } catch (error) {
      throw error;
    }
  };
  const { subscribeToMemberDeletes } = useSubscribeToMemberDeletes({
    group_id,
    fetchUpdatedMembers,
  });

  useEffect(() => {
    subscribetoMemberInserts();
    subscribeToMemberDeletes();

    return () => {
      supabase.removeSubscription(subscribetoMemberInserts());
      supabase.removeSubscription(subscribeToMemberDeletes());
    };
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
            h: '80%',
          }}
        >
          <HeaderAvatar>
            <NameAndAvatar
              title={groupname}
              avatar_url={group_avatar_url}
              avatar="Group"
            />
          </HeaderAvatar>
          <LeaveGroupButton
            user_id={user?.id}
            group_id={group_id}
            creator_id={creator_id}
          />
        </Skeleton>
      }
      middle={
        <>
          <NameAndAvatarMiddle
            name={groupname}
            avatar_url={group_avatar_url}
            avatar="Group"
          />

          <PageHeaderBack>Members</PageHeaderBack>

          <MembersContainer
            group_id={group_id}
            isLoading={isLoading}
            AddNewMember={<AddNewMemberModal group_id={group_id} />}
          />
        </>
      }
      rightSide={<ProfileAndMyGroups />}
    />
  );
};
export default Members;
