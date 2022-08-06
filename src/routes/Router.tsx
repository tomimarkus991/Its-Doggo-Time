import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
// eslint-disable-next-line import/no-unresolved
import { useRegisterSW } from "virtual:pwa-register/react";

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
  Error,
} from "pages";

import { DefaultLayoutRoute, DefaultPrivateLayoutRoute } from "components";

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
    <Routes>
      <Route path="/" element={<Home />} />
      <DefaultLayoutRoute path="/login" element={<Login />} />
      <DefaultLayoutRoute path="/register" element={<Register />} />
      <DefaultLayoutRoute path="/forgot-password" element={<ForgotPassword />} />
      <DefaultLayoutRoute path="/reset-password" element={<ResetPassword />} />
      <DefaultPrivateLayoutRoute path="/profile" element={<Profile />} />
      <DefaultPrivateLayoutRoute path="/group/create-group" element={<CreateGroup />} />
      <DefaultPrivateLayoutRoute exact path="/group/:group_id" element={<GroupPage />} />
      <DefaultPrivateLayoutRoute exact path="/group/:group_id/members" element={<Members />} />
      <DefaultPrivateLayoutRoute exact path="/group/:group_id/add-log" element={<AddLog />} />
      <DefaultPrivateLayoutRoute exact path="/group/:group_id/summary" element={<LogsSummary />} />
      <DefaultPrivateLayoutRoute exact path="/group/:group_id/log/:log_id" element={<EditLog />} />
      <DefaultLayoutRoute element={<Error />} />
    </Routes>
  );
};
