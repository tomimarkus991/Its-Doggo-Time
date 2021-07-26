import { Flex } from '@chakra-ui/react';
import {
  faFacebook,
  faGithub,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons';
import Auth, { OAuthButton } from '../../components/Auth';

const Login: React.FC = () => {
  return (
    <Flex
      flex={1}
      minH="90%"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Flex flexDirection="column" w={300}>
        <OAuthButton title="Google" provider="google" icon={faGoogle} />
        <OAuthButton
          title="Facebook"
          provider="facebook"
          icon={faFacebook}
        />
        <OAuthButton title="Github" provider="github" icon={faGithub} />
      </Flex>
      <Auth />
    </Flex>
  );
};
export default Login;
