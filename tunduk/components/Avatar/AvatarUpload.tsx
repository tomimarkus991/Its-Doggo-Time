import { Button, FormLabel } from '@chakra-ui/react';
import React, { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
interface Props {
  onUpload: (url: string) => void;
  title: string;
}
export const AvatarUpload: React.FC<Props> = ({ onUpload, title }) => {
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
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };
  return (
    <>
      <Button
        as={FormLabel}
        htmlFor="uploadInput"
        cursor="pointer"
        m={0}
        isLoading={uploading}
        loadingText="Uploading"
        variant="ghost"
        fontSize="2xl"
        textTransform="uppercase"
      >
        {title}
      </Button>
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
    </>
  );
};
