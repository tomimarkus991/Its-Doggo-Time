import clsx from "clsx";

interface Props {
  tooltip: string;
}

export const SidebarTooltip = ({ tooltip }: Props) => {
  return (
    <span
      id="tooltip"
      className={clsx(
        "absolute left-[5.5rem] z-[997] p-2 text-sm font-bold text-white",
        "origin-left scale-0 rounded-md bg-gray-800 shadow-md transition-all duration-200",
        "lowercase tracking-wider group-hover:scale-100"
      )}
    >
      {tooltip}
    </span>
  );
};
