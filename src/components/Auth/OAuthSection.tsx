import { HStack } from "@chakra-ui/react";

import { faGoogle, faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";

import { OAuthButton } from "components";

export const OAuthSection = () => {
  return (
    <HStack spacing="4">
      <OAuthButton provider="google" icon={faGoogle} />
      <OAuthButton provider="facebook" icon={faFacebook} />
      <OAuthButton provider="github" icon={faGithub} />
    </HStack>
  );
};
