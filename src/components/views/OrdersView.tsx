import React from 'react';
import { ShoppingBag, DollarSign, Package, Filter, Download } from 'lucide-react';
import { Order } from '../../types/customer';
import { Card } from '../ui/Card';
import { KPICard } from '../ui/KPICard';
import { Table } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface OrdersViewProps {
  orders: Order[];
  onOrderClick: (order: Order) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({ orders, onOrderClick }) => {

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const getStatusBadgeVariant = (status: Order['status']) => {
    switch (status) {
      case 'Delivered':
        return 'success';
      case 'Shipped':
        return 'primary';
      case 'Confirmed':
        return 'warning';
      case 'Cancelled':
      case 'Refunded':
        return 'danger';
      default:
        return 'gray';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    const labels: Record<Order['status'], string> = {
      Pending: '대기중',
      Confirmed: '확인됨',
      Shipped: '배송중',
      Delivered: '배송완료',
      Cancelled: '취소됨',
      Refunded: '환불됨',
    };
    return labels[status];
  };

  // 통계 계산
  const totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const orderCount = orders.length;
  const avgOrderValue = orderCount > 0 ? totalAmount / orderCount : 0;

  const columns = [
    {
      key: 'orderId',
      title: '주문번호',
      width: '140px',
      render: (value: string) => (
        <span className="font-mono text-sm font-medium text-primary-600">{value}</span>
      ),
    },
    {
      key: 'orderDate',
      title: '주문일시',
      width: '120px',
      render: (value: string) => formatDate(value),
    },
    {
      key: 'channel',
      title: '채널',
      width: '120px',
    },
    {
      key: 'items',
      title: '상품',
      render: (items: Order['items']) => (
        <div className="max-w-xs">
          <p className="text-sm font-medium text-gray-900 truncate">
            {items[0]?.productName}
          </p>
          {items.length > 1 && (
            <p className="text-xs text-gray-500">외 {items.length - 1}건</p>
          )}
        </div>
      ),
    },
    {
      key: 'totalAmount',
      title: '주문금액',
      width: '120px',
      align: 'right' as const,
      render: (value: number) => (
        <span className="font-semibold text-gray-900">{formatCurrency(value)}</span>
      ),
    },
    {
      key: 'status',
      title: '상태',
      width: '100px',
      align: 'center' as const,
      render: (value: Order['status']) => (
        <Badge variant={getStatusBadgeVariant(value)}>{getStatusLabel(value)}</Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI 카드들 */}
      <div className="grid grid-cols-3 gap-6">
        <KPICard
          title="총 매출액"
          value={formatCurrency(totalAmount)}
          icon={DollarSign}
          color="blue"
        />
        <KPICard
          title="주문 건수"
          value={`${orderCount}건`}
          icon={ShoppingBag}
          color="green"
        />
        <KPICard
          title="평균 객단가"
          value={formatCurrency(avgOrderValue)}
          icon={Package}
          color="purple"
        />
      </div>

      {/* 주문 목록 */}
      <Card
        title="주문 이력"
        subtitle={`총 ${orderCount}건의 주문`}
        headerAction={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" icon={Filter}>
              필터
            </Button>
            <Button variant="outline" size="sm" icon={Download}>
              엑셀 다운로드
            </Button>
          </div>
        }
      >
        <Table
          columns={columns}
          data={orders}
          onRowClick={(order) => onOrderClick(order)}
          emptyText="주문 이력이 없습니다."
        />
      </Card>

      {/* 카테고리별 매출 분포 */}
      <div className="grid grid-cols-2 gap-6">
        <Card title="채널별 주문 분포">
          <div className="space-y-3">
            {['자사몰(앱)', '자사몰(웹)', '오프라인매장'].map((channel) => {
              const channelOrders = orders.filter((o) => o.channel === channel);
              const percentage =
                orderCount > 0 ? (channelOrders.length / orderCount) * 100 : 0;

              return (
                <div key={channel}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">{channel}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {channelOrders.length}건 ({percentage.toFixed(0)}%)
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

        <Card title="월별 구매 추이">
          <div className="space-y-3">
            {['2024-11', '2024-10', '2024-09'].map((month) => {
              const monthOrders = orders.filter((o) => o.orderDate.startsWith(month));
              const monthTotal = monthOrders.reduce((sum, o) => sum + o.totalAmount, 0);

              return (
                <div key={month} className="flex items-center justify-between bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">{month}</span>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {monthOrders.length}건
                    </p>
                    <p className="text-xs text-gray-500">{formatCurrency(monthTotal)}</p>
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

