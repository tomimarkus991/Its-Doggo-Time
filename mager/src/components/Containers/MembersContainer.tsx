import { Box, IconButton, SimpleGrid } from "@chakra-ui/react";

import React, { useState } from "react";

import { useAuth } from "../../context";
import { useMembersPlaceholder } from "../../hooks/placeholders";
import { useFetchGroupData } from "../../hooks/queries";
import { MemberType } from "../../types";
import { PenButton } from "../Buttons";
import { MemberCard } from "../Cards";
import { CheckIcon, ProfileIcon } from "../Icons";
import { MainContainerLayout } from "../Layouts";
import { AddNewMemberModal } from "../Modals";

interface Props {
  group_id: string;
}

const MembersContainer: React.FC<Props> = ({ group_id }) => {
  const { user } = useAuth();
  const { data, isLoading } = useFetchGroupData(group_id);
  const { placeholders } = useMembersPlaceholder(data?.profiles);

  const [isEditable, setIsEditable] = useState(false);

  return (
    <MainContainerLayout
      isLoading={isLoading}
      button={<AddNewMemberModal group_id={group_id} />}
      containerProps={{
        w: {
          base: "xs",
          sm: "md",
          sm2: "lg",
          lg: "xl",
        },
        h: { base: "md", sm: "sm" },
      }}
    >
      <SimpleGrid
        columns={{ base: 2, sm: 3 }}
        spacingY={6}
        spacingX={{ base: 10, sm: 8, sm2: 10, md: 6 }}
      >
        {data?.profiles?.map((member: MemberType, index: number) => (
          <MemberCard
            key={index}
            member={member}
            isEditable={isEditable}
            group_id={group_id}
            creator_id={data?.creator_id}
          />
        ))}
        {placeholders?.map((_, index: number) => (
          <ProfileIcon
            key={index}
            fontSize={{
              base: "6rem",
              md: "6rem",
              xl: "6.5rem",
            }}
          />
        ))}
        <Box position="absolute" right="0" top="0">
          <Box position="relative" float="right" right="2" top="2">
            {user?.id === data?.creator_id && (
              <>
                {isEditable === false ? (
                  <PenButton onClick={() => setIsEditable(true)} />
                ) : (
                  <IconButton
                    isRound
                    onClick={() => setIsEditable(false)}
                    aria-label="Save"
                    bg="green.500"
                    colorScheme="green"
                    icon={<CheckIcon fontSize="1.3rem" />}
                  />
                )}
              </>
            )}
          </Box>
        </Box>
      </SimpleGrid>
    </MainContainerLayout>
  );
};

export default MembersContainer;
