import { useState } from "react";

import { RealButton } from "..";

export const ColorModeButton = () => {
  const [isDark, setIsDark] = useState(false);
  const root = document.documentElement;
  const changeColorMode = () => {
    if (root.classList.contains("dark")) {
      setIsDark(false);
      root.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      setIsDark(true);
      root.classList.add("dark");
      localStorage.theme = "dark";
    }
  };
  return (
    <RealButton variant="dark" onClick={changeColorMode}>
      {isDark ? "Light" : "Dark"}
    </RealButton>
  );
};
