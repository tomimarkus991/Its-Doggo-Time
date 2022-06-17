import { VStack } from "@chakra-ui/react";

import { LeaveGroupButton } from "components/Buttons";
import { MembersContainer } from "components/Containers";
import { HeaderAvatar, MainLayout, PageHeaderBack } from "components/Layouts";
import { GroupNameAndAvatar, GroupNameAndAvatarMiddle } from "components/Layouts/Group";
import { ProfileAndMyGroups } from "components/Links";
import { useParams } from "react-router-dom";

interface RouteParams {
  group_id: string;
}

export const Members = () => {
  const { group_id } = useParams<RouteParams>();

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
