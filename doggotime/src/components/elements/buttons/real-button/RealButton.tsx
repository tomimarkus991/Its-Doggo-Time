import clsx from "clsx";

import { realButtonVariants, realButtonSizes, RealButtonProps } from "components";

export const RealButton = ({
  type = "button",
  className = "",
  variant = "dark",
  size = "md",
  children,
  ...props
}: RealButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        "m-0 max-h-[4rem] font-medium tracking-wider text-center rounded-2xl border-b-[6px]",
        "transition-all duration-300 hover:-translate-y-[0.15rem]",
        "active:duration-75 active:translate-y-[0.2rem]",
        realButtonVariants[variant],
        realButtonSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
