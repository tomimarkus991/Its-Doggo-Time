import { Box, HStack, VStack } from '@chakra-ui/react';
import { GroupPageDataType } from '../../types';
import { AvatarGroup } from '../Avatar';
import { Name } from '../Headers';
import MainContainerLayout from '../Layouts/Containers';

interface Props {
  groupdata: GroupPageDataType | undefined;
}

export const BusinessContainer: React.FC<Props> = ({ groupdata }) => {
  return (
    <MainContainerLayout
      isLoading={false}
      containerProps={{ w: '2xl', h: 'md' }}
    >
      <VStack spacing={0}>
        <AvatarGroup src={groupdata?.avatar_url as string} />
        <Name title={groupdata?.group_name} />
        <HStack>
          <Box></Box>
        </HStack>
      </VStack>
    </MainContainerLayout>
  );
};
