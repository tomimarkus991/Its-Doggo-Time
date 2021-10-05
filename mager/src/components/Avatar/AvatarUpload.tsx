import { Box, Flex, FormLabel } from '@chakra-ui/react';
import React from 'react';
import {
  AvatarGroup,
  AvatarGroupLoading,
  AvatarProfile,
  AvatarProfileLoading,
} from '.';
import { useUploadAvatar } from '../../hooks/mutations';
import { StringOrUndefined } from '../../types';
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
  const { mutate, isLoading } = useUploadAvatar(onUpload);

  return (
    <Flex id="editable avatar box" cursor="pointer">
      {isLoading ? (
        <>
          {avatar === 'User' ? (
            <AvatarProfileLoading />
          ) : (
            <AvatarGroupLoading />
          )}
        </>
      ) : (
        <>
          <Box
            as={FormLabel}
            id="avatarUpload"
            htmlFor="uploadInput"
            cursor="pointer"
            borderRadius="100"
            m={0}
            _hover={{ opacity: 0.6 }}
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
            onChange={(e: any) => mutate(e)}
            disabled={isLoading}
          />
        </>
      )}
    </Flex>
  );
};
export default AvatarUpload;
