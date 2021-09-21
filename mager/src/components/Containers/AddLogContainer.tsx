import {
  HStack,
  IconButton,
  useCheckboxGroup,
  VStack,
} from '@chakra-ui/react';
// import { TextField } from '@material-ui/core';
// import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import {
  LocalizationProvider,
  MobileTimePicker,
  TimePicker,
} from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import { TextField } from '@mui/material';
import moment from 'moment';
import 'moment/locale/et';
import React, { useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
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

    const values: CreateLogsdataType = {
      pee,
      poop,
      creator_id: user?.id as string,
      group_id,
      created_at: time,
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
      mainH="xs"
      isLoading={false}
      containerProps={{
        w: { base: 'xs', sm: 'sm' },
        h: 'xs',
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
        <LocalizationProvider
          dateAdapter={DateAdapter}
          locale={moment.locale('et')}
        >
          <BrowserView>
            <TimePicker
              value={time}
              onChange={newTime => setTime(newTime)}
              renderInput={params => (
                <TextField
                  {...params}
                  color="primary"
                  variant="standard"
                />
              )}
            />
          </BrowserView>
          <MobileView>
            <MobileTimePicker
              value={time}
              onChange={newTime => setTime(newTime)}
              renderInput={params => <TextField {...params} />}
            />
          </MobileView>
        </LocalizationProvider>
        {/* <MuiPickersUtilsProvider utils={MomentUtils}>
          <TimePicker
            ampm={false}
            value={time}
            onChange={(newTime: any) => setTime(newTime)}
            color="primary"
          />
        </MuiPickersUtilsProvider> */}
      </VStack>
    </MainContainerLayout>
  );
};
