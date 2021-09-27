import {
  ButtonGroup,
  ButtonGroupProps,
  IconButton,
} from '@chakra-ui/react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        icon={<FontAwesomeIcon icon={faTimes} color="white" size="lg" />}
      />
      <IconButton
        aria-label="Save"
        onClick={() => onCheckClick()}
        borderRadius="100"
        bg="green.500"
        colorScheme="green"
        icon={<FontAwesomeIcon icon={faCheck} color="white" size="1x" />}
      />
    </ButtonGroup>
  );
};
export default EditButtons;
