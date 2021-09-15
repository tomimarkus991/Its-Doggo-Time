import {
  Box,
  HStack,
  IconButton,
  useCheckboxGroup,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext/AuthContext';
import { CreateLogsdataType, GroupPageDataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import { AvatarInvite } from '../Avatar';
import { CheckboxCard } from '../Cards';
import { Name } from '../Headers';
import { AddLogCheckboxIcon } from '../Icons/Logs';
import MainContainerLayout from '../Layouts/Containers';

interface Props {
  groupdata: GroupPageDataType | undefined;
  isLoading: boolean;
}

interface RouteParams {
  group_id: string;
}

export const AddLogContainer: React.FC<Props> = ({
  groupdata,
  isLoading,
}) => {
  const { group_id } = useParams<RouteParams>();
  const { user } = useAuth();
  const router = useHistory();

  const [logData, setLogData] = useState<any>([]);

  const businesses = ['pee', 'poop'];

  const { getCheckboxProps } = useCheckboxGroup({
    onChange: setLogData,
  });

  const addLog = async () => {
    let pee: boolean;
    let poop: boolean;
    if (logData?.includes('pee')) {
      pee = true;
    } else {
      pee = false;
    }
    if (logData?.includes('poop')) {
      poop = true;
    } else {
      poop = false;
    }

    const values: CreateLogsdataType = {
      pee,
      poop,
      creator_id: user?.id as string,
      group_id,
    };
    try {
      await supabase.from('logs').insert(values, {
        returning: 'minimal',
      });
    } catch (error) {
      alert(error);
    } finally {
      router.push(`/group/${group_id}`);
    }
  };

  return (
    <MainContainerLayout
      mainH={{ base: 'sm', lg: 'lg' }}
      isLoading={isLoading}
      containerProps={{
        w: { base: 'xs', sm: 'sm', md: 'lg', lg: '2xl' },
        h: { base: 'sm', lg: 'md' },
      }}
      button={
        <IconButton
          onClick={() => addLog()}
          mt={4}
          h="100%"
          aria-label="Add Log Button"
          bgColor="transparent"
          _hover={{ bgColor: 'transparent' }}
          isDisabled={logData?.length === 0}
          icon={
            <AddLogCheckboxIcon
              fontSize={{
                base: '5rem',
                md: '6rem',
                lg: '7rem',
              }}
            />
          }
        />
      }
    >
      <VStack flex={1} spacing={0}>
        <AvatarInvite src={groupdata?.avatar_url as string} />
        <Name title={groupdata?.group_name} textProps={{ fontSize: 30 }} />
        <Box>
          <VStack mt={4}>
            <HStack>
              {businesses.map(business => {
                const checkbox = getCheckboxProps({ value: business });
                return (
                  <CheckboxCard key={business} {...checkbox}>
                    {business}
                  </CheckboxCard>
                );
              })}
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </MainContainerLayout>
  );
};