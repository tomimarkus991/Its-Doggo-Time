import { Box, Center, HStack, Text, VStack } from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { GradientButton, DoggoIcon, GradientButtonText } from "components";

export const LoggedOut = () => {
  return (
    <Center h="100%">
      <HStack
        flexDirection={{ base: "column", lg: "row" }}
        spacing={{ base: 0, lg: "40", xl: "60" }}
      >
        <VStack textAlign="center">
          <Text fontSize={{ base: "3xl" }} maxW="md" display={{ base: "none", md: "block" }}>
            {/* Is your family member constantly asking about your dogs
          peeing/pooping times? */}
            Start monitoring your dogs excrement and food data
          </Text>
          <Center flexDirection={{ base: "column", md: "row" }}>
            <Box mr={{ base: 0, md: "4" }}>
              <Link to="/login">
                <GradientButton>
                  <GradientButtonText fontSize={25}>Log in</GradientButtonText>
                </GradientButton>
              </Link>
            </Box>
            <Box mt={{ base: "6", md: "0" }}>
              <Link to="/register">
                <GradientButton>
                  <GradientButtonText fontSize={25}>Sign Up</GradientButtonText>
                </GradientButton>
              </Link>
            </Box>
          </Center>
        </VStack>

        <DoggoIcon
          fontSize={{
            base: "20rem",
            sm: "24rem",
            md: "20rem",
            lg: "24rem",
            xl: "30rem",
          }}
        />
      </HStack>
    </Center>
  );
};
