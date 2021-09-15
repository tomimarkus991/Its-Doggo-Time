import { useToast as useChakraToast } from '@chakra-ui/react';
const useToast = () => {
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
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      }),
  };
};
export default useToast;
