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
        "bg-gray-800 rounded-md shadow-md transition-all duration-200 scale-0 origin-left",
        "tracking-wider lowercase group-hover:scale-100"
      )}
    >
      {tooltip}
    </span>
  );
};
