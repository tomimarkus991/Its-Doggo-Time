import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ModalHeaderContainer = ({ children }: Props) => {
  return <div className="flex w-full flex-row items-center justify-between p-4">{children}</div>;
};
