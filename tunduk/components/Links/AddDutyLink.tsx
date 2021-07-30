import { Text } from '@chakra-ui/react';
import { GradientButton } from '../Buttons';

export const AddDutyLink: React.FC = () => {
  return (
    <GradientButton>
      <Text fontSize={30} color="gray.800">
        Add Duty
      </Text>
    </GradientButton>
  );
};
