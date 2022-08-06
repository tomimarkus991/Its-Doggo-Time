import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ModalFooterContainer = ({ children }: Props) => {
  return (
    <div className="flex sticky bottom-0 z-40 justify-center items-center py-3 px-6 w-full min-h-[4rem] bg-white rounded-b-xl">
      {children}
    </div>
  );
};
