import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LogsdataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import { AddNewIconButton } from '../Buttons';
import { LogCard } from '../Cards';
import { AddDutyIcon } from '../Icons/Doggo';

interface Props {}
interface RouteParams {
  group_id: string;
}

export const LogsContainer: React.FC<Props> = ({}) => {
  const { group_id } = useParams<RouteParams>();
  const [logsdata, setLogsdata] = useState<LogsdataType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

    const subscribeToNewLogs = () => {
      supabase
        .from(`logs:group_id=eq.${group_id}`)
        .on('INSERT', payload => {
          const { created_at, creator_id, group_id, id, pee, poop } =
            payload.new as LogsdataType;

          const newLog: LogsdataType = {
            created_at,
            creator_id,
            group_id,
            id,
            pee,
            poop,
          };

          setLogsdata((oldData: any) => {
            const newData = oldData.slice(1);
            return [...newData, newLog];
          });
        })
        .subscribe();
    };
    subscribeToNewLogs();

    getLogsdata();
  }, []);
  return (
    <VStack>
      {/* <Skeleton isLoading={isLoading} props={{ borderRadius: 20 }}> */}
      <VStack
        style={{ boxShadow: '1px 1px 8px 2px #DDCDBF' }}
        bgColor="white"
        position="relative"
        h={{ base: 'sm', sm: 'sm', lg: 'md' }}
        w={{
          base: 'xs',
          sm: 'sm',
          md: 'lg',
          lg: 'xl',
          xl: '2xl',
        }}
        py={{ base: '4', sm: '4' }}
        px={{ base: '4' }}
        borderRadius={20}
      >
        {isLoading === true ? null : (
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
                    Press the button in bottom right to add your dogs duty
                    to the log
                  </Text>
                </VStack>
              </Center>
            ) : (
              <SimpleGrid
                columns={2}
                spacing={10}
                w="2xl"
                h="100%"
                px="16"
                flexDirection="row-reverse"
              >
                {logsdata.map((log: LogsdataType, index: number) => (
                  <Box key={index}>
                    <LogCard log={log} />
                  </Box>
                ))}
              </SimpleGrid>
            )}
            <Box
              position="absolute"
              right={{ base: '+50', lg: '-10' }}
              bottom={{ base: '-10', lg: '-10' }}
            >
              <AddNewIconButton
                to={`/group/${group_id}/add-duty`}
                icon={
                  <AddDutyIcon
                    fontSize={{
                      base: '5rem',
                      md: '6rem',
                      lg: '7rem',
                    }}
                  />
                }
                ariaLabel="Add new Duty"
                isDisabled={false}
              />
            </Box>
          </>
        )}
      </VStack>
      {/* </Skeleton> */}
    </VStack>
  );
};
