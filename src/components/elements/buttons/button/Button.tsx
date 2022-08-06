import clsx from "clsx";
import React from "react";

import { animations, AnimationWrapper } from "components";

const sizes = {
  xs: "py-1 px-3 text-sm",
  sm: "py-2 px-6 text-sm",
  md: "py-2 px-10 text-md",
  lg: "py-3 px-14 text-lg",
};

const variants = {
  // regular --> hover --> active --> dark
  green: `bg-lime-500 text-[#f3f2f0] border-lime-600
    hover:text-white
    active:border-lime-500
    dark:bg-lime-700 dark:border-lime-800 dark:active:border-lime-700`,
  dark: `bg-gray-700 text-[#f3f2f0] border-gray-900
    hover:text-white
    active:border-gray-700
    dark:bg-gray-700 dark:border-gray-900 dark:active:border-gray-700`,
  light: `bg-slate-50 text-slate-700 border-slate-200
    hover:text-gray-800
    active:border-slate-50`,
  blue: `bg-blue-700 text-[#f3f2f0] border-blue-900
    hover:text-white
    active:border-blue-700
    dark:bg-blue-700 dark:border-blue-900 dark:active:border-blue-700`,
  custom: `hover:text-white`,
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string;
  isValid?: boolean;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  customColors?: string;
};

export const Button = ({
  type = "button",
  className = "",
  variant = "dark",
  size = "md",
  isValid = true,
  children,
  customColors,
  ...props
}: ButtonProps) => {
  return (
    <AnimationWrapper keyIndex="regular-button" variants={animations.button}>
      <button
        type={type}
        className={clsx(
          `m-0 select-none rounded-2xl text-center font-medium uppercase tracking-wider`,
          variants[variant],
          sizes[size],
          !isValid && "cursor-not-allowed opacity-50",
          className,
          variant === "custom" && customColors
        )}
        {...props}
      >
        <p
          className={clsx(
            variant !== "light" && "text-white",
            customColors?.includes("white") && "text-gray-700"
          )}
        >
          {children}
        </p>
      </button>
    </AnimationWrapper>
  );
};
