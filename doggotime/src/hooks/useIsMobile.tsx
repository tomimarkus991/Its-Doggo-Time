import { useWindowWidth } from "@react-hook/window-size";
import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const width = useWindowWidth();

  const [isMobile, setIsMobile] = useState<boolean>(width >= 768 ? false : true);

  useEffect(() => {
    const checkIfUserIsOnMobile = () => {
      if (width >= 768) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    };

    checkIfUserIsOnMobile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return { isMobile };
};
