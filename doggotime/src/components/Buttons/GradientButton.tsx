import { Button, ButtonProps } from "@chakra-ui/react";

export const GradientButton = (props: ButtonProps) => {
  return (
    <Button
      p={7}
      bgGradient="linear(to-r, beez.500, beez.700)"
      borderRadius={100}
      _hover={{
        bgGradient: "linear(to-r, beez.500, beez.700)",
      }}
      // _focus={{
      //   // bgGradient: 'linear(to-r, beez.500, beez.700)',
      //   boxShadow:""
      // }}

      {...props}
    >
      {props.children}
    </Button>
  );
};
