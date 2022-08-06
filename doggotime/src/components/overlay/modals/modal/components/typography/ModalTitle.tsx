import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ModalTitle = ({ children }: Props) => {
  return (
    <h3 className="text-lg font-medium leading-6 text-center text-gray-700 uppercase">
      {children}
    </h3>
  );
};
