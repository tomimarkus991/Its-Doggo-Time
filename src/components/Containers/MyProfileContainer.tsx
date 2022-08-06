import { Center, VStack } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import { useSignOut } from "hooks";

import { GradientButtonText, ColorMode, GradientButton } from "components";

export const MyProfileContainer = () => {
  const { isSuccess, mutate, isLoading } = useSignOut();

  const navigate = useNavigate();

  if (isSuccess) {
    navigate("/");
  }

  return (
    <Center>
      <VStack
        layerStyle="shadow-and-bg"
        h="15rem"
        w="xs"
        borderRadius={20}
        justifyContent="center"
        spacing={10}
      >
        <ColorMode />

        <GradientButton onClick={() => mutate()} isLoading={isLoading} loadingText="Signing out">
          <GradientButtonText fontSize={20}>Sign Out</GradientButtonText>
        </GradientButton>
      </VStack>
    </Center>
  );
};
