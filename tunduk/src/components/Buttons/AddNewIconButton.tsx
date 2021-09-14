import { IconButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface Props {
  to: string;
  icon: any;
  ariaLabel: string;
  isDisabled: boolean;
}

export const AddNewIconButton: React.FC<Props> = ({
  to,
  icon,
  ariaLabel,
  isDisabled,
}) => {
  return (
    <Link to={to}>
      <IconButton
        aria-label={ariaLabel}
        w="100%"
        h="100%"
        borderRadius="100"
        isDisabled={isDisabled}
        bgColor="transparent"
        _hover={{ bgColor: 'transparent' }}
        icon={icon}
      />
    </Link>
  );
};
