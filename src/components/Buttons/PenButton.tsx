import { IconButton } from "@chakra-ui/react";

import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useColors } from "hooks";

interface Props {
  onClick: any;
}

export const PenButton = ({ onClick }: Props) => {
  const { penColor } = useColors();
  return (
    <IconButton
      onClick={onClick}
      aria-label="Edit"
      bgColor="transparent"
      _hover={{ bgColor: "transparent" }}
      icon={<FontAwesomeIcon icon={faPen} size="lg" color={penColor} />}
    />
  );
};
