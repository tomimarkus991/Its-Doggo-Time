import { Skeleton as ChakraSkeleton, SkeletonProps } from "@chakra-ui/react";

interface Props {
  isLoading: boolean | undefined;
  props?: SkeletonProps;
}

export const Skeleton = ({ children, isLoading, props }: Props): JSX.Element => {
  return (
    <ChakraSkeleton
      id="skeleton"
      startColor="beez.100"
      endColor="beez.700"
      isLoaded={!isLoading}
      borderRadius={100}
      {...props}
    >
      {children}
    </ChakraSkeleton>
  );
};
