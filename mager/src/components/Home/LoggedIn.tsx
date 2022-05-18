import { Center } from "@chakra-ui/react";

import React, { useEffect } from "react";
import { useQueryClient } from "react-query";

import { useAuth } from "context/AuthContext";
import { supabase } from "utils";

import { GroupsContainer } from "../Containers";
import { Invites } from "../Invites";
import { HeaderAvatar, MainLayout, PageHeader } from "../Layouts";
import { ProfileNameAndAvatar, ProfileNameAndAvatarMiddle } from "../Layouts/Profile";
import { ProfileLink } from "../Links";

const LoggedIn: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    const updateOAuthData = async () => {
      // check if user has a profile
      const { data, error } = await supabase
        .from("profiles")
        .select(
          `
        id,
        username
    `
        )
        .eq("id", user?.id)
        .single();

      // if such profile doesn't exist
      if (
        data == null &&
        error?.message.includes("JSON object requested, multiple (or no) rows returned")
      ) {
        const updates = {
          id: user?.id,
          username: user?.user_metadata.full_name,
          updated_at: new Date(),
        };
        await supabase
          .from("profiles")
          .upsert(updates, {
            returning: "representation", // Don't return the value after inserting
          })
          .single();
      }
    };

    updateOAuthData();
    queryClient.invalidateQueries("user");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout
      leftSide={
        <HeaderAvatar>
          <ProfileNameAndAvatar />
        </HeaderAvatar>
      }
      middle={
        <>
          <ProfileNameAndAvatarMiddle />
          <Center my={{ md: 4, lg: 0 }}>
            <PageHeader>Groups</PageHeader>
          </Center>
          <GroupsContainer />
        </>
      }
      rightSide={
        <>
          <Invites />
          <ProfileLink />
        </>
      }
    />
  );
};
export default LoggedIn;
