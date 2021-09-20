import { Box, Center, Grid, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AvatarGroup } from '../../components/Avatar';
import { AddLogContainer } from '../../components/Containers';
import { Name } from '../../components/Headers';
import { BackIcon } from '../../components/Icons/LightMode';
import MainLayout from '../../components/Layouts';
import {
  HeaderAvatar,
  NameAndAvatar,
} from '../../components/Layouts/Profile';
import ProfileAndMyGroups from '../../components/Links/Layout/ProfileAndMyGroups';
import Skeleton from '../../components/Skeleton';
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
        <Grid
          h={{ base: '100%', sm: '90%' }}
          templateRows={{ base: '0.4fr 0.1fr 1fr', sm: '0.2fr 1fr' }}
        >
          <Center
            flexDirection="row"
            display={{ base: 'flex', sm: 'none' }}
          >
            <Box mr={2}>
              <AvatarGroup src={groupdata?.avatar_url} />
            </Box>

            <Name
              title={groupdata?.group_name}
              textProps={{
                fontSize: '4xl',
              }}
            />
          </Center>
          <Center>
            <Grid
              flex={1}
              templateColumns="0.1fr 1fr"
              justifyContent="center"
              alignItems="center"
            >
              <BackIcon />
              <Heading fontSize="4xl" textAlign="center">
                Edit Log
              </Heading>
            </Grid>
          </Center>
          <AddLogContainer />
        </Grid>
      }
      rightSide={<ProfileAndMyGroups />}
    />
  );
};
export default EditLog;
