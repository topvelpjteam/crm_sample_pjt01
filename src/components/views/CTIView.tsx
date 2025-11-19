import React from 'react';
import { Phone, PhoneIncoming, PhoneOutgoing, Clock, Play } from 'lucide-react';
import { CallRecord } from '../../types/customer';
import { Card } from '../ui/Card';
import { KPICard } from '../ui/KPICard';
import { Table } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Timeline, TimelineItem } from '../ui/Timeline';

interface CTIViewProps {
  calls: CallRecord[];
  onCallScript: () => void;
  onPlayRecording: (call: CallRecord) => void;
}

export const CTIView: React.FC<CTIViewProps> = ({ calls, onCallScript, onPlayRecording }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '-';
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getDirectionIcon = (direction: CallRecord['direction']) => {
    return direction === 'Inbound' ? (
      <PhoneIncoming className="w-4 h-4 text-blue-500" />
    ) : (
      <PhoneOutgoing className="w-4 h-4 text-green-500" />
    );
  };

  const getStatusBadgeVariant = (status: CallRecord['status']) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Missed':
        return 'danger';
      case 'Busy':
      case 'Failed':
        return 'warning';
      default:
        return 'gray';
    }
  };

  const getStatusLabel = (status: CallRecord['status']) => {
    const labels: Record<CallRecord['status'], string> = {
      Completed: '완료',
      Missed: '부재중',
      Busy: '통화중',
      Failed: '실패',
    };
    return labels[status];
  };

  // 통계 계산
  const totalCalls = calls.length;
  const inboundCalls = calls.filter((c) => c.direction === 'Inbound').length;
  const outboundCalls = calls.filter((c) => c.direction === 'Outbound').length;
  const completedCalls = calls.filter((c) => c.status === 'Completed').length;
  const totalDuration = calls.reduce((sum, c) => sum + (c.duration || 0), 0);
  const avgDuration = completedCalls > 0 ? totalDuration / completedCalls : 0;

  const columns = [
    {
      key: 'direction',
      title: '방향',
      width: '80px',
      align: 'center' as const,
      render: (value: CallRecord['direction']) => getDirectionIcon(value),
    },
    {
      key: 'startTime',
      title: '통화일시',
      width: '120px',
      render: (value: string) => formatDate(value),
    },
    {
      key: 'phoneNumber',
      title: '전화번호',
      width: '130px',
      render: (value: string) => (
        <span className="font-mono text-sm">{value}</span>
      ),
    },
    {
      key: 'agent',
      title: '상담원',
      width: '100px',
    },
    {
      key: 'category',
      title: '상담 유형',
      width: '120px',
      render: (value?: string) => value || '-',
    },
    {
      key: 'duration',
      title: '통화시간',
      width: '100px',
      render: (value?: number) => formatDuration(value),
    },
    {
      key: 'status',
      title: '상태',
      width: '100px',
      align: 'center' as const,
      render: (value: CallRecord['status']) => (
        <Badge variant={getStatusBadgeVariant(value)}>{getStatusLabel(value)}</Badge>
      ),
    },
    {
      key: 'recordingUrl',
      title: '녹취',
      width: '80px',
      align: 'center' as const,
      render: (value: string | undefined, record: CallRecord) =>
        value && record.status === 'Completed' ? (
          <Button
            variant="ghost"
            size="sm"
            icon={Play}
            onClick={(e) => {
              e.stopPropagation();
              onPlayRecording(record);
            }}
          />
        ) : (
          <span className="text-gray-300">-</span>
        ),
    },
  ];

  // Timeline 데이터
  const timelineItems: TimelineItem[] = calls.slice(0, 10).map((call) => ({
    id: call.id,
    timestamp: formatDate(call.startTime),
    title: `${call.direction === 'Inbound' ? '수신' : '발신'} - ${call.agent}`,
    description: `${call.category || '일반 상담'} (${formatDuration(call.duration)})`,
    icon: call.direction === 'Inbound' ? PhoneIncoming : PhoneOutgoing,
    iconColor: call.status === 'Completed' ? 'green' : 'gray',
    action: <Badge variant={getStatusBadgeVariant(call.status)}>{getStatusLabel(call.status)}</Badge>,
  }));

  return (
    <div className="space-y-6">
      {/* KPI 카드들 */}
      <div className="grid grid-cols-4 gap-6">
        <KPICard
          title="총 통화 건수"
          value={`${totalCalls}건`}
          icon={Phone}
          color="blue"
        />
        <KPICard
          title="수신 통화"
          value={`${inboundCalls}건`}
          icon={PhoneIncoming}
          color="green"
        />
        <KPICard
          title="발신 통화"
          value={`${outboundCalls}건`}
          icon={PhoneOutgoing}
          color="purple"
        />
        <KPICard
          title="평균 통화시간"
          value={formatDuration(Math.round(avgDuration))}
          icon={Clock}
          color="yellow"
        />
      </div>

      {/* 상담 스크립트 */}
      <Card title="상담 지원">
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
          <div>
            <p className="font-medium text-blue-900">상담 스크립트 가이드</p>
            <p className="text-sm text-blue-700 mt-1">고객 유형별 맞춤 상담 가이드를 확인하세요</p>
          </div>
          <Button variant="primary" onClick={onCallScript}>
            스크립트 보기
          </Button>
        </div>
      </Card>

      {/* 통화 이력 테이블 */}
      <Card
        title="통화 이력"
        subtitle={`총 ${totalCalls}건`}
      >
        <Table
          columns={columns}
          data={calls}
          emptyText="통화 이력이 없습니다."
        />
      </Card>

      {/* 통화 타임라인 */}
      <Card title="최근 통화 타임라인">
        {timelineItems.length > 0 ? (
          <Timeline items={timelineItems} />
        ) : (
          <p className="text-center py-8 text-gray-500">통화 이력이 없습니다.</p>
        )}
      </Card>

      {/* 상담 유형별 통계 */}
      <div className="grid grid-cols-2 gap-6">
        <Card title="상담 유형별 분포">
          <div className="space-y-3">
            {Array.from(new Set(calls.map((c) => c.category).filter(Boolean))).map((category) => {
              const categoryCalls = calls.filter((c) => c.category === category);
              const percentage = totalCalls > 0 ? (categoryCalls.length / totalCalls) * 100 : 0;

              return (
                <div key={category}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">{category}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {categoryCalls.length}건 ({percentage.toFixed(0)}%)
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

        <Card title="상담원별 통화 건수">
          <div className="space-y-2">
            {Array.from(new Set(calls.map((c) => c.agent))).map((agent) => {
              const agentCalls = calls.filter((c) => c.agent === agent);
              const agentCompleted = agentCalls.filter((c) => c.status === 'Completed').length;

              return (
                <div key={agent} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-900 font-medium">{agent}</span>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{agentCalls.length}건</p>
                    <p className="text-xs text-gray-500">완료 {agentCompleted}건</p>
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

