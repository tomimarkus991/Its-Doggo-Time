import { Center, Text } from '@chakra-ui/react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { LogsdataType } from '../../types';
import { PeeAndPoopIcon, PeeIcon, PoopIcon } from '../Icons/Logs';

interface Props {
  log: LogsdataType;
  group_id: string;
}

export const LogCard: React.FC<Props> = ({ log, group_id }) => {
  const { id, pee, poop, created_at } = log;

  return (
    <Link to={`/group/${group_id}/log/${id}`}>
      <Center id="LogCard" h="100%" flexDirection="column">
        {pee && poop === false && (
          <PeeIcon
            fontSize={{
              base: '6rem',
              sm2: '6.5rem',
              md: '7.5rem',
              lg: '7rem',
              xl: '7.5rem',
            }}
          />
        )}
        {poop && pee === false && (
          <PoopIcon
            fontSize={{
              base: '6rem',
              sm2: '6.5rem',
              md: '7.5rem',
              lg: '7rem',
              xl: '7.5rem',
            }}
          />
        )}
        {poop && pee && (
          <PeeAndPoopIcon
            fontSize={{
              base: '6rem',
              sm2: '6.5rem',
              md: '7.5rem',
              lg: '7rem',
              xl: '7.5rem',
            }}
          />
        )}
        <Text
          textAlign="center"
          fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
          minH="3rem"
        >
          {moment(created_at).local().calendar(null, {
            lastDay: '[Yesterday at] HH:mm',
            sameDay: '[Today at] HH:mm',
            lastWeek: 'DD.MM [at] HH:mm',
            sameElse: 'DD.MM [at] HH:mm',
          })}
        </Text>
      </Center>
    </Link>
  );
};
