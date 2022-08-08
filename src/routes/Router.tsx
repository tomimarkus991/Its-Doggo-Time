import { useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
// eslint-disable-next-line import/no-unresolved
import { useRegisterSW } from "virtual:pwa-register/react";

import {
  ForgotPassword,
  Home,
  AddLog,
  CreateGroup,
  EditLog,
  GroupPage,
  Login,
  LogsSummary,
  Members,
  Profile,
  Register,
  ResetPassword,
  Error,
  // Error,
} from "pages";

import { LayoutRoutes, PrivateLayoutRoutes } from "components";

export const Router = () => {
  const root = document.documentElement;
  useEffect(() => {
    if (localStorage.theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const intervalMS = 60 * 60 * 1000;

  useRegisterSW({
    onRegistered(r) {
      r &&
        setInterval(() => {
          r.update();
        }, intervalMS);
    },
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateLayoutRoutes />}>
          <Route path="profile" element={<Profile />} />
          <Route path="group/:group_id/members" element={<Members />} />
          <Route path="group">
            <Route path="create-group" element={<CreateGroup />} />
            <Route path=":group_id" element={<GroupPage />} />
            <Route path=":group_id/add-log" element={<AddLog />} />
            <Route path=":group_id/summary" element={<LogsSummary />} />
            <Route path=":group_id/log:log_id" element={<EditLog />} />
          </Route>
        </Route>
        <Route element={<LayoutRoutes />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
