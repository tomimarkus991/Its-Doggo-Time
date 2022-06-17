import { Center, VStack } from "@chakra-ui/react";

import { useHistory } from "react-router-dom";

import { useSignOut } from "hooks";

import GradientButton from "../Buttons/GradientButton";
import { ColorMode } from "../ColorMode";
import { GradientButtonText } from "../Text";

export const MyProfileContainer = () => {
  const { isSuccess, mutate, isLoading } = useSignOut();

  const router = useHistory();

  if (isSuccess) {
    router.push("/");
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
