import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Default from '../components/Layouts/Default';
import CreateGroup from './CreateGroup/CreateGroup';
import Error from './Error';
import GroupPage from './Group';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';

export default function Index() {
  return (
    <>
      <Router>
        <Default>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path="/group/create-group" component={CreateGroup} />
            <Route path="/group/:id" component={GroupPage} />
            <Route component={Error} />
          </Switch>
        </Default>
      </Router>
    </>
  );
}
