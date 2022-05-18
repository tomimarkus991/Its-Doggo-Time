import { Text } from "@chakra-ui/react";

import moment from "moment";

interface Props {
  created_at: Date | null | undefined;
}

const CardDateText: React.FC<Props> = ({ created_at }) => {
  return (
    <Text
      textAlign="center"
      fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
      minH="3rem"
      maxW={{ sm: "9rem", md: "10rem" }}
    >
      {moment(created_at).local().calendar(null, {
        lastDay: "[Yesterday at] HH:mm",
        sameDay: "[Today at] HH:mm",
        lastWeek: "DD.MM [at] HH:mm",
        sameElse: "DD.MM [at] HH:mm",
      })}
    </Text>
  );
};
export default CardDateText;
