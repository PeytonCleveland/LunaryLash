import { ReactNode, FC, useState } from "react";

interface AccordionItemProps {
  title: string;
  subtitle: string;
}

const AccordionItem: FC<AccordionItemProps> = ({
  title,
  subtitle,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="w-full flex flex-col gap-1 py-5 border-t border-white"
      {...props}
    >
      <button
        className="flex text-sm text-white justify-between items-center font-primary text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        )}
      </button>
      <div className={isOpen ? "block text-gray-200 font-light" : "hidden"}>
        {subtitle}
      </div>
    </div>
  );
};

export default AccordionItem;
