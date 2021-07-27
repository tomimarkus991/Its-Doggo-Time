import {
  Avatar as ChakraAvatar,
  Box,
  TextProps,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  AvatarIconType,
  AvatarSizeType,
  StringOrUndefined,
} from '../../types';
import { supabase } from '../../utils/supabaseClient';
import styles from '../../styles/AvatarGrad.module.css';

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
  const [avatarUrl, setAvatarUrl] = useState<StringOrUndefined>();
  const avatarBackgroundColor = useColorModeValue('white', 'gray.800');
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
        <ChakraAvatar
          icon={icon}
          size={size}
          src={avatarUrl}
          bgColor={avatarBackgroundColor}
        />
      ) : (
        <ChakraAvatar
          className={styles.avatarGrad}
          icon={icon}
          size={size}
          bgColor={avatarBackgroundColor}
          bgGradient="linear(to-l, #ddcdbf, #fbf0e5)"
        />
      )}
    </Box>
  );
};
