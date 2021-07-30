import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Default from '../components/Layouts/Default';
import CreateGroup from './CreateGroup/CreateGroup';
import Error from './Error';
import GroupPage from './Group';
import MembersPage from './Members';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import { PrivateRoute } from '../components/Auth';

export default function Index() {
  return (
    <>
      <Router>
        <Default>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <PrivateRoute
              path="/group/create-group"
              component={CreateGroup}
            />
            <PrivateRoute exact path="/group/:id" component={GroupPage} />
            <PrivateRoute
              exact
              path="/group/:id/members"
              component={MembersPage}
            />
            <PrivateRoute component={Error} />
          </Switch>
        </Default>
      </Router>
    </>
  );
}
