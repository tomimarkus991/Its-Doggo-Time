import { Box, Text } from '@chakra-ui/react';
import styles from '../../styles/GradientButton.module.css';

interface Props {
  onClick?: any;
}
export const GradientButton: React.FC<Props> = ({ children, onClick }) => {
  return (
    <Box as="button" className={styles.btnGrad} onClick={onClick}>
      <Text fontSize={30}>{children}</Text>
    </Box>
  );
};
