import { Route } from "react-router-dom";

import BasicDefaultLayout from "../Layouts/BasicDefaultLayout";

export const DefaultLayoutRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={props => (
        <BasicDefaultLayout>
          <Component {...props} />
        </BasicDefaultLayout>
      )}
    />
  );
};
