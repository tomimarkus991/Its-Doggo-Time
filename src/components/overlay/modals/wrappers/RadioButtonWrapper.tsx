import clsx from "clsx";

import { animations, AnimationWrapper } from "components";

interface Props {
  children: React.ReactNode;
  setOpen: (open: boolean) => void;
  checked: boolean;
  index: string;
}

export const RadioButtonWrapper = ({ children, setOpen, checked, index }: Props) => {
  return (
    <AnimationWrapper
      keyIndex={index}
      variants={animations.makeBiggerAndRotateSlightly}
      className={clsx(
        "scrollbar-hide",
        "flex cursor-pointer flex-row items-center justify-center overflow-x-auto rounded-md bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 py-4 px-3 font-semibold text-gray-800 xs:text-lg",
        // `hover:${cardColors[values.selectedColor]}`,
        !checked &&
          "hover:bg-gradient-to-tr hover:from-slate-50 hover:via-slate-100 hover:to-gray-100",
        checked && "border-4 border-transparent border-gradient-br-purple-white"
      )}
      role="button"
      tabIndex={0}
      onClick={() => setOpen(false)}
    >
      {children}
    </AnimationWrapper>
  );
};
