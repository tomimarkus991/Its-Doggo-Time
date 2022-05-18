import React from "react";
import { Route, Switch } from "react-router-dom";

import { DefaultLayoutRoute, DefaultPrivateLayoutRoute } from "../components/Routes";

import AddLog from "./AddLog";
import CreateGroup from "./CreateGroup";
import EditLog from "./EditLog";
import Error from "./Error";
import ForgotPassword from "./ForgotPassword";
import GroupPage from "./GroupPage";
import Home from "./Home";
import Login from "./Login";
import LogsSummary from "./LogsSummary";
import Members from "./Members";
import Profile from "./Profile";
import Register from "./Register";
import ResetPassword from "./ResetPassword";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <DefaultLayoutRoute path="/login" component={Login} />
      <DefaultLayoutRoute path="/register" component={Register} />
      <DefaultLayoutRoute path="/forgot-password" component={ForgotPassword} />
      <DefaultLayoutRoute path="/reset-password" component={ResetPassword} />
      <DefaultPrivateLayoutRoute path="/profile" component={Profile} />
      <DefaultPrivateLayoutRoute path="/group/create-group" component={CreateGroup} />
      <DefaultPrivateLayoutRoute exact path="/group/:group_id" component={GroupPage} />
      <DefaultPrivateLayoutRoute exact path="/group/:group_id/members" component={Members} />
      <DefaultPrivateLayoutRoute exact path="/group/:group_id/add-log" component={AddLog} />
      <DefaultPrivateLayoutRoute exact path="/group/:group_id/summary" component={LogsSummary} />
      <DefaultPrivateLayoutRoute exact path="/group/:group_id/log/:log_id" component={EditLog} />
      <DefaultLayoutRoute component={Error} />
    </Switch>
  );
};
export default Router;
