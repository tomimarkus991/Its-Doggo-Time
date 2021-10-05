import { Box, IconButton } from '@chakra-ui/react';
import { AddLogCheckboxIcon } from '../Icons';

interface Props {
  logData?: any;
  onClick: () => void;
}

const AddLogButton: React.FC<Props> = ({ logData, onClick }) => {
  return (
    <Box
      as={IconButton}
      onClick={onClick}
      h="100%"
      aria-label="Add Food Log Button"
      bgColor="transparent"
      _hover={{ bgColor: 'transparent' }}
      isDisabled={logData?.length === 0}
      icon={
        <AddLogCheckboxIcon
          fontSize={{
            base: '5rem',
            md: '6rem',
            lg: '7rem',
          }}
        />
      }
    />
  );
};
export default AddLogButton;
