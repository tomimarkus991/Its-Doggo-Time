import { Avatar as ChakraAvatar, Box, TextProps } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  AvatarIconType,
  AvatarSizeType,
  StringOrUndefined,
} from '../../types';
import { supabase } from '../../utils/supabaseClient';

interface Props {
  src: StringOrUndefined;
  size: AvatarSizeType;
  icon: AvatarIconType;
  textProps?: TextProps;
}
export const Avatar: React.FC<Props> = ({
  src,
  size,
  icon,
  textProps,
}) => {
  const [avatarUrl, setAvatarUrl] = useState<StringOrUndefined>(null);

  useEffect(() => {
    if (src) downloadImage(src);
  }, [src]);
  const downloadImage = async (path: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path);

      if (error) throw error;

      const src = URL.createObjectURL(data);
      setAvatarUrl(src);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box {...textProps}>
      {avatarUrl ? (
        <ChakraAvatar icon={icon} size={size} src={avatarUrl} />
      ) : (
        <ChakraAvatar icon={icon} size={size} />
      )}
    </Box>
  );
};
