import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../../context/authContext/AuthContext';
import DefaultLayout from '../Layouts/Default';

export const DefaultPrivateLayoutRoute = ({
  component: Component,
  ...rest
}: any) => {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={props =>
        // Renders the page only if `user` is present (user is authenticated)
        // Otherwise, redirect to the login page
        user ? (
          <DefaultLayout>
            <Component {...props} />
          </DefaultLayout>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
