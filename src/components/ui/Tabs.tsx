import React, { useState } from 'react';
import clsx from 'clsx';

interface Tab {
  key: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultActiveKey,
  onChange,
  className,
}) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey || tabs[0]?.key);

  const handleTabChange = (key: string) => {
    setActiveKey(key);
    onChange?.(key);
  };

  const activeTab = tabs.find((tab) => tab.key === activeKey);

  return (
    <div className={className}>
      {/* Tab Headers */}
      <div className="flex items-center gap-1 border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={clsx(
              'tab',
              activeKey === tab.key && 'tab-active'
            )}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>{activeTab?.content}</div>
    </div>
  );
};

