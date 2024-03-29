import { Box } from "@chakra-ui/react";

import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { useColors } from "hooks";

interface Props {
  group_id: string;
}

export const LogSummaryButton = ({ group_id }: Props) => {
  const { containerItemColor } = useColors();
  return (
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
          {/* @ts-ignore */}
          <FontAwesomeIcon icon={faEllipsisV} size="2x" color={containerItemColor} />
        </Box>
      </Link>
    </Box>
  );
};
