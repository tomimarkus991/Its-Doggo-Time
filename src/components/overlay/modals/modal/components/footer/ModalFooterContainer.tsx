import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ModalFooterContainer = ({ children }: Props) => {
  return (
    <div className="sticky bottom-0 z-40 flex min-h-[4rem] w-full items-center justify-center rounded-b-xl bg-white py-3 px-6">
      {children}
    </div>
  );
};
