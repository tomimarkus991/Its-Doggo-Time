import { ButtonGroup, ButtonGroupProps, IconButton } from "@chakra-ui/react";

import { CheckIcon, CrossIcon } from "components";

interface Props {
  onCrossClick: () => void;
  onCheckClick: () => void;
  buttonGroupProps?: ButtonGroupProps;
}

export const EditButtons = ({ onCrossClick, onCheckClick, buttonGroupProps }: Props) => {
  return (
    <ButtonGroup {...buttonGroupProps}>
      <IconButton
        aria-label="Cancel"
        onClick={() => onCrossClick()}
        isRound
        bg="red.500"
        colorScheme="red"
        icon={<CrossIcon fontSize="1rem" />}
      />
      <IconButton
        aria-label="Save"
        onClick={() => onCheckClick()}
        isRound
        bg="green.500"
        colorScheme="green"
        icon={<CheckIcon fontSize="1rem" />}
      />
    </ButtonGroup>
  );
};
