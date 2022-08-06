import { SimpleGrid } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

export const LogGrid = ({ children }: Props) => {
  return (
    <SimpleGrid
      id="LogGrid"
      columns={2}
      spacing={{ base: 2, lg: 10 }}
      w={{
        base: "xs",
        sm: "sm",
        sm2: "md",
        md: "lg",
        xl: "xl",
      }}
      h={{ base: "22rem", sm: "sm", md: "md" }}
      px={{ base: 4, md: 12, lg: 16 }}
      py={{ base: 4, md: 6, lg: 8 }}
    >
      {children}
    </SimpleGrid>
  );
};
