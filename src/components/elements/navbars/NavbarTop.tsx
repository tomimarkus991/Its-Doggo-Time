import { useSidebar } from "context";

import { animations, AnimationWrapper } from "components";

import { UserType } from "types";

interface Props {
  user: UserType;
}

export const NavbarTop = ({ user }: Props) => {
  const { setSidebarState } = useSidebar();
  return (
    <div className="sticky top-0 z-[1020] mb-3 flex h-16 w-full items-center bg-slate-50 py-12">
      <div className="flex flex-1 items-center justify-between px-4">
        <p className="text-2xl font-semibold text-gray-800">Subscriptions</p>
        <AnimationWrapper variants={animations.smallScale} keyIndex="nt-user-icon">
          <div
            role="button"
            tabIndex={0}
            className="flex cursor-pointer flex-row items-center"
            onClick={() => setSidebarState("openWithOverlay")}
          >
            {user.avatar_url ? (
              <img className="h-5 w-5" alt="default pic" src={user.avatar_url} />
            ) : (
              <img className="h-14 w-14" alt="user" src={`/general/avatar.svg`} />
            )}
          </div>
        </AnimationWrapper>
      </div>
    </div>
  );
};
