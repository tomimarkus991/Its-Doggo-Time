import { Center, HStack, Input, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AvatarGroup, AvatarUpload } from '../../components/Avatar';
import { GradientButton } from '../../components/Buttons';
import { GradientButtonText } from '../../components/Text';
import { useAuth } from '../../context/authContext/AuthContext';
import { StringOrUndefined } from '../../types';
import { supabase } from '../../utils/supabaseClient';

interface Props {}

const CreateGroup: React.FC<Props> = () => {
  const [group_name, setGroupname] = useState<StringOrUndefined>();
  const [avatar_url, setAvatarUrl] = useState<StringOrUndefined>();
  const { user } = useAuth();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const createGroup = async () => {
    try {
      const updates = {
        group_name,
        avatar_url,
        creator_id: user?.id,
        updated_at: new Date(),
      };

      let { data, error } = await supabase
        .from('groups')
        .insert(updates, {
          returning: 'representation',
        })
        .single();
      try {
        setIsLoading(true);
        const memberUpdates = {
          profile_id: user?.id,
          group_id: data.id,
        };

        let { error } = await supabase
          .from('members')
          .insert(memberUpdates, {
            returning: 'minimal',
          });
        if (error) throw error.message;
      } catch (error) {
        alert(error.message);
      }

      if (error) throw error.message;
    } catch (error) {
      alert(error.message);
    } finally {
      history.push('/');
      setIsLoading(false);
    }
  };

  return (
    <Center>
      <VStack minW="16rem">
        <AvatarGroup src={avatar_url as string} />
        <AvatarUpload
          onUpload={(url: string) => {
            setAvatarUrl(url);
          }}
          title="Add Photo"
        />
        <Input
          value={group_name}
          onChange={e => setGroupname(e.target.value)}
          isRequired
          size="lg"
          fontSize="2xl"
          maxW="2xs"
          borderRadius="25"
          borderColor="beez.700"
          _placeholder={{ color: 'gray.800' }}
          placeholder="Group name"
        />
        <HStack>
          <GradientButton>
            <GradientButtonText fontSize={25}>Back</GradientButtonText>
          </GradientButton>
          <GradientButton
            onClick={createGroup}
            isLoading={isLoading}
            loadingText="Creating"
          >
            <GradientButtonText fontSize={25}>Create</GradientButtonText>
          </GradientButton>
        </HStack>
      </VStack>
    </Center>
  );
};
export default CreateGroup;
