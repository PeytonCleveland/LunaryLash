import { FC } from "react";

interface AccordionProps {
  children: React.ReactNode;
}

const Accordion: FC<AccordionProps> = ({ children, ...props }) => {
  return (
    <div className="w-full" {...props}>
      {children}
    </div>
  );
};

export default Accordion;
