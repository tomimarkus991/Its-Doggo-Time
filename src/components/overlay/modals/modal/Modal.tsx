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
            className="flex fixed inset-0 z-[1000] justify-center items-center select-none"
            open={open}
            onClose={setOpen}
          >
            <AnimationWrapper
              keyIndex="app-modal-overlay"
              id="overlay"
              variants={animations.overlay}
              animateOnAllScreens
              onClick={() => setOpen(false)}
              className="absolute inset-0 w-full h-full bg-gray-500 opacity-40"
            />
            <button
              id="button-to-remove-autofocus"
              ref={initialFocusRef}
              className="hidden absolute inset-0"
            />
            <AnimationWrapper
              keyIndex="app-modal-children"
              id="modal-children"
              variants={animations.modalEffect}
              animateOnAllScreens
              className={clsx(
                modalMaxWidth[maxWidth],
                "z-[1020] min-w-[95%] max-w-[94%] bg-white rounded-xl min:min-w-[20rem]"
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
