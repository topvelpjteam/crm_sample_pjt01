import React from 'react';
import { CustomerHeader } from './CustomerHeader';
import { Sidebar, ViewType } from './Sidebar';
import { ActionPanel } from './ActionPanel';
import { Customer } from '../../types/customer';

interface MainLayoutProps {
  customer: Customer;
  children: React.ReactNode;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  onSendMessage: () => void;
  onCall: () => void;
  onAddToCampaign: () => void;
  onIssueCoupon: () => void;
  onAwardPoints: () => void;
  onEnterNote: () => void;
  onAddRecord: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  customer,
  children,
  activeView,
  onViewChange,
  onSendMessage,
  onCall,
  onAddToCampaign,
  onIssueCoupon,
  onAwardPoints,
  onEnterNote,
  onAddRecord,
}) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50 wrap-screen">
      {/* 글로벌 헤더 */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0 header">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center logo">
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              고객관리(주문/상담)
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">관리자</p>
              <p className="text-xs text-gray-500">admin@crm.com</p>
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-medium">A</span>
            </div>
          </div>
        </div>
      </header>

      {/* Customer Header */}
      <CustomerHeader
        customer={customer}
        onSendMessage={onSendMessage}
        onCall={onCall}
        onAddToCampaign={onAddToCampaign}
      />

      {/* 메인 콘텐츠 영역 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 좌측 사이드바 */}
        <Sidebar activeView={activeView} onViewChange={onViewChange} />

        {/* 중앙 콘텐츠 */}
        <main className="flex-1 overflow-auto p-6 scrollbar-thin">
          {children}
        </main>

        {/* 우측 액션 패널 */}
        <ActionPanel
          onSendMessage={onSendMessage}
          onIssueCoupon={onIssueCoupon}
          onAwardPoints={onAwardPoints}
          onAddToCampaign={onAddToCampaign}
          onEnterNote={onEnterNote}
          onAddRecord={onAddRecord}
        />
      </div>
    </div>
  );
};

