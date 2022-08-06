import clsx from "clsx";

import { NavbarBottom, NavbarTop, Sidebar } from "components";
import { useSidebar } from "context";
import { useIsMobile } from "hooks";

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
              "flex justify-center min-w-full min-h-screen bg-slate-50",
              sidebarState === "openWithOverlay" && "overflow-hidden h-[100vh]"
            )}
          >
            <div className="flex flex-col w-full h-full">
              <NavbarTop
                user={{ id: "1", username: "Galaxy", email: "galaxy@gmail.com", avatar: null }}
              />
              <div className="px-4">{children}</div>
              <NavbarBottom />
            </div>
          </div>
          <Sidebar />
        </>
      ) : (
        <div id="main-content" className="flex w-full min-h-screen bg-slate-50">
          <div className="flex justify-start">
            <Sidebar />
          </div>
          <div className="py-8 px-6 w-full">{children}</div>
          {rightSide && (
            <div className="hidden flex-col items-center py-8 px-4 min-w-[20rem] xl:flex 2xl:min-w-[24rem]">
              {rightSide}
            </div>
          )}
        </div>
      )}
    </>
  );
};
