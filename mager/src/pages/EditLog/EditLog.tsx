import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EditLogContainer } from '../../components/Containers';
import { MainLayout } from '../../components/Layouts';
import { PageHeaderBack } from '../../components/Layouts/Pages';
import {
  HeaderAvatar,
  NameAndAvatar,
  NameAndAvatarMiddle,
} from '../../components/Layouts/Profile';
import { ProfileAndMyGroups } from '../../components/Links';
import { Skeleton } from '../../components/Skeleton';
import { GroupPageDataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';

interface RouteParams {
  group_id: string;
}

const EditLog: React.FC = () => {
  const { group_id } = useParams<RouteParams>();

  const [groupdata, setGroupdata] = useState<GroupPageDataType>();
  const [isGroupdataLoading, setIsGroupdataLoading] = useState(true);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        setIsGroupdataLoading(true);
        let { data } = await supabase
          .from('groups')
          .select(
            `
            id,
            group_name,
            avatar_url
        `,
          )
          .eq('id', group_id)
          .single();

        let _groupData: GroupPageDataType = data;

        setGroupdata(_groupData);
      } catch (error) {
        throw error;
      } finally {
        setIsGroupdataLoading(false);
      }
    };

    fetchGroupData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout
      leftSide={
        <Skeleton
          isLoading={isGroupdataLoading}
          props={{
            borderRadius: 50,
            w: '100%',
          }}
        >
          <HeaderAvatar>
            <NameAndAvatar
              title={groupdata?.group_name}
              avatar_url={groupdata?.avatar_url}
              avatar="Group"
            />
          </HeaderAvatar>
        </Skeleton>
      }
      middle={
        <>
          <NameAndAvatarMiddle
            name={groupdata?.group_name}
            avatar_url={groupdata?.avatar_url}
            avatar="Group"
          />

          <PageHeaderBack>Edit Log</PageHeaderBack>

          <EditLogContainer />
        </>
      }
      rightSide={<ProfileAndMyGroups />}
    />
  );
};
export default EditLog;
