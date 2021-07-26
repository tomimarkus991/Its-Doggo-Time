import { Box, Button, HStack, Text } from '@chakra-ui/react';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Provider } from '@supabase/gotrue-js';
import { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
interface Props {
  title: string;
  icon: IconDefinition;
  provider: Provider;
}

export const OAuthButton: React.FC<Props> = ({
  provider,
  icon,
  title,
}) => {
  const [loading, setLoading] = useState(false);
  const handleOAuthLogin = async (provider: Provider) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({
        provider,
      });

      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      onClick={async () => handleOAuthLogin(provider)}
      isLoading={loading}
      mb={2}
    >
      <HStack>
        <Box>
          <FontAwesomeIcon icon={icon} />
        </Box>
        <Text>Sign in With {title}</Text>
      </HStack>
    </Button>
  );
};
