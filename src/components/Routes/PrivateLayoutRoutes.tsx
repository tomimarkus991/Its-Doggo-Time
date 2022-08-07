import { Center } from "@chakra-ui/react";

import { Navigate, Outlet } from "react-router-dom";

import { useUser } from "hooks";

import { DefaultLayout, DefaultSpinner } from "components";

export const PrivateLayoutRoutes = () => {
  const { isLoading, isError } = useUser();

  // when useUser is authenticating
  if (isLoading) {
    return (
      <Center h="100vh">
        <DefaultSpinner />
      </Center>
    );
  }

  return (
    // If Error redirect to the login page
    // Otherwise, render the page
    isError ? (
      <Navigate to="/login" />
    ) : (
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    )
  );
};
