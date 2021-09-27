import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LeaveGroupButton } from '../../components/Buttons';
import { MembersContainer } from '../../components/Containers';
import {
  HeaderAvatar,
  MainLayout,
  PageHeaderBack,
} from '../../components/Layouts';
import {
  GroupNameAndAvatar,
  GroupNameAndAvatarMiddle,
} from '../../components/Layouts/Group';
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

  const { setMembers, creator_id } = useGroup();

  useSubscribeToMemberInserts(group_id);

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
    subscribeToMemberDeletes();

    return () => {
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
            <GroupNameAndAvatar />
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
          <GroupNameAndAvatarMiddle />
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
