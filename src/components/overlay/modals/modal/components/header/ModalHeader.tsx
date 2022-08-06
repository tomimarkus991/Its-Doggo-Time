import { ReactNode } from "react";
import { HiX, HiArrowLeft } from "react-icons/all";

import { animations, ModalTitle, ModalHeaderContainer, AnimationWrapper } from "components";

interface Props {
  children: ReactNode;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  type: "back" | "close";
}

export const ModalHeader = ({ children, setOpen, type }: Props) => {
  return (
    <ModalHeaderContainer>
      {type === "back" ? (
        <div role="button" tabIndex={0} onClick={() => setOpen(false)}>
          <AnimationWrapper keyIndex="modal-header-left-arrow-icon" variants={animations.rotate360}>
            <HiArrowLeft className="h-8 w-8 fill-slate-700 hover:fill-slate-800" />
          </AnimationWrapper>
        </div>
      ) : (
        <HiArrowLeft className="h-8 w-8 opacity-0" />
      )}

      <ModalTitle>{children}</ModalTitle>
      {type === "close" ? (
        <div role="button" tabIndex={0} onClick={() => setOpen(false)}>
          <AnimationWrapper keyIndex="modal-header-x-icon" variants={animations.rotate360}>
            <HiX className="h-8 w-8 fill-slate-700 hover:fill-slate-800" />
          </AnimationWrapper>
        </div>
      ) : (
        <HiX className="h-8 w-8 opacity-0" />
      )}
    </ModalHeaderContainer>
  );
};
