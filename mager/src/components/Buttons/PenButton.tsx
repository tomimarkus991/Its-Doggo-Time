import { IconButton } from "@chakra-ui/react";

import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useColors from "../../hooks/useColors";

interface Props {
  onClick: any;
}

const PenButton: React.FC<Props> = ({ onClick }) => {
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
export default PenButton;
