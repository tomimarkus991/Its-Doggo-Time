import { useToast as useChakraToast } from '@chakra-ui/react';
const useToast = () => {
  const toast = useChakraToast();
  return {
    showSuccessToast: ({
      title,
      description,
    }: {
      title: string;
      description: string;
    }) =>
      toast({
        title,
        description,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      }),
    showErrorToast: ({
      title,
      description,
    }: {
      title: string;
      description: string;
    }) =>
      toast({
        title,
        description,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top',
      }),
  };
};
export default useToast;
