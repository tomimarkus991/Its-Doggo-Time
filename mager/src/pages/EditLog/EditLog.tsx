import React from 'react';
import { useParams } from 'react-router-dom';
import {
  EditExcrementLogContainer,
  EditFoodLogContainer,
} from '../../components/Containers';
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
import { Skeleton } from '../../components/Skeleton';
import { useLogsView, ViewType } from '../../context';
import { useFetchGroupProfile } from '../../hooks/api';

interface RouteParams {
  group_id: string;
}

const EditLog: React.FC = () => {
  const { group_id } = useParams<RouteParams>();
  const { isLoading } = useFetchGroupProfile(group_id);
  const { view } = useLogsView();

  return (
    <MainLayout
      leftSide={
        <Skeleton
          isLoading={isLoading}
          props={{
            borderRadius: 50,
            w: '100%',
          }}
        >
          <HeaderAvatar>
            <GroupNameAndAvatar />
          </HeaderAvatar>
        </Skeleton>
      }
      middle={
        <>
          <GroupNameAndAvatarMiddle />
          <PageHeaderBack>Edit Log</PageHeaderBack>

          {view === ViewType.Excrement ? (
            <EditExcrementLogContainer />
          ) : (
            <EditFoodLogContainer />
          )}
        </>
      }
      rightSide={<ProfileAndMyGroups />}
    />
  );
};
export default EditLog;
