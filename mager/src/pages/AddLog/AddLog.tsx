import React from "react";
import { useParams } from "react-router-dom";

import { AddExcrementLogContainer, AddFoodLogContainer } from "components/Containers";
import { HeaderAvatar, MainLayout, PageHeaderBack } from "components/Layouts";
import { GroupNameAndAvatar, GroupNameAndAvatarMiddle } from "components/Layouts/Group";
import { ProfileAndMyGroups } from "components/Links";
import { useLogsView, ViewType } from "context";
import { useFetchExcrementLogs } from "hooks/queries";

interface RouteParams {
  group_id: string;
}

const AddLog: React.FC = () => {
  const { group_id } = useParams<RouteParams>();
  const { view } = useLogsView();
  useFetchExcrementLogs(group_id);

  return (
    <MainLayout
      leftSide={
        <HeaderAvatar>
          <GroupNameAndAvatar group_id={group_id} />
        </HeaderAvatar>
      }
      middle={
        <>
          <GroupNameAndAvatarMiddle group_id={group_id} />
          <PageHeaderBack>Add Log</PageHeaderBack>
          {view === ViewType.Excrement ? <AddExcrementLogContainer /> : <AddFoodLogContainer />}
        </>
      }
      rightSide={<ProfileAndMyGroups />}
    />
  );
};
export default AddLog;
