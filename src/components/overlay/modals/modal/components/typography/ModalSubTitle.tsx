import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ModalSubTitle = ({ children }: Props) => {
  return <h3 className="mt-4 text-lg font-medium leading-6 text-left text-gray-600">{children}</h3>;
};
