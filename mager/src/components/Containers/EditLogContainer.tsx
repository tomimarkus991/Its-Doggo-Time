import {
  HStack,
  IconButton,
  useCheckboxGroup,
  VStack,
  Box,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DateAdapter from '@mui/lab/AdapterMoment';
import { LocalizationProvider, TimePicker } from '@mui/lab';
import { TextField } from '@mui/material';
import 'moment/locale/et';
import moment from 'moment';
import { useAuth } from '../../context';
import { CreateLogsdataType, LogsdataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import { CheckboxCard } from '../Cards';
import { AddLogCheckboxIcon } from '../Icons';
import { MainContainerLayout } from '../Layouts';
import { Skeleton } from '../Skeleton';

interface RouteParams {
  group_id: string;
  log_id: string;
}

const EditLogContainer: React.FC = () => {
  const { group_id, log_id } = useParams<RouteParams>();
  const { user } = useAuth();
  const router = useHistory();

  const [logData, setLogData] = useState<any>([]);

  let businesses = ['pee', 'poop'];

  const { getCheckboxProps } = useCheckboxGroup({
    onChange: setLogData,
  });

  const [time, setTime] = useState<Date | null>(new Date());
  const [isLogdataLoading, setIsLogdataLoading] = useState(true);
  // const [pee, setPee] = useState<boolean>();
  // const [poop, setPoop] = useState<boolean>();

  const editLog = async () => {
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
      await supabase
        .from('logs')
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
          .from('logs')
          .select(
            `
            id,
            created_at,
            pee,
            poop
        `,
          )
          .eq('id', log_id)
          .single();

        let _logData: LogsdataType = data;

        const { created_at, pee, poop } = _logData;

        setTime(created_at);

        // setPee(pee);
        // setPoop(poop);
        // if (pee && poop) {
        //   setLogData(['pee', 'poop']);
        //   // let newArr = [...businesses];
        //   // newArr[0] = { value: 'pee', hasDuty: true };
        //   // setBusinesses(newArr);
        // }
        if (pee) {
          setLogData((oldData: any) => [...oldData, 'pee']);
          // setLogData(['pee']);
        }
        if (poop) {
          setLogData((oldData: any) => [...oldData, 'poop']);
          // setLogData(['poop']);
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
      mainH={{ base: 'sm' }}
      isLoading={false}
      containerProps={{
        w: { base: 'xs', sm: 'sm' },
        h: { base: 'sm' },
      }}
      button={
        <Box
          as={IconButton}
          onClick={() => editLog()}
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
      <Skeleton
        isLoading={isLogdataLoading}
        props={{
          borderRadius: 50,
        }}
      >
        <VStack>
          <HStack>
            {businesses.map((business, index: number) => {
              // console.log('business', business);

              const checkbox = getCheckboxProps({
                value: business,
              });
              // console.log('checkbox', checkbox);
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
            <TimePicker
              value={time}
              onChange={newTime => setTime(newTime)}
              renderInput={params => <TextField {...params} />}
            />
          </LocalizationProvider>
        </VStack>
      </Skeleton>
    </MainContainerLayout>
  );
};

export default EditLogContainer;
