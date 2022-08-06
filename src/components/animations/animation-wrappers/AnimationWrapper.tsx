import { HTMLMotionProps, motion } from "framer-motion";

import { useIsMobile } from "hooks";

interface Props {
  children?: React.ReactNode;
  /**
   * @description Set true if you want to use animation on all screens
   * @default false
   */
  animateOnAllScreens?: boolean;
  child?: boolean;
  keyIndex: string;
}

type IProps = Props & HTMLMotionProps<"div">;

export const AnimationWrapper = ({
  children,
  animateOnAllScreens = false,
  variants,
  keyIndex,
  child = false,
  ...props
}: IProps) => {
  const { isMobile } = useIsMobile();

  let animations;
  // when settings are overridden (we want animations to be applied on all screens)
  if (animateOnAllScreens) {
    animations = variants;
    // when user is on mobile
  } else if (isMobile) {
    animations = {};
    // when user is not on mobile
  } else if (!isMobile) {
    animations = variants;
  }

  return (
    <motion.div
      key={keyIndex}
      initial={child ? undefined : "initial"}
      animate={child ? undefined : "animate"}
      exit={child ? undefined : "exit"}
      whileHover={child ? undefined : "whileHover"}
      whileTap={child ? undefined : "whileTap"}
      variants={child ? variants : animations}
      {...props}
    >
      {children}
    </motion.div>
  );
};
