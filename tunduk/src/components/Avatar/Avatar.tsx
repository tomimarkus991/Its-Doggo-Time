import { Avatar as ChakraAvatar, Box, BoxProps } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useColors from '../../hooks/useColors';
import { AvatarIconType } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import Skeleton from '../Skeleton';

interface Props {
  src: string;
  w: any;
  h: any;
  icon: AvatarIconType;
  textProps?: BoxProps;
}

export const Avatar: React.FC<Props> = ({
  src,
  w,
  h,
  icon,
  textProps,
}) => {
  const { defaultColor } = useColors();
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const downloadImage = async (path: string) => {
    try {
      setIsLoading(true);
      const { data } = await supabase.storage
        .from('avatars')
        .download(path);

      const src = URL.createObjectURL(data);
      setAvatarUrl(src);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (src) {
      downloadImage(src);
    } else {
      setIsLoading(false);
    }
  }, [src]);

  return (
    <Skeleton isLoading={isLoading} props={{ borderRadius: 100 }}>
      <Box {...textProps}>
        {avatarUrl ? (
          <ChakraAvatar
            w={w}
            h={h}
            src={avatarUrl}
            icon={<Box></Box>}
            bgColor={defaultColor}
          />
        ) : (
          <ChakraAvatar
            icon={icon}
            w={w}
            h={h}
            bgGradient="linear(to-r, beez.100, beez.700)"
          />
        )}
      </Box>
    </Skeleton>
  );
};
