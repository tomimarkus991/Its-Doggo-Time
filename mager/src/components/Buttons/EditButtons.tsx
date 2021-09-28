import {
  ButtonGroup,
  ButtonGroupProps,
  IconButton,
} from '@chakra-ui/react';
import { CheckIcon, CrossIcon } from '../Icons';

interface Props {
  onCrossClick: () => void;
  onCheckClick: () => void;
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
        icon={<CrossIcon fontSize="1rem" />}
      />
      <IconButton
        aria-label="Save"
        onClick={() => onCheckClick()}
        borderRadius="100"
        bg="green.500"
        colorScheme="green"
        icon={<CheckIcon fontSize="1rem" />}
      />
    </ButtonGroup>
  );
};
export default EditButtons;
