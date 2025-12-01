import React from 'react';
import clsx from 'clsx';
import {
  User,
  ShoppingCart,
  Headphones,
  Megaphone,
  Phone,
  MapPin,
  Activity,
  AlertTriangle,
  Target,
  Search,
} from 'lucide-react';

export type ViewType =
  | 'profile'
  | 'orders'
  | 'cs'
  | 'marketing'
  | 'cti'
  | 'visits'
  | 'interactions'
  | 'churn'
  | 'recommendations';

interface MenuItem {
  key: ViewType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  onSearch?: (query: string) => void;
}

const menuItems: MenuItem[] = [
  {
    key: 'profile',
    label: 'Profile',
    icon: User,
    description: '고객 기본정보',
  },
  {
    key: 'orders',
    label: 'Purchases / Orders',
    icon: ShoppingCart,
    description: '구매/주문 이력',
  },
  {
    key: 'cs',
    label: 'Service / CS',
    icon: Headphones,
    description: 'VOC 및 상담',
  },
  {
    key: 'marketing',
    label: 'Marketing Touchpoints',
    icon: Megaphone,
    description: '마케팅 접점',
  },
  {
    key: 'cti',
    label: 'CallSync (CTI)',
    icon: Phone,
    description: '통화 이력',
  },
  {
    key: 'visits',
    label: 'Visits / Branch',
    icon: MapPin,
    description: '방문 기록',
  },
  {
    key: 'interactions',
    label: 'Channel Interactions',
    icon: Activity,
    description: '채널 행동',
  },
  {
    key: 'churn',
    label: 'Churn / Risk',
    icon: AlertTriangle,
    description: '이탈 위험',
  },
  {
    key: 'recommendations',
    label: 'Recommendations (NBA)',
    icon: Target,
    description: '추천 액션',
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onViewChange,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full aside-lnb">
      {/* 검색 */}
      <div className="p-4 border-b border-gray-200">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="고객 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </form>
      </div>

      {/* 메뉴 */}
      <nav className="flex-1 overflow-y-auto p-3 scrollbar-thin">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.key;

            return (
              <button
                key={item.key}
                onClick={() => onViewChange(item.key)}
                className={clsx(
                  'w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-all',
                  isActive
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                <Icon
                  className={clsx(
                    'w-5 h-5 flex-shrink-0 mt-0.5',
                    isActive ? 'text-primary-600' : 'text-gray-400'
                  )}
                />
                <div className="flex-1 min-w-0">
                  <div className={clsx('text-sm', isActive && 'font-semibold')}>
                    {item.label}
                  </div>
                  {item.description && (
                    <div className="text-xs text-gray-500 mt-0.5">
                      {item.description}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      {/* 하단 정보 */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-500 text-center">
          CRM 360° v1.0
        </p>
      </div>
    </div>
  );
};

