import { Text } from '@chakra-ui/react';
import { GradientButton } from '../Buttons';
import { GradientButtonText } from '../Text';

export const AddDutyLink: React.FC = () => {
  return (
    <GradientButton>
      <GradientButtonText fontSize={30}>Add Duty</GradientButtonText>
    </GradientButton>
  );
};
