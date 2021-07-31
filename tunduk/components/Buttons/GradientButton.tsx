import { Button, ButtonProps } from '@chakra-ui/react';
import styles from '../../styles/GradientButton.module.css';

export const GradientButton = (props: ButtonProps) => {
  return (
    <Button
      className={styles.btnGrad}
      p={7}
      bgGradient="linear(to-r, beez.500, beez.900)"
      borderRadius={100}
      _hover={{
        bgGradient: 'linear(to-l, beez.500, beez.900)',
      }}
      // _focus={{ borderColor: 'beez.900' }}
      {...props}
    >
      {props.children}
    </Button>
  );
};
