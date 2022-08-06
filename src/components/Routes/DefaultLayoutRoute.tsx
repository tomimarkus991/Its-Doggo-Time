import { Route } from "react-router-dom";

import { BasicDefaultLayout } from "components";

export const DefaultLayoutRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props: any) => (
        <BasicDefaultLayout>
          <Component {...props} />
        </BasicDefaultLayout>
      )}
    />
  );
};
