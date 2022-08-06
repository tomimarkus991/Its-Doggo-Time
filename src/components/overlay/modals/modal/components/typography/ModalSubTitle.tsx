import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ModalSubTitle = ({ children }: Props) => {
  return <h3 className="mt-4 text-left text-lg font-medium leading-6 text-gray-600">{children}</h3>;
};
