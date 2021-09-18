import { Center, Grid, Heading, HStack, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddLogContainer } from '../../components/Containers';
import { DoggoIcon } from '../../components/Icons/Doggo';
import { BackIcon } from '../../components/Icons/LightMode';
import MainLayout from '../../components/Layouts';
import ProfileAndMyGroups from '../../components/Links/Layout/ProfileAndMyGroups';
import { GroupPageDataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';

interface RouteParams {
  group_id: string;
}

const AddLog: React.FC = () => {
  const { group_id } = useParams<RouteParams>();
  // const { user } = useAuth();

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
        <>
          <Center display={{ base: 'flex', lg: 'none' }} w="100%">
            <DoggoIcon
              display={{ sm: 'initial', lg: 'none' }}
              fontSize={{ sm: '10rem' }}
            />
          </Center>
        </>
      }
      middle={
        <VStack id="5" h="100%">
          <Grid
            h="100%"
            templateRows={{ base: '0.4fr 1fr', sm: '0.2fr 1fr' }}
          >
            <Center>
              <HStack position="relative">
                <BackIcon
                  position="absolute"
                  left={{ base: '-170%', md: '-270%', lg: '-370%' }}
                />
                <Heading fontSize={{ base: '3xl', sm: '4xl' }}>
                  ADD
                </Heading>
              </HStack>
            </Center>
            <AddLogContainer
              groupdata={groupdata}
              isLoading={isGroupdataLoading}
            />
          </Grid>
        </VStack>
      }
      rightSide={<ProfileAndMyGroups />}
    />
  );
};
export default AddLog;
