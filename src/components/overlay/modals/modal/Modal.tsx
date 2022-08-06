import { Dialog } from "@headlessui/react";

import { AnimatePresence, motion } from "framer-motion";

import clsx from "clsx";
import { ReactNode, useRef } from "react";

import { animations, AnimationWrapper } from "components";

const modalMaxWidth = {
  xs: "sm:max-w-xs",
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
};

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  modalButton: ReactNode;
  children?: ReactNode;
  maxWidth?: keyof typeof modalMaxWidth;
}

export const Modal = ({ children, modalButton, open, setOpen, maxWidth = "xl" }: Props) => {
  const initialFocusRef = useRef(null);
  return (
    <>
      {modalButton}
      <AnimatePresence>
        {open && (
          <Dialog
            static
            as={motion.div}
            key="modal-dialog"
            initialFocus={initialFocusRef}
            className="fixed inset-0 z-[1000] flex select-none items-center justify-center"
            open={open}
            onClose={setOpen}
          >
            <AnimationWrapper
              keyIndex="app-modal-overlay"
              id="overlay"
              variants={animations.overlay}
              animateOnAllScreens
              onClick={() => setOpen(false)}
              className="absolute inset-0 h-full w-full bg-gray-500 opacity-40"
            />
            <button
              id="button-to-remove-autofocus"
              ref={initialFocusRef}
              className="absolute inset-0 hidden"
            />
            <AnimationWrapper
              keyIndex="app-modal-children"
              id="modal-children"
              variants={animations.modalEffect}
              animateOnAllScreens
              className={clsx(
                modalMaxWidth[maxWidth],
                "z-[1020] min-w-[95%] max-w-[94%] rounded-xl bg-white min:min-w-[20rem]"
              )}
            >
              {children}
            </AnimationWrapper>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};
