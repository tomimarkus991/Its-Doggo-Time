import clsx from "clsx";

import { realButtonVariants, realButtonSizes, RealButtonProps } from "components";

export const RealIconButton = ({
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
        "m-0 max-h-[4rem] rounded-2xl border-b-[6px] text-center font-medium tracking-wider",
        "touch-manipulation select-none transition-all duration-300 hover:-translate-y-[0.15rem] active:translate-y-[0.2rem] active:duration-75",
        "flex w-full flex-row items-center justify-center py-2.5 px-2 overflow-x-hidden xs:py-2 xs:text-lg xs:font-semibold",
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
