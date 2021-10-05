import { HStack, useCheckboxGroup, VStack } from '@chakra-ui/react';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  TimePicker as MTimePicker,
} from '@material-ui/pickers';
import 'moment/locale/et';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../../context';
import { FoodLogsdataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import { EditOrAddLogContainerButton } from '../Buttons';
import { CheckboxCard } from '../Cards';
import { MainContainerLayout } from '../Layouts';

interface RouteParams {
  group_id: string;
}

const AddFoodLogContainer: React.FC = () => {
  const { group_id } = useParams<RouteParams>();
  const { user } = useAuth();
  const router = useHistory();

  const [logData, setLogData] = useState<any>(['food']);

  const businesses = ['food'];

  const { getCheckboxProps } = useCheckboxGroup({
    onChange: setLogData,
    value: logData,
  });

  const [time, setTime] = useState<any>(new Date());

  const addLog = async () => {
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
      await supabase.from('food_logs').insert(values, {
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
      isLoading={false}
      containerProps={{
        w: { base: 'xs', sm: 'sm' },
        h: 'xs',
      }}
      button={
        <EditOrAddLogContainerButton
          logData={logData}
          onClick={() => addLog()}
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

export default AddFoodLogContainer;
