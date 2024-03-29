import { Box, IconButton, Input, VStack } from "@chakra-ui/react";

import { useState } from "react";

import { useCreateGroup, useUser } from "hooks";

import { MainContainerLayout, AddLogCheckboxIcon, AvatarUpload } from "components";

import { GroupType } from "types";

export const CreateGroupContainer = () => {
  const [groupname, setGroupname] = useState("");
  const [group_avatar_url, setGroupAvatarUrl] = useState("");

  const { mutate } = useCreateGroup();
  const { data } = useUser();
  const groups = data?.groups as GroupType[];

  return (
    <MainContainerLayout
      isLoading={false}
      containerProps={{
        w: { base: "xs", sm: "sm", lg: "md" },
        h: { base: "xs", md: "sm" },
      }}
      button={
        <Box
          as={IconButton}
          onClick={() => mutate({ groupname, group_avatar_url })}
          mt={4}
          h="100%"
          aria-label="Create Group Button"
          bgColor="transparent"
          _hover={{ bgColor: "transparent" }}
          isDisabled={groups?.length >= 4}
          icon={
            <AddLogCheckboxIcon
              fontSize={{
                base: "5rem",
                md: "6rem",
                lg: "7rem",
              }}
            />
          }
        />
      }
    >
      <VStack pb="12" spacing={4} minW="16rem">
        <AvatarUpload
          onUpload={(url: string) => {
            setGroupAvatarUrl(url);
          }}
          avatar_url={group_avatar_url}
          avatar="Group"
        />
        <Input
          variant={"removeDefault"}
          autoCapitalize="off"
          value={groupname}
          onChange={(e: any) => setGroupname(e.target.value)}
          isRequired
          size="lg"
          fontSize="2xl"
          maxW="2xs"
          borderRadius="25"
          placeholder="Group name"
        />
      </VStack>
    </MainContainerLayout>
  );
};
