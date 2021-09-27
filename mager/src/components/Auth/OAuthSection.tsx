import { HStack } from '@chakra-ui/react';
import {
  faGoogle,
  faFacebook,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { OAuthButton } from '../Buttons';

const OAuthSection: React.FC = () => {
  return (
    <HStack spacing="4">
      <OAuthButton provider="google" icon={faGoogle} />
      <OAuthButton provider="facebook" icon={faFacebook} />
      <OAuthButton provider="github" icon={faGithub} />
    </HStack>
  );
};
export default OAuthSection;
