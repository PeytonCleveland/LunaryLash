import { FC } from "react";

interface TabProps {
  label: string;
  index?: number;
  activeIndex?: number;
  disabled?: boolean;
  onClick?: (index: any) => void;
}

const Tab: FC<TabProps> = ({
  label,
  index = 0,
  activeIndex = 0,
  disabled = false,
  onClick = () => {},
}) => {
  return (
    <button
      className={`flex flex-1 items-center justify-center border-b-4 py-2.5 font-primary text-sm ${
        index <= activeIndex
          ? "text-[#87CBAC] border-[#87CBAC]"
          : "text-gray-400 border-gray-400"
      }`}
      onClick={() => onClick(index)}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Tab;
