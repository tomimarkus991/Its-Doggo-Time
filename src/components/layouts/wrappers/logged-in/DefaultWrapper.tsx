import clsx from "clsx";

import { useSidebar } from "context";

import { useIsMobile } from "hooks";

import { NavbarBottom, NavbarTop, Sidebar } from "components";

interface Props {
  children: React.ReactNode;
  rightSide?: React.ReactNode;
}

export const DefaultWrapper = ({ children, rightSide }: Props) => {
  const { isMobile } = useIsMobile();
  const { sidebarState } = useSidebar();
  return (
    <>
      {isMobile ? (
        <>
          <div
            id="main-content"
            className={clsx(
              "flex min-h-screen min-w-full justify-center bg-slate-50",
              sidebarState === "openWithOverlay" && "h-[100vh] overflow-hidden"
            )}
          >
            <div className="flex h-full w-full flex-col">
              <NavbarTop user={{ id: "1", username: "Galaxy", avatar_url: "", groups: [] }} />
              <div className="px-4">{children}</div>
              <NavbarBottom />
            </div>
          </div>
          <Sidebar />
        </>
      ) : (
        <div id="main-content" className="flex min-h-screen w-full bg-slate-50">
          <div className="flex justify-start">
            <Sidebar />
          </div>
          <div className="w-full py-8 px-6">{children}</div>
          {rightSide && (
            <div className="hidden min-w-[20rem] flex-col items-center py-8 px-4 xl:flex 2xl:min-w-[24rem]">
              {rightSide}
            </div>
          )}
        </div>
      )}
    </>
  );
};
