import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import styles from '../../styles/Groups.module.css';
import { GroupType } from '../../types';
import { GroupCard } from '../Cards';

interface Props {
  userGroups: GroupType[] | undefined;
}

export const Groups: React.FC<Props> = ({ userGroups }) => {
  return (
    <Flex
      boxShadow="lg"
      h="sm"
      w="3xl"
      borderRadius={20}
      boxSizing="border-box"
      px="1.5em"
      alignItems="center"
      justifyContent="center"
      mb="1em"
      overflow="hidden"
    >
      <Box className={styles.groups} m="auto" h="81%">
        {userGroups ? (
          <SimpleGrid columns={3} spacing={10}>
            {userGroups.map((group: GroupType, index: number) => (
              <Box key={index}>
                <GroupCard group={group} />
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Text>You have no groups</Text>
        )}
      </Box>
    </Flex>
  );
};
