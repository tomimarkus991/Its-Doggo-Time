import { motion } from "framer-motion";

import clsx from "clsx";
import { HTMLProps, ReactNode } from "react";
import { NavLink } from "react-router-dom";

import { animations, AnimationWrapper } from "components";
import { useSidebar } from "context";

interface SidebarItemProps {
  icon: ReactNode;
  children?: string;
  to?: string;
}

interface ContentProps {
  icon: ReactNode;
  isActive?: boolean;
  children?: string;
}

type Props = SidebarItemProps & HTMLProps<HTMLDivElement>;

const Content = ({ children, icon, isActive }: ContentProps) => {
  return (
    <motion.div
      whileHover="whileHover"
      whileTap="whileTap"
      className={clsx(
        isActive ? "bg-slate-800 hover:bg-slate-900" : "hover:bg-slate-100",
        "group flex items-center py-3 px-5 rounded-md cursor-pointer"
      )}
    >
      <AnimationWrapper
        variants={animations.smallScale}
        keyIndex="sidebar-link-icon"
        child
        className={clsx(
          isActive ? "fill-white" : "fill-gray-800 group-hover:fill-slate-800",
          "flex items-center"
        )}
      >
        {icon}
        <div className="flex flex-row items-center">
          <p className={clsx("text-xl font-medium", isActive && "text-white")}>{children}</p>
        </div>
      </AnimationWrapper>
    </motion.div>
  );
};

export const SidebarLink = ({ children, to, icon, ...props }: Props) => {
  const { setSidebarState, sidebarState } = useSidebar();
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {
        if (sidebarState === "openWithOverlay") {
          setSidebarState("closed");
        }
      }}
      {...props}
    >
      {to ? (
        <NavLink to={to}>
          {({ isActive }) => (
            <Content icon={icon} isActive={isActive}>
              {children}
            </Content>
          )}
        </NavLink>
      ) : (
        <Content icon={icon}>{children}</Content>
      )}
    </div>
  );
};
