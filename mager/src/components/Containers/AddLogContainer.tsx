import { HStack, IconButton, useCheckboxGroup } from '@chakra-ui/react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext/AuthContext';
import { CreateLogsdataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import { CheckboxCard } from '../Cards';
import { AddLogCheckboxIcon } from '../Icons/Logs';
import MainContainerLayout from '../Layouts/Containers';

interface RouteParams {
  group_id: string;
}

export const AddLogContainer: React.FC = () => {
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
      mainH={{ base: 'sm' }}
      isLoading={false}
      containerProps={{
        w: { base: 'xs', sm: 'sm' },
        h: { base: 'sm' },
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
    </MainContainerLayout>
  );
};
