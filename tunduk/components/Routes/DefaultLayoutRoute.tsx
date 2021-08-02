import { Route } from 'react-router-dom';
import DefaultLayout from '../Layouts/Default';

export const DefaultLayoutRoute = ({
  component: Component,
  ...rest
}: any) => {
  return (
    <Route
      {...rest}
      render={props => (
        <DefaultLayout>
          <Component {...props} />
        </DefaultLayout>
      )}
    />
  );
};
