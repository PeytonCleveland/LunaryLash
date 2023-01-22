import React, { useState, Children, FC, useEffect } from "react";

interface TabsProps {
  initialTab?: number;
  children: React.ReactNode;
  onChange: (index: number) => void;
  changeTab: number | null;
}

const Tabs: FC<TabsProps> = ({
  children,
  onChange,
  changeTab,
  initialTab = 0,
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
    onChange(index);
  };

  useEffect(() => {
    if (changeTab !== null) {
      if (changeTab === 1) {
        setActiveTab(activeTab + 1);
        onChange(activeTab + 1);
      } else {
        setActiveTab(activeTab - 1);
        onChange(activeTab - 1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeTab]);

  return (
    <div className="flex gap-3 w-full">
      {Children.map(children, (child, index) =>
        React.cloneElement(child as React.ReactElement, {
          index,
          activeIndex: activeTab,
          onClick: handleTabClick,
        })
      )}
    </div>
  );
};

export default Tabs;
