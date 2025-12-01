import React from 'react';
import { MapPin, Calendar, ShoppingBag } from 'lucide-react';
import { Visit } from '../../types/customer';
import { Card } from '../ui/Card';
import { KPICard } from '../ui/KPICard';
import { Table } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { Timeline, TimelineItem } from '../ui/Timeline';

interface VisitsViewProps {
  visits: Visit[];
  onVisitClick: (visit: Visit) => void;
}

export const VisitsView: React.FC<VisitsViewProps> = ({ visits, onVisitClick }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 통계 계산
  const totalVisits = visits.length;
  const storesVisited = new Set(visits.map((v) => v.storeId)).size;
  const visitsWithPurchase = visits.filter((v) => v.relatedOrders && v.relatedOrders.length > 0).length;
  const conversionRate = totalVisits > 0 ? (visitsWithPurchase / totalVisits) * 100 : 0;

  const columns = [
    {
      key: 'visitDate',
      title: '방문일시',
      width: '150px',
      render: (value: string) => formatDate(value),
    },
    {
      key: 'storeName',
      title: '매장/지점',
      render: (value: string, record: Visit) => (
        <div>
          <p className="text-sm font-medium text-gray-900">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{record.storeId}</p>
        </div>
      ),
    },
    {
      key: 'purpose',
      title: '방문 목적',
      width: '150px',
    },
    {
      key: 'agent',
      title: '담당자',
      width: '120px',
      render: (value?: string) => value || '-',
    },
    {
      key: 'relatedOrders',
      title: '연계 주문',
      width: '100px',
      align: 'center' as const,
      render: (value?: string[]) =>
        value && value.length > 0 ? (
          <Badge variant="success">{value.length}건</Badge>
        ) : (
          <span className="text-gray-300">-</span>
        ),
    },
  ];

  // Timeline 데이터
  const timelineItems: TimelineItem[] = visits.map((visit) => ({
    id: visit.id,
    timestamp: formatDate(visit.visitDate),
    title: visit.storeName,
    description: `${visit.purpose}${visit.agent ? ` - ${visit.agent}` : ''}${
      visit.relatedOrders && visit.relatedOrders.length > 0 ? ` (구매 ${visit.relatedOrders.length}건)` : ''
    }`,
    icon: MapPin,
    iconColor: visit.relatedOrders && visit.relatedOrders.length > 0 ? 'green' : 'blue',
  }));

  return (
    <div className="space-y-6">
      {/* KPI 카드들 */}
      <div className="grid grid-cols-4 gap-6">
        <KPICard
          title="총 방문 횟수"
          value={`${totalVisits}회`}
          icon={MapPin}
          color="blue"
        />
        <KPICard
          title="방문 매장 수"
          value={`${storesVisited}개`}
          icon={ShoppingBag}
          color="green"
        />
        <KPICard
          title="구매 연계"
          value={`${visitsWithPurchase}건`}
          icon={ShoppingBag}
          color="purple"
        />
        <KPICard
          title="구매 전환율"
          value={`${conversionRate.toFixed(0)}%`}
          icon={Calendar}
          color="yellow"
        />
      </div>

      {/* 방문 이력 테이블 */}
      <Card
        title="방문 이력"
        subtitle={`총 ${totalVisits}회`}
      >
        <Table
          columns={columns}
          data={visits}
          onRowClick={(visit) => onVisitClick(visit)}
          emptyText="방문 이력이 없습니다."
        />
      </Card>

      {/* 방문 타임라인 */}
      <Card title="방문 타임라인">
        {timelineItems.length > 0 ? (
          <Timeline items={timelineItems} />
        ) : (
          <p className="text-center py-8 text-gray-500">방문 이력이 없습니다.</p>
        )}
      </Card>

      {/* 매장별 통계 */}
      <div className="grid grid-cols-2 gap-6">
        <Card title="매장별 방문 횟수">
          <div className="space-y-3">
            {Array.from(new Set(visits.map((v) => v.storeName))).map((storeName) => {
              const storeVisits = visits.filter((v) => v.storeName === storeName);
              const percentage = totalVisits > 0 ? (storeVisits.length / totalVisits) * 100 : 0;

              return (
                <div key={storeName}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">{storeName}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {storeVisits.length}회 ({percentage.toFixed(0)}%)
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

        <Card title="방문 목적별 분포">
          <div className="space-y-2">
            {Array.from(new Set(visits.map((v) => v.purpose))).map((purpose) => {
              const purposeVisits = visits.filter((v) => v.purpose === purpose);
              const purposeWithPurchase = purposeVisits.filter(
                (v) => v.relatedOrders && v.relatedOrders.length > 0
              ).length;

              return (
                <div key={purpose} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mt0">
                  <span className="text-sm text-gray-900 font-medium">{purpose}</span>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{purposeVisits.length}회</p>
                    <p className="text-xs text-gray-500">구매 {purposeWithPurchase}건</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

