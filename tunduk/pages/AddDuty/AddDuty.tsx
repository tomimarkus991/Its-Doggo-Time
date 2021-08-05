import { Box, Flex, Heading, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AddDutyContainer } from '../../components/Containers';

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
        <Flex
          justifyContent={{ base: 'center', lg: 'flex-end' }}
          alignItems={{ base: 'center', lg: 'flex-end' }}
          ml={{ base: '8', lg: 'none' }}
          mt="12"
        >
          <BackIcon
            fontSize={{ base: '2rem', md: '2.7rem' }}
            mr={{ base: '4', lg: '0' }}
            cursor="pointer"
            onClick={() => router.goBack()}
          />
          <VStack
            display={{ base: 'flex', lg: 'none' }}
            mb={{ base: 0, lg: '8' }}
          >
            <Skeleton
              isLoading={isGroupdataLoading}
              props={{ borderRadius: 50 }}
            >
              <Heading size={'xl'}>
                Add {groupdata?.group_name}&#39;s business
              </Heading>
            </Skeleton>
          </VStack>
        </Flex>
      }
      middle={
        <Box mt="8">
          <VStack display={{ base: 'none', lg: 'flex' }} mb="8">
            <Skeleton
              isLoading={isGroupdataLoading}
              props={{ borderRadius: 50 }}
            >
              <Heading size={'xl'}>
                Add {groupdata?.group_name}&#39;s business
              </Heading>
            </Skeleton>
          </VStack>

          <AddDutyContainer
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
