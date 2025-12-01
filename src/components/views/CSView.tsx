import React from 'react';
import { MessageCircle, AlertCircle, CheckCircle, Clock, Plus } from 'lucide-react';
import { VOC } from '../../types/customer';
import { Card } from '../ui/Card';
import { KPICard } from '../ui/KPICard';
import { Table } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Timeline, TimelineItem } from '../ui/Timeline';

interface CSViewProps {
  vocs: VOC[];
  onNewVOC: () => void;
  onVOCClick: (voc: VOC) => void;
}

export const CSView: React.FC<CSViewProps> = ({ vocs, onNewVOC, onVOCClick }) => {
  const getTypeBadgeVariant = (type: VOC['type']) => {
    switch (type) {
      case 'Complaint':
        return 'danger';
      case 'Inquiry':
        return 'primary';
      case 'Compliment':
        return 'success';
      case 'Suggestion':
        return 'warning';
      default:
        return 'gray';
    }
  };

  const getTypeLabel = (type: VOC['type']) => {
    const labels: Record<VOC['type'], string> = {
      Complaint: '불만',
      Inquiry: '문의',
      Compliment: '칭찬',
      Suggestion: '제안',
    };
    return labels[type];
  };

  const getStatusBadgeVariant = (status: VOC['status']) => {
    switch (status) {
      case 'Open':
        return 'danger';
      case 'In Progress':
        return 'warning';
      case 'Resolved':
        return 'success';
      case 'Closed':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const getStatusLabel = (status: VOC['status']) => {
    const labels: Record<VOC['status'], string> = {
      'Open': '미처리',
      'In Progress': '처리중',
      'Resolved': '해결됨',
      'Closed': '종료',
    };
    return labels[status];
  };

  const getPriorityIcon = (priority: VOC['priority']) => {
    switch (priority) {
      case 'High':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'Medium':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Low':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  // 통계 계산
  const totalVOC = vocs.length;
  const openVOC = vocs.filter((v) => v.status === 'Open').length;
  const inProgressVOC = vocs.filter((v) => v.status === 'In Progress').length;
  const resolvedVOC = vocs.filter((v) => v.status === 'Resolved' || v.status === 'Closed').length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const columns = [
    {
      key: 'priority',
      title: '우선순위',
      width: '100px',
      align: 'center' as const,
      render: (value: VOC['priority']) => getPriorityIcon(value),
    },
    {
      key: 'type',
      title: '유형',
      width: '100px',
      render: (value: VOC['type']) => (
        <Badge variant={getTypeBadgeVariant(value)}>{getTypeLabel(value)}</Badge>
      ),
    },
    {
      key: 'title',
      title: '제목',
      render: (value: string, record: VOC) => (
        <div>
          <p className="text-sm font-medium text-gray-900">{value}</p>
          <p className="text-xs text-gray-500 mt-1">채널: {record.channel}</p>
        </div>
      ),
    },
    {
      key: 'createdAt',
      title: '등록일시',
      width: '140px',
      render: (value: string) => (
        <span className="text-sm text-gray-600">{formatDate(value)}</span>
      ),
    },
    {
      key: 'assignee',
      title: '담당자',
      width: '100px',
      render: (value?: string) => (
        <span className="text-sm text-gray-900">{value || '-'}</span>
      ),
    },
    {
      key: 'status',
      title: '상태',
      width: '100px',
      align: 'center' as const,
      render: (value: VOC['status']) => (
        <Badge variant={getStatusBadgeVariant(value)}>{getStatusLabel(value)}</Badge>
      ),
    },
  ];

  // Timeline 데이터 생성
  const timelineItems: TimelineItem[] = vocs.map((voc) => ({
    id: voc.id,
    timestamp: formatDate(voc.createdAt),
    title: voc.title,
    description: `[${getTypeLabel(voc.type)}] ${voc.channel} - ${voc.assignee || '미배정'}`,
    icon: MessageCircle,
    iconColor:
      voc.status === 'Resolved' || voc.status === 'Closed'
        ? 'green'
        : voc.status === 'In Progress'
        ? 'yellow'
        : 'red',
    action: (
      <Badge variant={getStatusBadgeVariant(voc.status)}>{getStatusLabel(voc.status)}</Badge>
    ),
  }));

  return (
    <div className="space-y-6">
      {/* KPI 카드들 */}
      <div className="grid grid-cols-4 gap-6">
        <KPICard
          title="전체 VOC"
          value={`${totalVOC}건`}
          icon={MessageCircle}
          color="blue"
        />
        <KPICard
          title="미처리"
          value={`${openVOC}건`}
          icon={AlertCircle}
          color="red"
        />
        <KPICard
          title="처리중"
          value={`${inProgressVOC}건`}
          icon={Clock}
          color="yellow"
        />
        <KPICard
          title="해결완료"
          value={`${resolvedVOC}건`}
          icon={CheckCircle}
          color="green"
        />
      </div>

      {/* VOC 목록 테이블 */}
      <Card
        title="VOC 목록"
        subtitle={`총 ${totalVOC}건`}
        headerAction={
          <Button variant="primary" size="sm" icon={Plus} onClick={onNewVOC}>
            신규 VOC 등록
          </Button>
        }
      >
        <Table
          columns={columns}
          data={vocs}
          onRowClick={(voc) => onVOCClick(voc)}
          emptyText="VOC 이력이 없습니다."
        />
      </Card>

      {/* VOC 타임라인 */}
      <Card title="VOC 타임라인" subtitle="시간순 처리 현황">
        {timelineItems.length > 0 ? (
          <Timeline items={timelineItems} />
        ) : (
          <p className="text-center py-8 text-gray-500">VOC 이력이 없습니다.</p>
        )}
      </Card>

      {/* 통계 */}
      <div className="grid grid-cols-2 gap-6">
        <Card title="유형별 분포">
          <div className="space-y-3">
            {(['Complaint', 'Inquiry', 'Compliment', 'Suggestion'] as VOC['type'][]).map(
              (type) => {
                const typeVocs = vocs.filter((v) => v.type === type);
                const percentage = totalVOC > 0 ? (typeVocs.length / totalVOC) * 100 : 0;

                return (
                  <div key={type}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">{getTypeLabel(type)}</span>
                      <span className="text-sm font-medium text-gray-900">
                        {typeVocs.length}건 ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          type === 'Complaint'
                            ? 'bg-red-500'
                            : type === 'Inquiry'
                            ? 'bg-blue-500'
                            : type === 'Compliment'
                            ? 'bg-green-500'
                            : 'bg-yellow-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </Card>

        <Card title="채널별 분포">
          <div className="space-y-3">
            {['Call', 'Chat', 'Email', 'Visit'].map((channel) => {
              const channelVocs = vocs.filter((v) => v.channel === channel);
              const percentage = totalVOC > 0 ? (channelVocs.length / totalVOC) * 100 : 0;

              return (
                <div key={channel} className="flex items-center justify-between bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">{channel}</span>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{channelVocs.length}건</p>
                    <p className="text-xs text-gray-500">{percentage.toFixed(0)}%</p>
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

