import { Center } from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { PeeAndPoopIcon, PeeIcon, PoopIcon } from "components";

import { ExcrementLogsdataType } from "types";

import { CardDateText } from ".";

interface Props {
  log: ExcrementLogsdataType;
  group_id: string;
}

export const ExcrementLogCard = ({ log, group_id }: Props) => {
  const { id, pee, poop, created_at } = log;

  return (
    <Link to={`/group/${group_id}/log/${id}`}>
      <Center id="LogCard" h="100%" flexDirection="column">
        {pee && poop === false && (
          <PeeIcon
            fontSize={{
              base: "6rem",
              sm2: "6.5rem",
              md: "7.5rem",
              lg: "7rem",
              xl: "7.5rem",
            }}
          />
        )}
        {poop && pee === false && (
          <PoopIcon
            fontSize={{
              base: "6rem",
              sm2: "6.5rem",
              md: "7.5rem",
              lg: "7rem",
              xl: "7.5rem",
            }}
          />
        )}
        {poop && pee && (
          <PeeAndPoopIcon
            fontSize={{
              base: "6rem",
              sm2: "6.5rem",
              md: "7.5rem",
              lg: "7rem",
              xl: "7.5rem",
            }}
          />
        )}
        <CardDateText created_at={created_at} />
      </Center>
    </Link>
  );
};
