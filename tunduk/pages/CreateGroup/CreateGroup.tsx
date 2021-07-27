import { Box, Center, Flex, FormLabel, Input } from '@chakra-ui/react';
import { User } from '@supabase/supabase-js';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, AvatarUpload } from '../../components/Account';
import { GradientButton } from '../../components/Buttons';
import { GroupProfileIcon } from '../../components/Icons/Profile/GroupProfileIcon';
import { StringOrUndefined } from '../../types';
import { supabase } from '../../utils/supabaseClient';

interface Props {}

const CreateGroup: React.FC<Props> = () => {
  const [group_name, setGroupname] = useState<StringOrUndefined>();
  const [avatar_url, setAvatarUrl] = useState<StringOrUndefined>();
  const [user] = useState<User | null>(supabase.auth.user());
  const history = useHistory();

  const createGroup = async () => {
    try {
      const updates = {
        group_name,
        avatar_url,
        creator_id: user?.id,
        updated_at: new Date(),
      };

      let { data, error } = await supabase.from('groups').insert(updates, {
        returning: 'representation',
      });
      if (!data) throw error;
      try {
        const memberUpdates = {
          profile_id: user?.id,
          group_id: data[0].id,
        };

        let { error } = await supabase
          .from('members')
          .insert(memberUpdates, {
            returning: 'minimal',
          });
        if (error) throw error;
      } catch (error) {
        alert(error.message);
      }

      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      history.push('/');
    }
  };

  return (
    <Center>
      <Flex flexDir="column">
        <Avatar
          src={avatar_url}
          size={'2xl'}
          icon={<GroupProfileIcon fontSize="8rem" />}
        />
        <AvatarUpload
          onUpload={(url: string) => {
            setAvatarUrl(url);
          }}
        />
        <Box mb="2">
          <FormLabel htmlFor="group_name">Group Name</FormLabel>
          <Input
            id="group_name"
            value={group_name || ''}
            onChange={e => setGroupname(e.target.value)}
          />
        </Box>
        <GradientButton onClick={createGroup}>Create</GradientButton>
      </Flex>
    </Center>
  );
};
export default CreateGroup;
