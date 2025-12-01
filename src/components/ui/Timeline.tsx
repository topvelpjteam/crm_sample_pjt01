import React from 'react';
import clsx from 'clsx';

export interface TimelineItem {
  id: string;
  timestamp: string;
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  iconColor?: 'blue' | 'green' | 'yellow' | 'red' | 'gray';
  action?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, className }) => {
  const iconColorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600',
    gray: 'bg-gray-100 text-gray-600',
  };

  return (
    <div className={clsx('space-y-4', className)}>
      {items.map((item, index) => {
        const Icon = item.icon;
        const isLast = index === items.length - 1;

        return (
          <div key={item.id} className="relative flex gap-4 mt0">
            {/* Timeline line */}
            {!isLast && (
              <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200" />
            )}

            {/* Icon */}
            <div
              className={clsx(
                'flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center z-10',
                item.iconColor ? iconColorClasses[item.iconColor] : iconColorClasses.gray
              )}
            >
              {Icon ? <Icon className="w-5 h-5" /> : null}
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">{item.timestamp}</p>
                  <h4 className="text-base font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-sm text-gray-600">{item.description}</p>
                  )}
                </div>
                {item.action && <div className="flex-shrink-0">{item.action}</div>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

