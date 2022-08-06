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
        "m-0 max-h-[4rem] font-medium tracking-wider text-center rounded-2xl border-b-[6px]",
        "transition-all duration-300 active:duration-75 hover:-translate-y-[0.15rem] active:translate-y-[0.2rem] touch-manipulation select-none",
        "flex overflow-x-hidden flex-row justify-center items-center py-2.5 px-2 w-full xs:py-2 xs:text-lg xs:font-semibold",
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
