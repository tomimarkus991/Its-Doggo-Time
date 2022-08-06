import { Center } from "@chakra-ui/react";

import { Navigate, Route } from "react-router-dom";

import { useUser } from "hooks";

import { DefaultLayout, DefaultSpinner } from "components";

export const DefaultPrivateLayoutRoute = ({ component: Component, ...rest }: any) => {
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
    <Route
      {...rest}
      render={(props: any) =>
        // If Error redirect to the login page
        // Otherwise, render the page
        isError ? (
          <Route path="*" element={<Navigate to="/login" replace />} />
        ) : (
          <DefaultLayout>
            <Component {...props} />
          </DefaultLayout>
        )
      }
    />
  );
};
