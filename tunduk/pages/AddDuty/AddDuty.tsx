import { Box, Flex } from '@chakra-ui/react';
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
      leftSide={
        <Flex justifyContent="flex-end" mt="8">
          <BackIcon
            w="10"
            h="10"
            cursor="pointer"
            onClick={() => router.goBack()}
          />
        </Flex>
      }
      middle={
        <Box id="box" mt="8">
          <Flex
            justifyContent="center"
            alignItems="center"
            w="100%"
            mb="4"
          >
            <Skeleton
              isLoading={isGroupdataLoading}
              props={{ borderRadius: 50 }}
            >
              <Heading
                title={`Add ${groupdata?.group_name}'s business`}
                fontSize={36}
              />
            </Skeleton>
          </Flex>

          <BusinessContainer
            groupdata={groupdata}
            isLoading={isGroupdataLoading}
          />
        </Box>
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
