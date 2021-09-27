import {
  Box,
  Center,
  Heading,
  IconButton,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLogs } from '../../context';
import { useColors } from '../../hooks';
import { useFetchExcrementLogs } from '../../hooks/api';
import { useLogsPlaceholder } from '../../hooks/placeholders';
import { useSubscribeToLogInserts } from '../../hooks/subcribe';
import { useCountRenders } from '../../hooks/useCountRenders';
import { LogsdataType } from '../../types';
import { LogCard } from '../Cards';
import { AddLogIcon, DefaultPeeAndPoopIcon } from '../Icons';
import { MainContainerLayout } from '../Layouts';

interface Props {}
interface RouteParams {
  group_id: string;
}

const LogsContainer: React.FC<Props> = () => {
  const { group_id } = useParams<RouteParams>();
  const { containerItemColor } = useColors();
  const { isLoading } = useFetchExcrementLogs(group_id);
  const { excrementLogs } = useLogs();
  const { placeholders } = useLogsPlaceholder(excrementLogs);

  useSubscribeToLogInserts({
    group_id,
  });

  useCountRenders();

  return (
    <MainContainerLayout
      mainH={{ base: 'xs', sm: 'sm', md: 'sm' }}
      isLoading={isLoading}
      button={
        <Link to={`/group/${group_id}/add-log`}>
          <Box
            as={IconButton}
            aria-label="Add new Log"
            h="100%"
            bgColor="transparent"
            _hover={{ bgColor: 'transparent' }}
            isDisabled={false}
            icon={
              <AddLogIcon
                fontSize={{
                  base: '5rem',
                  md: '6rem',
                  lg: '7rem',
                }}
              />
            }
          />
        </Link>
      }
      containerProps={{
        w: {
          base: 'xs',
          sm: 'sm',
          sm2: 'lg',
          md: 'xl',
          lg: 'xl',
          xl: 'xl',
        },
        h: { base: '22rem', sm: 'sm', md: 'md' },
      }}
    >
      {isLoading ? null : (
        <>
          {excrementLogs === null ||
          excrementLogs === undefined ||
          excrementLogs.length === 0 ? (
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
                {excrementLogs.map((log: LogsdataType, index: number) => (
                  <LogCard key={index} log={log} group_id={group_id} />
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
                <Box position="absolute" right="0" top="0">
                  <Link to={`/group/${group_id}/summary`}>
                    <Box
                      position="relative"
                      cursor="pointer"
                      float="right"
                      right={{ base: 2, sm: 4 }}
                      top={{ base: 2, sm: 4 }}
                      p={{ base: 2, sm: 3, md: 4 }}
                    >
                      <FontAwesomeIcon
                        icon={faEllipsisV}
                        size="2x"
                        color={containerItemColor}
                      />
                    </Box>
                  </Link>
                </Box>
              </SimpleGrid>
            </Center>
          )}
        </>
      )}
    </MainContainerLayout>
  );
};

export default LogsContainer;
