import { Center, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";

import { useUser, useGroupsPlaceholder } from "hooks";

import { CreateGroupContainerButton, GroupCard, MainContainerLayout, DogPaw } from "components";

import { GroupType } from "types";

export const GroupsContainer = () => {
  const { data, isLoading } = useUser();
  const { placeholders, isAddDoggoGroupDisabled } = useGroupsPlaceholder(data?.groups);

  return (
    <MainContainerLayout
      isLoading={isLoading}
      button={<CreateGroupContainerButton isAddDoggoGroupDisabled={isAddDoggoGroupDisabled} />}
      containerProps={{
        w: {
          base: "xs",
          sm: "sm",
          md: "lg",
        },
        h: { base: "sm", md: "md" },
      }}
    >
      {data && !!data?.groups?.length ? (
        <SimpleGrid
          id="GroupsGrid"
          columns={2}
          spacingY={10}
          spacingX={{ base: 10, sm: 50, md: 85 }}
        >
          {data?.groups?.map((group: GroupType, index: number) => (
            <GroupCard key={index} group={group} />
          ))}
          {placeholders?.map((_, index: number) => (
            <DogPaw key={index} fontSize={{ base: "6rem", lg: "8rem" }} />
          ))}
        </SimpleGrid>
      ) : (
        <Center h="100%" px="8">
          <VStack textAlign="center">
            <Heading fontSize={{ base: "2xl", lg: "4xl" }}>No groups created yet</Heading>
            <Text fontSize={{ base: "xl", lg: "2xl" }} maxW="lg">
              Create a new doggo group to connect with your family members and have a look what your
              doggo has been up to.
            </Text>
          </VStack>
        </Center>
      )}
    </MainContainerLayout>
  );
};
