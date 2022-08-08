import { useColorMode } from "@chakra-ui/react";

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      {colorMode === "light" ? (
        // @ts-ignore
        <FontAwesomeIcon onClick={toggleColorMode} icon={faMoon} size="2x" cursor="pointer" />
      ) : (
        <FontAwesomeIcon
          onClick={toggleColorMode}
          // @ts-ignore
          icon={faSun}
          color="#D69E2E"
          size="2x"
          cursor="pointer"
        />
      )}
    </>
  );
};
