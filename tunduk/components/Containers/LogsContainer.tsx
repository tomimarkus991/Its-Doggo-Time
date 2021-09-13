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
import useLogsPlaceholder from '../../hooks/placeholders/useLogsPlaceholder';
import { useSubscribeToLogInserts } from '../../hooks/subcribe';
import { LogsdataType } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import { AddNewIconButton } from '../Buttons';
import { LogCard } from '../Cards';
import { AddDutyIcon } from '../Icons/Doggo';
import { PeeAndPoopPlaceholderIcon } from '../Icons/Dutys';

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
  }, []);

  return (
    <VStack
      id="logs"
      layerStyle="shadow-and-bg"
      boxSizing="content-box"
      position="relative"
      justifyContent="center"
      alignItems="center"
      bgColor="white"
      h={{ base: 'sm', sm: 'sm', lg: 'md' }}
      w={{
        base: 'xs',
        sm: 'sm',
        sm2: 'lg',
        md: '2xl',
        lg: 'xl',
        xl: '2xl',
      }}
      py={{ base: '4', sm: '4', md: '8', lg: '4' }}
      px={{ base: '4', lg: '0' }}
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
                  Press the button in bottom right to add your dogs duty to
                  the log
                </Text>
              </VStack>
            </Center>
          ) : (
            <Center>
              <SimpleGrid
                columns={2}
                spacing={10}
                w={{
                  base: 'xs',
                  sm: 'sm',
                  sm2: 'lg',
                  md: '2xl',
                  lg: 'xl',
                  xl: '2xl',
                }}
                h="100%"
                px={{ sm: '8', md: '12', lg: '16' }}
                flexDirection="row-reverse"
              >
                {logsdata.map((log: LogsdataType, index: number) => (
                  <Box key={index}>
                    <LogCard log={log} />
                  </Box>
                ))}
                {placeholders?.map((_, index: number) => (
                  <Center key={index}>
                    <VStack>
                      <PeeAndPoopPlaceholderIcon
                        fontSize={{
                          base: '6rem',
                          sm: '7rem',
                          md: '9rem',
                          lg: '8rem',
                          xl: '9rem',
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
    </VStack>
  );
};
