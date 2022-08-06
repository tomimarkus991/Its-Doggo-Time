import { useParams } from "react-router-dom";

import { useLogsView, ViewType } from "context";

import { useFetchExcrementLogs } from "hooks";

import {
  AddExcrementLogContainer,
  AddFoodLogContainer,
  GroupNameAndAvatar,
  GroupNameAndAvatarMiddle,
  HeaderAvatar,
  MainLayout,
  PageHeaderBack,
  ProfileAndMyGroups,
} from "components";

export const AddLog = () => {
  const { group_id } = useParams() as { group_id: string };
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
