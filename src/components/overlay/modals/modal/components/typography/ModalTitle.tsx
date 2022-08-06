import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ModalTitle = ({ children }: Props) => {
  return (
    <h3 className="text-center text-lg font-medium uppercase leading-6 text-gray-700">
      {children}
    </h3>
  );
};
