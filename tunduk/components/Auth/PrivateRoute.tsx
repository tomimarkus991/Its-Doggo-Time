import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/authContext/AuthContext';

export const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={props => {
        // Renders the page only if `user` is present (user is authenticated)
        // Otherwise, redirect to the login page
        return user ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
};
