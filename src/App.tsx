import { useState } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { ViewType } from './components/layout/Sidebar';

// Views
import { ProfileView } from './components/views/ProfileView';
import { OrdersView } from './components/views/OrdersView';
import { CSView } from './components/views/CSView';
import { MarketingView } from './components/views/MarketingView';
import { CTIView } from './components/views/CTIView';
import { VisitsView } from './components/views/VisitsView';
import { InteractionsView } from './components/views/InteractionsView';
import { ChurnView } from './components/views/ChurnView';
import { RecommendationsView } from './components/views/RecommendationsView';

// Modals
import { SendMessageModal } from './components/modals/SendMessageModal';
import { IssueCouponModal } from './components/modals/IssueCouponModal';
import { AwardPointsModal } from './components/modals/AwardPointsModal';
import { AddToCampaignModal } from './components/modals/AddToCampaignModal';
import { EditProfileModal } from './components/modals/EditProfileModal';
import { OrderDetailModal } from './components/modals/OrderDetailModal';
import { NewVOCModal } from './components/modals/NewVOCModal';
import { EnterNoteModal } from './components/modals/EnterNoteModal';

// Data
import {
  mockCustomer,
  mockOrders,
  mockVOCs,
  mockTouchpoints,
  mockCallRecords,
  mockVisits,
  mockChannelEvents,
  mockChurnRisk,
  mockRecommendations,
  mockCampaigns,
  mockTemplates,
  mockSenders,
} from './data/mockData';

import { Order, VOC, MarketingTouchpoint, CallRecord, Visit, ChannelEvent, Recommendation } from './types/customer';

function App() {
  const [activeView, setActiveView] = useState<ViewType>('profile');
  
  // Modal states
  const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState(false);
  const [isIssueCouponModalOpen, setIsIssueCouponModalOpen] = useState(false);
  const [isAwardPointsModalOpen, setIsAwardPointsModalOpen] = useState(false);
  const [isAddToCampaignModalOpen, setIsAddToCampaignModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(false);
  const [isNewVOCModalOpen, setIsNewVOCModalOpen] = useState(false);
  const [isEnterNoteModalOpen, setIsEnterNoteModalOpen] = useState(false);

  // Selected data for modals
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Event handlers
  const handleSendMessage = () => {
    setIsSendMessageModalOpen(true);
  };

  const handleCall = () => {
    alert('CTI 연동 - 전화 연결 기능');
  };

  const handleAddToCampaign = () => {
    setIsAddToCampaignModalOpen(true);
  };

  const handleIssueCoupon = () => {
    setIsIssueCouponModalOpen(true);
  };

  const handleAwardPoints = () => {
    setIsAwardPointsModalOpen(true);
  };

  const handleEnterNote = () => {
    setIsEnterNoteModalOpen(true);
  };

  const handleAddRecord = () => {
    alert('활동 기록 등록 기능');
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailModalOpen(true);
  };

  const handleNewVOC = () => {
    setIsNewVOCModalOpen(true);
  };

  const handleVOCClick = (voc: VOC) => {
    alert(`VOC 상세: ${voc.title}`);
  };

  const handleCampaignClick = (touchpoint: MarketingTouchpoint) => {
    alert(`캠페인 상세: ${touchpoint.campaignName}`);
  };

  const handleCallScript = () => {
    alert('상담 스크립트 열기');
  };

  const handlePlayRecording = (call: CallRecord) => {
    alert(`녹취 재생: ${call.callId}`);
  };

  const handleVisitClick = (visit: Visit) => {
    alert(`방문 상세: ${visit.storeName}`);
  };

  const handleEventClick = (event: ChannelEvent) => {
    alert(`이벤트 상세: ${event.eventType}`);
  };

  const handleRiskDriverClick = (driver: any) => {
    alert(`위험 요인 상세: ${driver.factor}`);
  };

  const handleExecuteAction = (recommendation: Recommendation) => {
    alert(`액션 실행: ${recommendation.title}`);
  };

  const handleEditProfile = () => {
    setIsEditProfileModalOpen(true);
  };

  // Render content based on active view
  const renderContent = () => {
    switch (activeView) {
      case 'profile':
        return <ProfileView customer={mockCustomer} onEdit={handleEditProfile} />;
      case 'orders':
        return <OrdersView orders={mockOrders} onOrderClick={handleOrderClick} />;
      case 'cs':
        return (
          <CSView vocs={mockVOCs} onNewVOC={handleNewVOC} onVOCClick={handleVOCClick} />
        );
      case 'marketing':
        return (
          <MarketingView
            touchpoints={mockTouchpoints}
            onCampaignClick={handleCampaignClick}
          />
        );
      case 'cti':
        return (
          <CTIView
            calls={mockCallRecords}
            onCallScript={handleCallScript}
            onPlayRecording={handlePlayRecording}
          />
        );
      case 'visits':
        return <VisitsView visits={mockVisits} onVisitClick={handleVisitClick} />;
      case 'interactions':
        return (
          <InteractionsView events={mockChannelEvents} onEventClick={handleEventClick} />
        );
      case 'churn':
        return (
          <ChurnView churnRisk={mockChurnRisk} onRiskDriverClick={handleRiskDriverClick} />
        );
      case 'recommendations':
        return (
          <RecommendationsView
            recommendations={mockRecommendations}
            onExecuteAction={handleExecuteAction}
          />
        );
      default:
        return <ProfileView customer={mockCustomer} onEdit={handleEditProfile} />;
    }
  };

  return (
    <>
      <MainLayout
        customer={mockCustomer}
        activeView={activeView}
        onViewChange={setActiveView}
        onSendMessage={handleSendMessage}
        onCall={handleCall}
        onAddToCampaign={handleAddToCampaign}
        onIssueCoupon={handleIssueCoupon}
        onAwardPoints={handleAwardPoints}
        onEnterNote={handleEnterNote}
        onAddRecord={handleAddRecord}
      >
        {renderContent()}
      </MainLayout>

      {/* Modals */}
      <SendMessageModal
        isOpen={isSendMessageModalOpen}
        onClose={() => setIsSendMessageModalOpen(false)}
        customer={mockCustomer}
        templates={mockTemplates}
        senders={mockSenders}
        onSend={(data) => {
          console.log('Send message:', data);
          alert('메시지가 발송되었습니다!');
        }}
      />

      <IssueCouponModal
        isOpen={isIssueCouponModalOpen}
        onClose={() => setIsIssueCouponModalOpen(false)}
        customer={mockCustomer}
        onIssue={(data) => {
          console.log('Issue coupon:', data);
          alert('쿠폰이 발급되었습니다!');
        }}
      />

      <AwardPointsModal
        isOpen={isAwardPointsModalOpen}
        onClose={() => setIsAwardPointsModalOpen(false)}
        customer={mockCustomer}
        onAward={(data) => {
          console.log('Award points:', data);
          alert(`${data.points}P가 지급되었습니다!`);
        }}
      />

      <AddToCampaignModal
        isOpen={isAddToCampaignModalOpen}
        onClose={() => setIsAddToCampaignModalOpen(false)}
        customer={mockCustomer}
        campaigns={mockCampaigns}
        onAdd={(data) => {
          console.log('Add to campaign:', data);
          alert('캠페인에 등록되었습니다!');
        }}
      />

      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        customer={mockCustomer}
        onSave={(data) => {
          console.log('Save profile:', data);
          alert('프로필이 수정되었습니다!');
        }}
      />

      {selectedOrder && (
        <OrderDetailModal
          isOpen={isOrderDetailModalOpen}
          onClose={() => {
            setIsOrderDetailModalOpen(false);
            setSelectedOrder(null);
          }}
          order={selectedOrder}
        />
      )}

      <NewVOCModal
        isOpen={isNewVOCModalOpen}
        onClose={() => setIsNewVOCModalOpen(false)}
        customer={mockCustomer}
        onSubmit={(data) => {
          console.log('New VOC:', data);
          alert('VOC가 등록되었습니다!');
        }}
      />

      <EnterNoteModal
        isOpen={isEnterNoteModalOpen}
        onClose={() => setIsEnterNoteModalOpen(false)}
        customer={mockCustomer}
        onSave={(data) => {
          console.log('Save note:', data);
          alert('메모가 저장되었습니다!');
        }}
      />
    </>
  );
}

export default App;

