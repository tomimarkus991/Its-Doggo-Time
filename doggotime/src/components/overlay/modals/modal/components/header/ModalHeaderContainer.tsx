import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ModalHeaderContainer = ({ children }: Props) => {
  return <div className="flex flex-row justify-between items-center p-4 w-full">{children}</div>;
};
