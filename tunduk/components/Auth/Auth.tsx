import { Box, Button, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

const Auth: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box w={300}>
      <Box>
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          size="lg"
          w="100%"
        />
      </Box>
      <Box>
        <Button
          onClick={e => {
            e.preventDefault();
            handleLogin(email);
          }}
          w="100%"
          mt={2}
          disabled={loading}
        >
          <Text>{loading ? 'Loading' : 'Send magic link'}</Text>
        </Button>
      </Box>
    </Box>
  );
};

export default Auth;
