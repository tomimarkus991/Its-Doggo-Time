import { useColorMode } from "@chakra-ui/react";

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ColorMode: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      {colorMode === "light" ? (
        <FontAwesomeIcon onClick={toggleColorMode} icon={faMoon} size="2x" cursor="pointer" />
      ) : (
        <FontAwesomeIcon
          onClick={toggleColorMode}
          icon={faSun}
          color="#D69E2E"
          size="2x"
          cursor="pointer"
        />
      )}
    </>
  );
};
export default ColorMode;
