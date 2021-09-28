import {
  Box,
  HStack,
  IconButton,
  useCheckboxGroup,
  VStack,
} from '@chakra-ui/react';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  TimePicker as MTimePicker,
} from '@material-ui/pickers';
import 'moment/locale/et';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../../context';
import { FoodLogsdataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import { CheckboxCard } from '../Cards';
import { AddLogCheckboxIcon } from '../Icons';
import { MainContainerLayout } from '../Layouts';
import { Skeleton } from '../Skeleton';

interface RouteParams {
  group_id: string;
  log_id: string;
}

const EditFoodLogContainer: React.FC = () => {
  const { group_id, log_id } = useParams<RouteParams>();
  const { user } = useAuth();
  const router = useHistory();

  const [logData, setLogData] = useState<any>([]);

  let businesses = ['food'];

  const { getCheckboxProps } = useCheckboxGroup({
    onChange: setLogData,
    value: logData,
  });

  const [time, setTime] = useState<Date | null>(new Date());
  const [isLogdataLoading, setIsLogdataLoading] = useState(true);

  const editLog = async () => {
    let food: boolean;
    if (logData?.includes('food')) {
      food = true;
    } else {
      food = false;
    }

    const values: FoodLogsdataType = {
      food,
      creator_id: user?.id as string,
      group_id,
      created_at: time,
    };
    try {
      await supabase
        .from('food_logs')
        .update(values, {
          returning: 'minimal',
        })
        .eq('id', log_id);
    } catch (error) {
      alert(error);
    } finally {
      router.push(`/group/${group_id}`);
    }
  };

  useEffect(() => {
    const fetchLogData = async () => {
      try {
        setIsLogdataLoading(true);
        let { data } = await supabase
          .from('food_logs')
          .select(
            `
            id,
            created_at,
            food
        `,
          )
          .eq('id', log_id)
          .single();

        let _logData: FoodLogsdataType = data;

        const { created_at, food } = _logData;

        setTime(created_at);

        if (food) {
          setLogData((oldData: any) => [...oldData, 'food']);
        }
      } catch (error) {
        throw error;
      } finally {
        setIsLogdataLoading(false);
      }
    };
    fetchLogData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          onClick={() => editLog()}
          mt={4}
          h="100%"
          aria-label="Add Edited Food Log Button"
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
      <Skeleton
        isLoading={isLogdataLoading}
        props={{
          borderRadius: 50,
        }}
      >
        <VStack>
          <HStack>
            {businesses.map((business, index: number) => {
              const checkbox = getCheckboxProps({
                value: business,
              });
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
      </Skeleton>
    </MainContainerLayout>
  );
};

export default EditFoodLogContainer;