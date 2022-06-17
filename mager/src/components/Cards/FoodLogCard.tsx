import { Center } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { FoodLogsdataType } from "types";

import { FoodIcon } from "../Icons";

import { CardDateText } from ".";

interface Props {
  log: FoodLogsdataType;
  group_id: string;
}

export const FoodLogCard = ({ log, group_id }: Props) => {
  const { id, created_at } = log;

  return (
    <Link to={`/group/${group_id}/log/${id}`}>
      <Center id="FoodLogCard" h="100%" flexDirection="column">
        <FoodIcon
          fontSize={{
            base: "6rem",
            sm2: "6.5rem",
            md: "7.5rem",
            lg: "7rem",
            xl: "7.5rem",
          }}
        />
        <CardDateText created_at={created_at} />
      </Center>
    </Link>
  );
};
