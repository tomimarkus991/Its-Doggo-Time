import { HiChartBar, HiHome } from "react-icons/all";
import { Link } from "react-router-dom";

import { animations, AnimationWrapper } from "components";

export const NavbarBottom = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 my-2 mx-auto h-fit w-[95%] rounded-md bg-slate-50 py-2 shadow-2xl">
      <div className="flex w-full flex-row justify-around">
        <Link to="/">
          <AnimationWrapper
            variants={animations.smallScale}
            animateOnAllScreens
            keyIndex="nb-home-icon"
          >
            <HiHome className="h-14 w-14 cursor-pointer fill-slate-700 hover:fill-slate-800" />
          </AnimationWrapper>
        </Link>
        <Link to="/stats">
          <AnimationWrapper
            variants={animations.smallScale}
            animateOnAllScreens
            keyIndex="nb-chart-icon"
          >
            <HiChartBar className="h-14 w-14 cursor-pointer fill-slate-700 hover:fill-slate-800" />
          </AnimationWrapper>
        </Link>
      </div>
    </div>
  );
};
