import { Route, Switch } from "react-router-dom";

import {
  AddLog,
  CreateGroup,
  EditLog,
  ForgotPassword,
  GroupPage,
  Home,
  Login,
  LogsSummary,
  Members,
  Profile,
  Register,
  ResetPassword,
} from "pages";

import { DefaultLayoutRoute, DefaultPrivateLayoutRoute } from "components";

export const Router = () => {
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
