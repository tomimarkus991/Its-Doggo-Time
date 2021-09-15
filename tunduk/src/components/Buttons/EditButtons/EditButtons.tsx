import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
  ButtonGroup,
  ButtonGroupProps,
  IconButton,
} from '@chakra-ui/react';

interface Props {
  onCrossClick: any;
  onCheckClick: any;
  buttonGroupProps?: ButtonGroupProps;
}

const EditButtons: React.FC<Props> = ({
  onCrossClick,
  onCheckClick,
  buttonGroupProps,
}) => {
  return (
    <ButtonGroup {...buttonGroupProps}>
      <IconButton
        aria-label="Cancel"
        onClick={() => onCrossClick()}
        borderRadius="100"
        bg="red.500"
        colorScheme="red"
        icon={<CloseIcon fontSize="xs" color="white" />}
      />
      <IconButton
        aria-label="Save"
        onClick={() => onCheckClick()}
        borderRadius="100"
        bg="green.500"
        colorScheme="green"
        icon={<CheckIcon color="white" />}
      />
    </ButtonGroup>
  );
};
export default EditButtons;
