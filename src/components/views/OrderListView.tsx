import React, { useState } from 'react';
import { Search, FileText } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Badge } from '../ui/Badge';
import {
  OrderListItem,
  OrderListFilter,
  OrderType,
  OrderForm,
  PaymentStatus,
} from '../../types/order';

interface OrderListViewProps {
  onOrderClick: (order: OrderListItem) => void;
}

// 샘플 주문 데이터
const mockOrderList: OrderListItem[] = [
  {
    sequence: 1,
    memberId: 'M001',
    memberName: '홍길동',
    orderNumber: 'ORD-2024-001',
    originalOrderNumber: undefined,
    orderType: '주문',
    orderDate: '2024-11-20',
    orderForm: '일반',
    orderStatus: '접수',
    orderAmount: 150000,
    paymentStatus: '결제',
    paymentMethod: '신용카드',
    paidAmount: 150000,
    unpaidAmount: 0,
    depositDate: '2024-11-20',
    assignedEmployee: '김상담',
    orderEmployee: '이직원',
    recipient: '홍길동',
    hasMemo: true,
  },
  {
    sequence: 2,
    memberId: 'M002',
    memberName: '이영희',
    orderNumber: 'ORD-2024-002',
    originalOrderNumber: undefined,
    orderType: '주문',
    orderDate: '2024-11-19',
    orderForm: '정기배송',
    orderStatus: '접수',
    orderAmount: 85000,
    paymentStatus: '미결제',
    paidAmount: 0,
    unpaidAmount: 85000,
    assignedEmployee: '박상담',
    orderEmployee: '최직원',
    recipient: '이영희',
    hasMemo: false,
  },
];

export const OrderListView: React.FC<OrderListViewProps> = ({ onOrderClick }) => {
  const [filter, setFilter] = useState<OrderListFilter>({
    startDate: '',
    endDate: '',
    orderType: '',
    orderForm: '',
    paymentStatus: undefined,
    memberId: '',
  });
  
  const [selectedOrder, setSelectedOrder] = useState<OrderListItem | null>(null);

  const orderTypes: OrderType[] = ['주문', '교환', '반품', '취소'];
  const orderForms: OrderForm[] = ['일반', '정기배송', '선물', '샘플'];
  const paymentStatuses: PaymentStatus[] = ['결제', '미결제', '부분결제', '환불'];

  const handleSearch = () => {
    console.log('검색 조건:', filter);
    // 실제로는 여기서 API 호출
  };

  const handleReset = () => {
    setFilter({
      startDate: '',
      endDate: '',
      orderType: '',
      orderForm: '',
      paymentStatus: undefined,
      memberId: '',
    });
  };

  const getPaymentStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case '결제':
        return <Badge variant="success">결제</Badge>;
      case '미결제':
        return <Badge variant="danger">미결제</Badge>;
      case '부분결제':
        return <Badge variant="warning">부분결제</Badge>;
      case '환불':
        return <Badge variant="gray">환불</Badge>;
      default:
        return <Badge variant="gray">{status}</Badge>;
    }
  };

  const getOrderStatusBadge = (status: string) => {
    const statusColors: Record<string, 'success' | 'primary' | 'warning' | 'danger' | 'gray'> = {
      '접수': 'primary',
      '확인': 'warning',
      '출고': 'success',
      '배송중': 'primary',
      '배송완료': 'success',
      '취소': 'danger',
      '반품': 'danger',
    };
    return <Badge variant={statusColors[status] || 'gray'}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* 검색 필터 */}
      <Card title="주문 검색">
        <div className="space-y-4">
          <div className="grid grid-cols-5 gap-4">
            <Input
              label="주문일자 (시작)"
              type="date"
              value={filter.startDate}
              onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}
            />
            <Input
              label="주문일자 (종료)"
              type="date"
              value={filter.endDate}
              onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}
            />
            <Select
              label="주문유형"
              value={filter.orderType}
              onChange={(e) => setFilter({ ...filter, orderType: e.target.value })}
            >
              <option value="">전체</option>
              {orderTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
            <Select
              label="주문형태"
              value={filter.orderForm}
              onChange={(e) => setFilter({ ...filter, orderForm: e.target.value })}
            >
              <option value="">전체</option>
              {orderForms.map((form) => (
                <option key={form} value={form}>
                  {form}
                </option>
              ))}
            </Select>
            <Select
              label="결제상태"
              value={filter.paymentStatus || ''}
              onChange={(e) =>
                setFilter({ ...filter, paymentStatus: e.target.value as PaymentStatus })
              }
            >
              <option value="">전체</option>
              {paymentStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <Input
              label="회원번호"
              value={filter.memberId}
              onChange={(e) => setFilter({ ...filter, memberId: e.target.value })}
              placeholder="회원번호 입력"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              초기화
            </Button>
            <Button variant="primary" size="sm" icon={Search} onClick={handleSearch}>
              검색
            </Button>
          </div>
        </div>
      </Card>

      {/* 주문 목록 */}
      <Card title="주문 목록" subtitle={`총 ${mockOrderList.length}건`}>
        <div className="border rounded-lg overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">순번</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                    회원번호
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">회원명</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                    주문번호
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                    주문유형
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                    주문일자
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                    주문형태
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                    주문상태
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">
                    주문금액
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                    결제상태
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                    결제수단
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">
                    결제금액
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">
                    미결제금액
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                    수취인
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-gray-500">
                    메모
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockOrderList.length === 0 ? (
                  <tr>
                    <td colSpan={15} className="px-4 py-8 text-center text-gray-500">
                      주문 내역이 없습니다.
                    </td>
                  </tr>
                ) : (
                  mockOrderList.map((order) => (
                    <tr
                      key={order.orderNumber}
                      onClick={() => {
                        setSelectedOrder(order);
                        onOrderClick(order);
                      }}
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedOrder?.orderNumber === order.orderNumber ? 'bg-blue-50' : ''
                      }`}
                    >
                      <td className="px-3 py-2 text-sm">{order.sequence}</td>
                      <td className="px-3 py-2 text-sm font-mono">{order.memberId}</td>
                      <td className="px-3 py-2 text-sm">{order.memberName}</td>
                      <td className="px-3 py-2 text-sm font-mono text-primary-600">
                        {order.orderNumber}
                      </td>
                      <td className="px-3 py-2 text-sm">{order.orderType}</td>
                      <td className="px-3 py-2 text-sm">{order.orderDate}</td>
                      <td className="px-3 py-2 text-sm">{order.orderForm}</td>
                      <td className="px-3 py-2">{getOrderStatusBadge(order.orderStatus)}</td>
                      <td className="px-3 py-2 text-sm text-right font-medium">
                        {order.orderAmount.toLocaleString()}원
                      </td>
                      <td className="px-3 py-2">{getPaymentStatusBadge(order.paymentStatus)}</td>
                      <td className="px-3 py-2 text-sm">{order.paymentMethod || '-'}</td>
                      <td className="px-3 py-2 text-sm text-right">
                        {order.paidAmount.toLocaleString()}원
                      </td>
                      <td className="px-3 py-2 text-sm text-right text-red-600">
                        {order.unpaidAmount > 0 ? `${order.unpaidAmount.toLocaleString()}원` : '-'}
                      </td>
                      <td className="px-3 py-2 text-sm">{order.recipient}</td>
                      <td className="px-3 py-2 text-center">
                        {order.hasMemo && (
                          <FileText className="w-4 h-4 text-gray-400 inline-block" />
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

