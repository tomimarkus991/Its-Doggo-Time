import {
  Center,
  Flex,
  Grid,
  Heading,
  HStack,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AddDutyContainer } from '../../components/Containers';
import { DoggoIcon } from '../../components/Icons/Doggo';
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
        <>
          <VStack display={{ base: 'flex', lg: 'none' }} w="100%">
            <DoggoIcon
              display={{ sm: 'initial', lg: 'none' }}
              fontSize={{ sm: '10rem' }}
            />
          </VStack>
          <Flex
            display={{ base: 'none', lg: 'flex' }}
            justifyContent={{ base: 'center', xl: 'flex-end' }}
            alignItems={{ base: 'center', lg: 'flex-end' }}
            ml={{ base: '12', lg: 'none' }}
            mt="12"
          >
            <BackIcon
              fontSize={{ base: '2rem', md: '2.7rem' }}
              mr={{ base: '4', lg: '0' }}
              cursor="pointer"
              onClick={() => router.goBack()}
            />
          </Flex>
        </>
      }
      middle={
        <VStack
          id="5"
          justifyContent="center"
          alignItems="center"
          h={{ base: '100%' }}
        >
          <Grid
            h={{ base: '100%' }}
            templateRows={{ base: '0.4fr 1fr', sm: '0.2fr 1fr' }}
          >
            <Center>
              <Skeleton
                isLoading={isGroupdataLoading}
                props={{ borderRadius: 50 }}
              >
                <HStack position="relative">
                  <BackIcon
                    display={{ base: 'block', lg: 'none' }}
                    position="absolute"
                    left={{ base: '-7', sm: '-7', md: '-10' }}
                    fontSize={{ base: '2rem', md: '2.7rem' }}
                    cursor="pointer"
                    onClick={() => router.goBack()}
                  />
                  <Heading fontSize={{ base: '3xl', sm: '4xl' }}>
                    Add {groupdata?.group_name}&#39;s business
                  </Heading>
                </HStack>
              </Skeleton>
            </Center>
            <AddDutyContainer
              groupdata={groupdata}
              isLoading={isGroupdataLoading}
            />
          </Grid>
        </VStack>
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
