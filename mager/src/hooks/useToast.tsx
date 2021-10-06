import {
  useToast as useChakraToast,
  ToastPositionWithLogical,
} from '@chakra-ui/react';
const useToast = () => {
  const toast = useChakraToast();
  return {
    showSuccessToast: ({
      title,
      description,
      position,
    }: {
      title: string;
      description: string;
      position?: ToastPositionWithLogical;
    }) =>
      toast({
        title,
        description,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: position || 'bottom',
      }),
    showErrorToast: ({
      title,
      description,
      position,
    }: {
      title: string;
      description: string;
      position?: ToastPositionWithLogical;
    }) =>
      toast({
        title,
        description,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: position || 'top',
      }),
  };
};
export default useToast;
