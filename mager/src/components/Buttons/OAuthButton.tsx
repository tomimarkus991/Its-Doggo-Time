import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Provider } from '@supabase/gotrue-js';
import { useAuth } from '../../context';

interface Props {
  icon: IconDefinition;
  provider: Provider;
}

const OAuthButton: React.FC<Props> = ({ provider, icon }) => {
  const { signIn } = useAuth();
  const handleOAuthLogin = async () => {
    try {
      await signIn({
        provider,
      });
    } catch (error) {
      throw error;
    }
  };
  return (
    <FontAwesomeIcon
      cursor="pointer"
      icon={icon}
      onClick={handleOAuthLogin}
      size="3x"
      color="#DDCDBF"
    />
  );
};

export default OAuthButton;
