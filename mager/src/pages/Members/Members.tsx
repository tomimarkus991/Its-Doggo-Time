import { VStack } from '@chakra-ui/react';
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
import {
  useSubscribeToMemberDeletes,
  useSubscribeToMemberInserts,
} from '../../hooks/subcribe';
import { supabase } from '../../utils/supabaseClient';

interface RouteParams {
  group_id: string;
}
const Members: React.FC = () => {
  const { group_id } = useParams<RouteParams>();

  useSubscribeToMemberInserts(group_id);

  const fetchUpdatedMembers = async () => {
    try {
      let { error } = await supabase
        .from('groups')
        .select(
          `
          id,
          profiles (id, username, avatar_url)
        `,
        )
        .eq('id', group_id)
        .single();
      // let _groupData: GroupPageDataType = data;
      // const { profiles } = _groupData;

      // setMembers(profiles);

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
        <VStack h="80%" w="100%">
          <HeaderAvatar>
            <GroupNameAndAvatar group_id={group_id} />
          </HeaderAvatar>
          <LeaveGroupButton group_id={group_id} />
        </VStack>
      }
      middle={
        <>
          <GroupNameAndAvatarMiddle group_id={group_id} />
          <PageHeaderBack>Members</PageHeaderBack>
          <MembersContainer group_id={group_id} />
        </>
      }
      rightSide={<ProfileAndMyGroups />}
    />
  );
};
export default Members;
