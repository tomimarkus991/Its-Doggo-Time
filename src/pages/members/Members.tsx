import { VStack } from "@chakra-ui/react";

import { useParams } from "react-router-dom";

import {
  LeaveGroupButton,
  MembersContainer,
  HeaderAvatar,
  MainLayout,
  PageHeaderBack,
  GroupNameAndAvatar,
  GroupNameAndAvatarMiddle,
  ProfileAndMyGroups,
} from "components";

export const Members = () => {
  const { group_id } = useParams() as { group_id: string };

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
