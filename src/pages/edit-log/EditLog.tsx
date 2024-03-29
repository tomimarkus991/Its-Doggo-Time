import { useParams } from "react-router-dom";

import { useLogsView, ViewType } from "context";

import {
  EditExcrementLogContainer,
  EditFoodLogContainer,
  HeaderAvatar,
  MainLayout,
  PageHeaderBack,
  GroupNameAndAvatar,
  GroupNameAndAvatarMiddle,
  ProfileAndMyGroups,
} from "components";

export const EditLog = () => {
  const { group_id } = useParams() as { group_id: string };
  const { view } = useLogsView();

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
          <PageHeaderBack>Edit Log</PageHeaderBack>

          {view === ViewType.Excrement ? <EditExcrementLogContainer /> : <EditFoodLogContainer />}
        </>
      }
      rightSide={<ProfileAndMyGroups />}
    />
  );
};
