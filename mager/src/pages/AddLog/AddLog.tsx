import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddLogContainer } from '../../components/Containers';
import { MainLayout } from '../../components/Layouts';
import { PageHeaderBack } from '../../components/Layouts/Pages';
import {
  HeaderAvatar,
  NameAndAvatar,
  NameAndAvatarMiddle,
} from '../../components/Layouts/Profile';
import { ProfileAndMyGroups } from '../../components/Links';
import { GroupPageDataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import { Skeleton } from '../../components/Skeleton';
interface RouteParams {
  group_id: string;
}

const AddLog: React.FC = () => {
  const { group_id } = useParams<RouteParams>();

  const [groupdata, setGroupdata] = useState<GroupPageDataType>();
  const [isGroupdataLoading, setIsGroupdataLoading] = useState(true);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        setIsGroupdataLoading(true);
        let { data, error } = await supabase
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

        if (error) throw error.message;
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

          <PageHeaderBack>Add Log</PageHeaderBack>

          <AddLogContainer />
        </>
      }
      rightSide={<ProfileAndMyGroups />}
    />
  );
};
export default AddLog;
