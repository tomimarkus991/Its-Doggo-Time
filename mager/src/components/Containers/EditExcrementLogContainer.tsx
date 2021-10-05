import { Center, Flex, useCheckboxGroup, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../../context';
import { ExcrementLogsdataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import { EditOrAddLogContainerButton } from '../Buttons';
import { CheckboxCard } from '../Cards';
import { MainContainerLayout } from '../Layouts';
import { DefaultTimePicker } from '../TimePicker';

interface RouteParams {
  group_id: string;
  log_id: string;
}

const EditExcrementLogContainer: React.FC = () => {
  const { group_id, log_id } = useParams<RouteParams>();
  const { user } = useAuth();
  const router = useHistory();

  const [logData, setLogData] = useState<any>([]);

  let businesses = ['pee', 'poop'];

  const { getCheckboxProps } = useCheckboxGroup({
    onChange: setLogData,
    value: logData,
  });

  const [time, setTime] = useState<Date>(new Date());
  const [isLogdataLoading, setIsLogdataLoading] = useState(true);

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

    const values: ExcrementLogsdataType = {
      pee,
      poop,
      creator_id: user?.id as string,
      group_id,
      created_at: time,
    };
    try {
      await supabase
        .from('excrement_logs')
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
          .from('excrement_logs')
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

        let _logData: ExcrementLogsdataType = data;

        const { created_at, pee, poop } = _logData;

        setTime(created_at as Date);

        if (pee) {
          setLogData((oldData: any) => [...oldData, 'pee']);
        }
        if (poop) {
          setLogData((oldData: any) => [...oldData, 'poop']);
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
        <Flex w="50%">
          <DefaultTimePicker
            time={time}
            onChange={(newTime: Date) => setTime(newTime)}
          />
        </Flex>
      </VStack>
    </MainContainerLayout>
  );
};

export default EditExcrementLogContainer;
