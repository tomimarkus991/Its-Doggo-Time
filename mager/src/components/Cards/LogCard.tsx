import { Text } from '@chakra-ui/react';
import moment from 'moment';
import { LogsdataType } from '../../types';
import { PeeAndPoopIcon, PeeIcon, PoopIcon } from '../Icons/Logs';

interface Props {
  log: LogsdataType;
}

export const LogCard: React.FC<Props> = ({ log }) => {
  const { pee, poop, created_at } = log;

  return (
    <>
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
      >
        {moment(created_at).local().calendar(null, {
          lastDay: '[Yesterday at] HH:mm',
          sameDay: '[Today at] HH:mm',
          nextDay: '[Tomorrow at] HH:mm',
          lastWeek: '[last] dddd [at] HH:mm',
          nextWeek: 'dddd [at] HH:mm',
          sameElse: 'DD.MM.YY [at] HH:mm',
        })}
      </Text>
    </>
  );
};
