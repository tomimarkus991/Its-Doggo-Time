import {
  Center,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useLogsPlaceholder from '../../hooks/placeholders/useLogsPlaceholder';
import { useSubscribeToLogInserts } from '../../hooks/subcribe';
import { LogsdataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import { AddNewLogIconButton } from '../Buttons';
import { LogCard } from '../Cards';
import { AddLogIcon } from '../Icons/Doggo';
import { DefaultPeeAndPoopIcon } from '../Icons/Logs';

import MainContainerLayout from '../Layouts/Containers';

interface Props {}
interface RouteParams {
  group_id: string;
}

export const LogsContainer: React.FC<Props> = ({}) => {
  const [logsdata, setLogsdata] = useState<LogsdataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { group_id } = useParams<RouteParams>();
  const { placeholders } = useLogsPlaceholder(logsdata);
  const { subscribeToLogInserts } = useSubscribeToLogInserts({
    group_id,
    setLogsdata,
  });

  useEffect(() => {
    const getLogsdata = async () => {
      try {
        setIsLoading(true);
        // gets the 4 most recent logs
        const { data } = await supabase
          .from('logs')
          .select(
            `
        id,
        pee,
        poop,
        created_at
        `,
          )
          .eq('group_id', group_id)
          .order('created_at', { ascending: false })
          .limit(4);
        let _data = data as LogsdataType[];

        const sortedData = _data.sort(
          (a, b) =>
            new Date(a.created_at).valueOf() -
            new Date(b.created_at).valueOf(),
        );

        setLogsdata(sortedData);
        return;
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    subscribeToLogInserts();

    getLogsdata();
    return () => {
      supabase.removeSubscription(subscribeToLogInserts());
    };
  }, []);

  return (
    <MainContainerLayout
      mainH={{ base: 'xs', sm: 'sm', md: 'sm' }}
      isLoading={isLoading}
      button={
        <AddNewLogIconButton
          to={`/group/${group_id}/add-log`}
          icon={
            <AddLogIcon
              fontSize={{
                base: '5rem',
                md: '6rem',
                lg: '7rem',
              }}
            />
          }
          ariaLabel="Add new Log"
          isDisabled={false}
        />
      }
      containerProps={{
        w: {
          base: 'xs',
          sm: 'sm',
          sm2: 'lg',
          md: '2xl',
          lg: 'xl',
          xl: '2xl',
        },
        h: { base: '22rem', sm: 'sm', md: 'md' },
      }}
    >
      {isLoading ? null : (
        <>
          {logsdata === null ||
          logsdata === undefined ||
          logsdata.length === 0 ? (
            <Center h="100%">
              <VStack textAlign="center">
                <Heading fontSize={{ base: '2xl', lg: '4xl' }}>
                  Log is Empty
                </Heading>
                <Text fontSize={{ base: 'xl', lg: '2xl' }} maxW="lg">
                  Press the button in bottom right to add a new log
                </Text>
              </VStack>
            </Center>
          ) : (
            <Center h="100%">
              <SimpleGrid
                columns={2}
                spacing={{ base: 2, lg: 10 }}
                w={{
                  base: 'xs',
                  sm: 'sm',
                  sm2: 'lg',
                  md: '2xl',
                  lg: 'xl',
                  xl: '2xl',
                }}
                h={{ base: '22rem', sm: 'sm', md: 'md' }}
                px={{ base: 4, md: 12, lg: 16 }}
                py={{ base: 4, md: 6, lg: 8 }}
              >
                {logsdata.map((log: LogsdataType, index: number) => (
                  <LogCard log={log} key={index} group_id={group_id} />
                ))}
                {placeholders?.map((_, index: number) => (
                  <Center key={index}>
                    <VStack>
                      <DefaultPeeAndPoopIcon
                        fontSize={{
                          base: '6rem',
                          sm2: '6.5rem',
                          md: '7.5rem',
                          lg: '7rem',
                          xl: '7.5rem',
                        }}
                      />
                      <Text
                        textAlign="center"
                        fontSize={{ base: 'xl', sm: 'xl', md: '2xl' }}
                      >
                        &nbsp;
                      </Text>
                    </VStack>
                  </Center>
                ))}
              </SimpleGrid>
            </Center>
          )}
        </>
      )}
    </MainContainerLayout>
  );
};
