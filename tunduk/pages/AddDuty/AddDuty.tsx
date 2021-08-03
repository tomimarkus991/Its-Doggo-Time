import { Box, HStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { BusinessContainer } from '../../components/Containers';
import { Heading } from '../../components/Headers';
import { BackIcon } from '../../components/Icons/LightMode';
import MainLayout from '../../components/Layouts';
import { MyGroupsLink, ProfileLink } from '../../components/Links';
import Skeleton from '../../components/Skeleton';
import { GroupPageDataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';

interface RouteParams {
  group_id: string;
}

const AddDuty: React.FC = () => {
  const { group_id } = useParams<RouteParams>();
  // const { user } = useAuth();
  const router = useHistory();

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
        alert(error.message);
      } finally {
        setIsGroupdataLoading(false);
      }
    };

    fetchGroupData();
  }, []);

  return (
    <MainLayout
      leftSide={null}
      middle={
        <Skeleton
          isLoading={isGroupdataLoading}
          props={{ borderRadius: 50 }}
        >
          <Box mt="8">
            <Box mb="8">
              <HStack w="60%" m="auto">
                <Box>
                  <BackIcon
                    w="10"
                    h="10"
                    cursor="pointer"
                    onClick={() => router.goBack()}
                  />
                </Box>
                <Box w="100%">
                  <Heading
                    title={`Add ${groupdata?.group_name}'s business`}
                    fontSize={36}
                  />
                </Box>
              </HStack>
            </Box>
            <BusinessContainer groupdata={groupdata} />
          </Box>
        </Skeleton>
      }
      rightSide={
        <>
          <MyGroupsLink />
          <ProfileLink />
        </>
      }
    />
  );
};
export default AddDuty;
