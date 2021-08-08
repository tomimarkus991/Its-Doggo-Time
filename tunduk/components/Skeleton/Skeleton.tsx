import {
  Skeleton as ChakraSkeleton,
  SkeletonProps,
} from '@chakra-ui/react';

interface Props {
  isLoading: boolean;
  props?: SkeletonProps;
}

const Skeleton: React.FC<Props> = ({
  children,
  isLoading,
  props,
}): JSX.Element => {
  return (
    <ChakraSkeleton
      id="skeleton"
      startColor="beez.100"
      endColor="beez.700"
      isLoaded={!isLoading}
      {...props}
    >
      {children}
    </ChakraSkeleton>
  );
};
export default Skeleton;
