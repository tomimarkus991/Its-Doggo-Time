import { Box } from '@chakra-ui/react';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddAvatarIcon: React.FC = () => {
  return (
    <Box position="relative">
      <Box
        as={FontAwesomeIcon}
        bgColor="white"
        py="2"
        px="2"
        right="0%"
        bottom="-5%"
        borderRadius="100"
        position="absolute"
        icon={faImage}
        cursor="pointer"
        fontSize={{ base: '2rem', sm: '2.5rem', md: '3rem' }}
      />
    </Box>
  );
};
export default AddAvatarIcon;
