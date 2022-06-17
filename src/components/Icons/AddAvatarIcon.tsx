import { Box } from "@chakra-ui/react";

import { faImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useColors } from "hooks";

export const AddAvatarIcon = () => {
  const { defaultColor } = useColors();
  return (
    <Box position="relative">
      <Box
        as={FontAwesomeIcon}
        fontSize={{ base: "2rem", sm: "2.5rem", md: "3rem" }}
        icon={faImage}
        bgColor={defaultColor}
        py="2"
        px="2"
        borderRadius="100"
        border="2px"
        borderColor="beez.700"
        position="absolute"
        cursor="pointer"
        right="0%"
        bottom="-5%"
      />
    </Box>
  );
};
