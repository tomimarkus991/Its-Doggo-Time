import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  DefaultLayoutRoute,
  DefaultPrivateLayoutRoute,
} from '../components/Routes';

import CreateGroup from './CreateGroup/CreateGroup';
import Error from './Error';
import ForgotPassword from './ForgotPassword';
import GroupPage from './Group';
import Home from './Home';
import Login from './Login';
import MembersPage from './Members';
import Profile from './Profile';
import Register from './Register';

const Router: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <DefaultLayoutRoute path="/login" component={Login} />
      <DefaultLayoutRoute path="/register" component={Register} />
      <DefaultLayoutRoute
        path="/forgot-password"
        component={ForgotPassword}
      />
      <DefaultPrivateLayoutRoute path="/profile" component={Profile} />
      <DefaultPrivateLayoutRoute
        path="/group/create-group"
        component={CreateGroup}
      />
      <DefaultPrivateLayoutRoute
        exact
        path="/group/:id"
        component={GroupPage}
      />
      <DefaultPrivateLayoutRoute
        exact
        path="/group/:id/members"
        component={MembersPage}
      />
      <DefaultLayoutRoute component={Error} />
    </Switch>
  );
};
export default Router;
