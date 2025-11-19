import React from 'react';
import clsx from 'clsx';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon?: React.ComponentType<{ className?: string }>;
  trend?: {
    value: number;
    label: string;
  };
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray';
  className?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color = 'blue',
  className,
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600',
    gray: 'bg-gray-50 text-gray-600',
  };

  const TrendIcon = trend && trend.value >= 0 ? TrendingUp : TrendingDown;
  const trendColor = trend && trend.value >= 0 ? 'text-green-600' : 'text-red-600';

  return (
    <div className={clsx('kpi-card', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className={clsx('flex items-center gap-1 mt-2 text-sm', trendColor)}>
              <TrendIcon className="w-4 h-4" />
              <span className="font-medium">{Math.abs(trend.value)}%</span>
              <span className="text-gray-500">{trend.label}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={clsx('p-3 rounded-lg', colorClasses[color])}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};

