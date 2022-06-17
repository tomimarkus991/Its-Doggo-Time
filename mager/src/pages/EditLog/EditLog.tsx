import { EditExcrementLogContainer, EditFoodLogContainer } from "components/Containers";
import { HeaderAvatar, MainLayout, PageHeaderBack } from "components/Layouts";
import { GroupNameAndAvatar, GroupNameAndAvatarMiddle } from "components/Layouts/Group";
import { ProfileAndMyGroups } from "components/Links";
import { useLogsView, ViewType } from "context";
import { useParams } from "react-router-dom";

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
