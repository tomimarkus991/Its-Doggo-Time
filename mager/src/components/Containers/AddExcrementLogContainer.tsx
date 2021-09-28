import {
  HStack,
  Box,
  useCheckboxGroup,
  VStack,
  IconButton,
} from '@chakra-ui/react';
import {
  MuiPickersUtilsProvider,
  TimePicker as MTimePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import 'moment/locale/et';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../../context';
import { ExcrementLogsdataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import { CheckboxCard } from '../Cards';
import { AddLogCheckboxIcon } from '../Icons';
import { MainContainerLayout } from '../Layouts';

interface RouteParams {
  group_id: string;
}

const AddExcrementLogContainer: React.FC = () => {
  const { group_id } = useParams<RouteParams>();
  const { user } = useAuth();
  const router = useHistory();

  const [logData, setLogData] = useState<any>([]);

  const businesses = ['pee', 'poop'];

  const { getCheckboxProps } = useCheckboxGroup({
    onChange: setLogData,
  });

  const [time, setTime] = useState<any>(new Date());

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

    const values: ExcrementLogsdataType = {
      pee,
      poop,
      creator_id: user?.id as string,
      group_id,
      created_at: time,
    };
    try {
      await supabase.from('excrement_logs').insert(values, {
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
      mainH="xs"
      isLoading={false}
      containerProps={{
        w: { base: 'xs', sm: 'sm' },
        h: 'xs',
      }}
      button={
        <Box
          as={IconButton}
          onClick={() => addLog()}
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
      <VStack>
        <HStack>
          {businesses.map((business, index: number) => {
            const checkbox = getCheckboxProps({ value: business });
            return (
              <CheckboxCard key={index} {...checkbox}>
                {business}
              </CheckboxCard>
            );
          })}
        </HStack>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <MTimePicker
            ampm={false}
            value={time}
            onChange={(newTime: any) => setTime(newTime)}
            color="primary"
          />
        </MuiPickersUtilsProvider>
      </VStack>
    </MainContainerLayout>
  );
};

export default AddExcrementLogContainer;