import { Box, HStack } from '@chakra-ui/react';
import { useFetchGroupData } from '../../../hooks/queries';
import { AvatarGroup } from '../../Avatar';
import { Name } from '../../Headers';
import { Skeleton } from '../../Skeleton';

interface Props {
  group_id: string;
  isGroupnameLoading?: boolean;
  isGroupPictureLoading?: boolean;
}

const GroupNameAndAvatarMiddle: React.FC<Props> = ({
  group_id,
  isGroupnameLoading,
  isGroupPictureLoading,
}) => {
  const { data, isLoading } = useFetchGroupData(group_id);

  return (
    <HStack display={{ base: 'flex', sm: 'none' }}>
      <Skeleton isLoading={isLoading || isGroupPictureLoading}>
        <Box mr={2}>
          <AvatarGroup src={data?.avatar_url} />
        </Box>
      </Skeleton>
      <Skeleton isLoading={isLoading || isGroupnameLoading}>
        <Name
          name={String(data?.group_name)}
          textProps={{
            fontSize: '4xl',
          }}
        />
      </Skeleton>
    </HStack>
  );
};

export default GroupNameAndAvatarMiddle;
