import { Center, useCheckboxGroup, VStack } from '@chakra-ui/react';
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
import { EditOrAddLogContainerButton } from '../Buttons';
import { CheckboxCard } from '../Cards';
import { MainContainerLayout } from '../Layouts';

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

  const [time, setTime] = useState<Date | null | undefined>(new Date());
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
      isLoading={isLogdataLoading}
      containerProps={{
        w: { base: 'xs', sm: 'sm' },
        h: 'xs',
      }}
      button={
        <EditOrAddLogContainerButton
          logData={logData}
          onClick={() => editLog()}
        />
      }
    >
      <VStack>
        <Center>
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
        </Center>
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

export default EditFoodLogContainer;
