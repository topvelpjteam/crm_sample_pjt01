import React from 'react';
import { Smartphone, Monitor, Activity, MousePointer, ShoppingCart, Eye } from 'lucide-react';
import { ChannelEvent } from '../../types/customer';
import { Card } from '../ui/Card';
import { KPICard } from '../ui/KPICard';
import { Table } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { Timeline, TimelineItem } from '../ui/Timeline';

interface InteractionsViewProps {
  events: ChannelEvent[];
  onEventClick: (event: ChannelEvent) => void;
}

export const InteractionsView: React.FC<InteractionsViewProps> = ({ events, onEventClick }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getChannelBadgeVariant = (channel: ChannelEvent['channel']) => {
    switch (channel) {
      case 'App':
        return 'primary';
      case 'Web':
        return 'success';
      case 'Mobile Web':
        return 'warning';
      default:
        return 'gray';
    }
  };

  const getDeviceIcon = (device: ChannelEvent['device']) => {
    switch (device) {
      case 'Mobile':
      case 'Tablet':
        return <Smartphone className="w-4 h-4" />;
      case 'PC':
        return <Monitor className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getEventTypeIcon = (eventType: string) => {
    if (eventType.includes('VIEW') || eventType.includes('PAGE')) {
      return Eye;
    } else if (eventType.includes('CLICK')) {
      return MousePointer;
    } else if (eventType.includes('CART')) {
      return ShoppingCart;
    }
    return Activity;
  };

  // 통계 계산
  const totalEvents = events.length;
  const pageViews = events.filter((e) => e.eventType.includes('VIEW') || e.eventType.includes('PAGE')).length;
  const clicks = events.filter((e) => e.eventType.includes('CLICK')).length;
  const cartActions = events.filter((e) => e.eventType.includes('CART')).length;

  const mobileEvents = events.filter((e) => e.device === 'Mobile' || e.device === 'Tablet').length;
  const pcEvents = events.filter((e) => e.device === 'PC').length;

  const columns = [
    {
      key: 'eventTime',
      title: '발생시각',
      width: '110px',
      render: (value: string) => (
        <span className="text-sm text-gray-600">{formatDate(value)}</span>
      ),
    },
    {
      key: 'eventType',
      title: '이벤트 유형',
      width: '150px',
      render: (value: string) => (
        <span className="text-sm font-medium text-gray-900">{value}</span>
      ),
    },
    {
      key: 'channel',
      title: '채널',
      width: '110px',
      render: (value: ChannelEvent['channel']) => (
        <Badge variant={getChannelBadgeVariant(value)}>{value}</Badge>
      ),
    },
    {
      key: 'device',
      title: '디바이스',
      width: '90px',
      render: (value: ChannelEvent['device']) => (
        <div className="flex items-center gap-2">
          {getDeviceIcon(value)}
          <span className="text-sm text-gray-700">{value}</span>
        </div>
      ),
    },
    {
      key: 'screenName',
      title: '화면/URL',
      render: (value?: string, record?: ChannelEvent) => (
        <span className="text-sm text-gray-600 truncate">{value || record?.url || '-'}</span>
      ),
    },
  ];

  // Funnel 데이터
  const funnelSteps = [
    { name: '메인 방문', count: events.filter((e) => e.screenName?.includes('메인') || e.url?.includes('main')).length },
    { name: '상품 조회', count: events.filter((e) => e.eventType.includes('PRODUCT') || e.eventType.includes('VIEW')).length },
    { name: '장바구니 추가', count: events.filter((e) => e.eventType.includes('ADD_TO_CART')).length },
    { name: '결제 시작', count: events.filter((e) => e.eventType.includes('CHECKOUT') || e.eventType.includes('PAYMENT')).length },
    { name: '구매 완료', count: events.filter((e) => e.eventType.includes('PURCHASE')).length },
  ];

  const maxFunnelCount = Math.max(...funnelSteps.map((s) => s.count), 1);

  // Timeline 데이터
  const timelineItems: TimelineItem[] = events.slice(0, 20).map((event) => {
    const Icon = getEventTypeIcon(event.eventType);
    return {
      id: event.id,
      timestamp: formatDate(event.eventTime),
      title: event.eventType,
      description: `${event.channel} - ${event.device} ${event.screenName ? `- ${event.screenName}` : ''}`,
      icon: Icon,
      iconColor: 'blue',
    };
  });

  return (
    <div className="space-y-6">
      {/* KPI 카드들 */}
      <div className="grid grid-cols-4 gap-6">
        <KPICard
          title="총 이벤트"
          value={`${totalEvents}건`}
          icon={Activity}
          color="blue"
        />
        <KPICard
          title="페이지 조회"
          value={`${pageViews}회`}
          icon={Eye}
          color="green"
        />
        <KPICard
          title="클릭 이벤트"
          value={`${clicks}회`}
          icon={MousePointer}
          color="purple"
        />
        <KPICard
          title="장바구니 액션"
          value={`${cartActions}회`}
          icon={ShoppingCart}
          color="yellow"
        />
      </div>

      {/* 퍼널 분석 */}
      <Card title="구매 전환 퍼널" subtitle="고객 여정 단계별 현황">
        <div className="space-y-4">
          {funnelSteps.map((step, index) => {
            const percentage = maxFunnelCount > 0 ? (step.count / maxFunnelCount) * 100 : 0;
            const dropRate = index > 0 && funnelSteps[index - 1].count > 0
              ? ((funnelSteps[index - 1].count - step.count) / funnelSteps[index - 1].count) * 100
              : 0;

            return (
              <div key={step.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{step.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-900">{step.count}</span>
                    {index > 0 && dropRate > 0 && (
                      <span className="text-xs text-red-600 ml-2">
                        ↓ {dropRate.toFixed(0)}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 행동 로그 */}
      <Card
        title="행동 로그"
        subtitle={`총 ${totalEvents}건`}
      >
        <Table
          columns={columns}
          data={events}
          onRowClick={(event) => onEventClick(event)}
          emptyText="행동 이력이 없습니다."
        />
      </Card>

      {/* 행동 타임라인 */}
      <Card title="최근 행동 타임라인">
        {timelineItems.length > 0 ? (
          <Timeline items={timelineItems} />
        ) : (
          <p className="text-center py-8 text-gray-500">행동 이력이 없습니다.</p>
        )}
      </Card>

      {/* 채널 & 디바이스 분포 */}
      <div className="grid grid-cols-2 gap-6">
        <Card title="채널별 활동">
          <div className="space-y-3">
            {(['App', 'Web', 'Mobile Web'] as ChannelEvent['channel'][]).map((channel) => {
              const channelEvents = events.filter((e) => e.channel === channel);
              const percentage = totalEvents > 0 ? (channelEvents.length / totalEvents) * 100 : 0;

              return (
                <div key={channel}>
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant={getChannelBadgeVariant(channel)}>{channel}</Badge>
                    <span className="text-sm font-medium text-gray-900">
                      {channelEvents.length}건 ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="디바이스별 활동">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Smartphone className="w-6 h-6 text-blue-600" />
                <span className="font-medium text-gray-900">모바일</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{mobileEvents}건</p>
                <p className="text-xs text-gray-500">
                  {((mobileEvents / totalEvents) * 100).toFixed(0)}%
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Monitor className="w-6 h-6 text-green-600" />
                <span className="font-medium text-gray-900">PC</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{pcEvents}건</p>
                <p className="text-xs text-gray-500">
                  {((pcEvents / totalEvents) * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

