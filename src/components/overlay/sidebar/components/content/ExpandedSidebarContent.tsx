import clsx from "clsx";
import { HiHome, HiX } from "react-icons/all";

import { useSidebar } from "context";

import { AnimationWrapper, SidebarLink, animations } from "components";

export const ExpandedSidebarContent = () => {
  const { setSidebarState } = useSidebar();

  return (
    <div className="flex h-full flex-col justify-between py-6 px-3">
      <div className={clsx("flex flex-col")}>
        <div className="flex flex-row justify-between px-3">
          <div className="min-h-[3.5rem] min-w-[3.5rem]">
            <img className="h-14 w-14" src={`/icons/favicon.svg`} alt="icon" />
          </div>
          <button className="md:hidden" onClick={() => setSidebarState("closed")}>
            <AnimationWrapper keyIndex="sidebar-x-icon" variants={animations.scaleAndRotation}>
              <HiX className="h-12 w-12 fill-slate-700 hover:fill-slate-800" />
            </AnimationWrapper>
          </button>
          <button className="hidden md:block" onClick={() => setSidebarState("small")}>
            <AnimationWrapper keyIndex="sidebar-x-icon" variants={animations.scaleAndRotation}>
              <HiX className="h-12 w-12 fill-slate-700 hover:fill-slate-800" />
            </AnimationWrapper>
          </button>
        </div>
        <div className="mt-8 h-full space-y-4">
          <SidebarLink to="/" icon={<HiHome className="mr-3 h-8 w-8 fill-inherit" />}>
            Home
          </SidebarLink>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row items-center space-x-3 px-4">
          <img className="h-14 w-14" alt="user" src={`/general/avatar.svg`} />
          <p className="text-xl font-semibold">Galaxy</p>
        </div>
      </div>
    </div>
  );
};
