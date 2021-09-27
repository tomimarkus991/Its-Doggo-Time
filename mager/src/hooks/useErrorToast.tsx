import { useToast as useChakraToast } from '@chakra-ui/react';
const useErrorToast = () => {
  const toast = useChakraToast();
  return {
    showToast: ({
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
export default useErrorToast;
