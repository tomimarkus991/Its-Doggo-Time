import { Center } from "@chakra-ui/react";

import { Redirect, Route } from "react-router-dom";

import { useUser } from "../../hooks/queries";
import DefaultLayout from "../Layouts/DefaultLayout";
import { DefaultSpinner } from "../Spinners";

const DefaultPrivateLayoutRoute = ({ component: Component, ...rest }: any) => {
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
      render={props =>
        // If Error redirect to the login page
        // Otherwise, render the page
        isError ? (
          <Redirect to="/login" />
        ) : (
          <DefaultLayout>
            <Component {...props} />
          </DefaultLayout>
        )
      }
    />
  );
};

export default DefaultPrivateLayoutRoute;
