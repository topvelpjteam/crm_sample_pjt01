import React from 'react';
import { Send, Eye, MousePointer, ShoppingCart, AlertTriangle } from 'lucide-react';
import { MarketingTouchpoint } from '../../types/customer';
import { Card } from '../ui/Card';
import { KPICard } from '../ui/KPICard';
import { Table } from '../ui/Table';
import { Badge } from '../ui/Badge';

interface MarketingViewProps {
  touchpoints: MarketingTouchpoint[];
  onCampaignClick: (touchpoint: MarketingTouchpoint) => void;
}

export const MarketingView: React.FC<MarketingViewProps> = ({
  touchpoints,
  onCampaignClick,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getChannelBadgeVariant = (channel: MarketingTouchpoint['channel']) => {
    switch (channel) {
      case 'SMS':
        return 'primary';
      case 'KAKAO':
        return 'warning';
      case 'PUSH':
        return 'success';
      case 'EMAIL':
        return 'gray';
      default:
        return 'gray';
    }
  };

  // 통계 계산
  const totalSent = touchpoints.length;
  const totalOpened = touchpoints.filter((t) => t.opened).length;
  const totalClicked = touchpoints.filter((t) => t.clicked).length;
  const totalConverted = touchpoints.filter((t) => t.converted).length;

  const openRate = totalSent > 0 ? (totalOpened / totalSent) * 100 : 0;
  const clickRate = totalSent > 0 ? (totalClicked / totalSent) * 100 : 0;
  const conversionRate = totalSent > 0 ? (totalConverted / totalSent) * 100 : 0;

  // 피로도 점수 계산 (최근 30일 발송 건수 기반)
  const recentTouchpoints = touchpoints.filter((t) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return new Date(t.sentAt) >= thirtyDaysAgo;
  });
  const fatigueScore = Math.min((recentTouchpoints.length / 20) * 100, 100);

  const columns = [
    {
      key: 'campaignName',
      title: '캠페인명',
      render: (value: string, record: MarketingTouchpoint) => (
        <div>
          <p className="text-sm font-medium text-gray-900">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{record.campaignId}</p>
        </div>
      ),
    },
    {
      key: 'channel',
      title: '채널',
      width: '100px',
      render: (value: MarketingTouchpoint['channel']) => (
        <Badge variant={getChannelBadgeVariant(value)}>{value}</Badge>
      ),
    },
    {
      key: 'sentAt',
      title: '발송일시',
      width: '140px',
      render: (value: string) => (
        <span className="text-sm text-gray-600">{formatDate(value)}</span>
      ),
    },
    {
      key: 'opened',
      title: '열람',
      width: '80px',
      align: 'center' as const,
      render: (value: boolean) => (
        value ? <Eye className="w-4 h-4 text-green-500 mx-auto" /> : <span className="text-gray-300">-</span>
      ),
    },
    {
      key: 'clicked',
      title: '클릭',
      width: '80px',
      align: 'center' as const,
      render: (value: boolean) => (
        value ? <MousePointer className="w-4 h-4 text-blue-500 mx-auto" /> : <span className="text-gray-300">-</span>
      ),
    },
    {
      key: 'converted',
      title: '전환',
      width: '80px',
      align: 'center' as const,
      render: (value: boolean) => (
        value ? <ShoppingCart className="w-4 h-4 text-purple-500 mx-auto" /> : <span className="text-gray-300">-</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI 카드들 */}
      <div className="grid grid-cols-4 gap-6">
        <KPICard
          title="발송 건수"
          value={`${totalSent}건`}
          icon={Send}
          color="blue"
        />
        <KPICard
          title="열람률"
          value={`${openRate.toFixed(1)}%`}
          icon={Eye}
          color="green"
          trend={{ value: 5.2, label: '전월 대비' }}
        />
        <KPICard
          title="클릭률"
          value={`${clickRate.toFixed(1)}%`}
          icon={MousePointer}
          color="purple"
          trend={{ value: 3.1, label: '전월 대비' }}
        />
        <KPICard
          title="전환률"
          value={`${conversionRate.toFixed(1)}%`}
          icon={ShoppingCart}
          color="yellow"
          trend={{ value: 2.4, label: '전월 대비' }}
        />
      </div>

      {/* 피로도 점수 */}
      <Card title="마케팅 피로도 점수" subtitle="최근 30일 기준">
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">피로도 점수</span>
              <span className="text-2xl font-bold text-gray-900">
                {fatigueScore.toFixed(0)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all ${
                  fatigueScore >= 70
                    ? 'bg-red-500'
                    : fatigueScore >= 40
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${fatigueScore}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              최근 30일간 {recentTouchpoints.length}건의 메시지 발송
            </p>
          </div>
          <div className="flex-shrink-0">
            {fatigueScore >= 70 ? (
              <div className="flex flex-col items-center gap-2 p-4 bg-red-50 rounded-lg">
                <AlertTriangle className="w-8 h-8 text-red-500" />
                <span className="text-sm font-medium text-red-700">주의 필요</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-lg">
                <Eye className="w-8 h-8 text-green-500" />
                <span className="text-sm font-medium text-green-700">양호</span>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* 발송 로그 */}
      <Card
        title="마케팅 발송 로그"
        subtitle={`총 ${totalSent}건`}
      >
        <Table
          columns={columns}
          data={touchpoints}
          onRowClick={(touchpoint) => onCampaignClick(touchpoint)}
          emptyText="발송 이력이 없습니다."
        />
      </Card>

      {/* 채널별 성과 */}
      <Card title="채널별 성과">
        <div className="space-y-4">
          {(['SMS', 'KAKAO', 'PUSH', 'EMAIL'] as MarketingTouchpoint['channel'][]).map(
            (channel) => {
              const channelTouchpoints = touchpoints.filter((t) => t.channel === channel);
              const channelSent = channelTouchpoints.length;
              const channelOpened = channelTouchpoints.filter((t) => t.opened).length;
              const channelClicked = channelTouchpoints.filter((t) => t.clicked).length;
              const channelConverted = channelTouchpoints.filter((t) => t.converted).length;

              const channelOpenRate = channelSent > 0 ? (channelOpened / channelSent) * 100 : 0;
              const channelClickRate = channelSent > 0 ? (channelClicked / channelSent) * 100 : 0;
              const channelConversionRate =
                channelSent > 0 ? (channelConverted / channelSent) * 100 : 0;

              return (
                <div key={channel} className="p-4 bg-gray-50 rounded-lg mt0">
                  <div className="flex items-center justify-between mb-3 bbline">
                    <Badge variant={getChannelBadgeVariant(channel)} size="lg">
                      {channel}
                    </Badge>
                    <span className="text-sm text-gray-600">{channelSent}건 발송</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">열람률</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {channelOpenRate.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">클릭률</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {channelClickRate.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">전환률</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {channelConversionRate.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </Card>
    </div>
  );
};

