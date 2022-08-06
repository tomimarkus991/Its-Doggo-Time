import clsx from "clsx";
import { HiMenu, HiHome } from "react-icons/all";

import { AnimationWrapper, animations, SidebarIconLink } from "components";
import { useSidebar } from "context";

export const SmallSidebarContent = () => {
  const { setSidebarState } = useSidebar();
  return (
    <div className="flex flex-col justify-between py-6 px-3 h-full">
      <div className={clsx("flex flex-col justify-center items-center")}>
        <div className="min-w-[3.5rem] min-h-[3.5rem]">
          <img className="w-14 h-14" src={`/icons/favicon.svg`} alt="icon" />
        </div>
        <div className="mt-6 mb-4">
          <button
            className="p-3 hover:bg-slate-100 rounded-md lg:hidden"
            onClick={() => setSidebarState("openWithOverlay")}
          >
            <AnimationWrapper keyIndex="sidebar-x-icon" variants={animations.smallScale}>
              <HiMenu className="w-7 h-7 fill-slate-700 hover:fill-slate-800" />
            </AnimationWrapper>
          </button>
          <button
            className="p-3 hover:bg-slate-100 rounded-md md:hidden lg:block"
            onClick={() => setSidebarState("expanded")}
          >
            <AnimationWrapper keyIndex="sidebar-x-icon" variants={animations.smallScale}>
              <HiMenu className="w-7 h-7 fill-slate-700 hover:fill-slate-800" />
            </AnimationWrapper>
          </button>
        </div>
        <div className="z-[998] space-y-4 h-full">
          <SidebarIconLink
            to="/"
            tooltip="home"
            icon={<HiHome className="w-8 h-8 fill-inherit" />}
          />
        </div>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <img className="w-14 h-14" alt="user" src={`/general/avatar.svg`} />
      </div>
    </div>
  );
};
