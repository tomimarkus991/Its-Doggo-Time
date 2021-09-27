import { Box, Flex, FormLabel } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AvatarProfile } from '.';
import { AvatarGroup } from '.';
import { StringOrUndefined } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import { AddAvatarIcon } from '../Icons';

interface Props {
  onUpload: (url: string) => void;
  avatar_url: StringOrUndefined;
  avatar: 'User' | 'Group';
}

const AvatarUpload: React.FC<Props> = ({
  onUpload,
  avatar_url,
  avatar,
}) => {
  const [uploading, setUploading] = useState(false);

  const uploadAvatar = async (event: any) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      // gets the selected file
      const file = event.target.files[0];

      // png
      const fileType = file.name.split('.').pop();

      // creates a random filepath 0.460785795297582.png
      const filePath = `${Math.random()}.${fileType}`;

      // uploads the file to supabase storage
      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // executes onUpload which should:

      // NR 1. update client avatar url
      // NR 2. update database avatar url
      onUpload(filePath);
    } catch (error) {
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return (
    <Flex id="editable avatar box" cursor="pointer">
      <Box
        as={FormLabel}
        id="avatarUpload"
        htmlFor="uploadInput"
        cursor="pointer"
        borderRadius="100"
        m={0}
        isLoading={uploading}
        loadingText="Uploading"
        _hover={{ opacity: 0.6 }}
        // bgColor="#000"
      >
        {avatar === 'User' ? (
          <AvatarProfile src={avatar_url} />
        ) : (
          <AvatarGroup src={avatar_url} />
        )}
        <AddAvatarIcon />
      </Box>
      <input
        style={{
          visibility: 'hidden',
          position: 'absolute',
          width: '0px',
        }}
        type="file"
        id="uploadInput"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
      />
    </Flex>
  );
};
export default AvatarUpload;
