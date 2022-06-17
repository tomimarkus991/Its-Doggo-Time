import { useParams } from "react-router-dom";

import { useLogsView, ViewType } from "context";

import { EditExcrementLogContainer, EditFoodLogContainer } from "components";
import { HeaderAvatar, MainLayout, PageHeaderBack } from "components";
import { GroupNameAndAvatar, GroupNameAndAvatarMiddle } from "components";
import { ProfileAndMyGroups } from "components";

interface RouteParams {
  group_id: string;
}

export const EditLog = () => {
  const { group_id } = useParams<RouteParams>();
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
