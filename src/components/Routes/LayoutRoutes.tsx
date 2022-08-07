import { Outlet } from "react-router-dom";

import { BasicDefaultLayout } from "components";

export const LayoutRoutes = () => {
  return (
    <BasicDefaultLayout>
      <Outlet />
    </BasicDefaultLayout>
  );
};
