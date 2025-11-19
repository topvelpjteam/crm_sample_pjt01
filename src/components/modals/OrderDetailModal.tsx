import React from 'react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Package, MapPin, CreditCard, Truck } from 'lucide-react';
import { Order } from '../../types/customer';

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="주문 상세"
      size="lg"
      footer={
        <Button variant="outline" onClick={onClose}>
          닫기
        </Button>
      }
    >
      <div className="space-y-6">
        {/* 주문 정보 헤더 */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-500 mb-1">주문번호</p>
            <p className="text-lg font-bold font-mono">{order.orderId}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-1">주문상태</p>
            <Badge variant={getStatusBadgeVariant(order.status)} size="lg">
              {order.status === 'Delivered' ? '배송완료' : order.status}
            </Badge>
          </div>
        </div>

        {/* 주문일시, 채널 */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 mb-1">주문일시</p>
            <p className="font-medium text-gray-900">{formatDate(order.orderDate)}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">주문채널</p>
            <p className="font-medium text-gray-900">{order.channel}</p>
          </div>
        </div>

        {/* 주문 상품 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-5 h-5 text-gray-400" />
            <h4 className="font-semibold text-gray-900">주문 상품</h4>
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {order.items.map((item, index) => (
              <div
                key={item.id}
                className={`p-4 ${index > 0 ? 'border-t border-gray-200' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.productName}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatCurrency(item.unitPrice)} × {item.quantity}개
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(item.totalPrice)}
                    </p>
                    {item.discount > 0 && (
                      <p className="text-sm text-red-600">-{formatCurrency(item.discount)}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 배송지 정보 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <h4 className="font-semibold text-gray-900">배송지 정보</h4>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg space-y-2 text-sm">
            <div className="flex">
              <span className="w-20 text-gray-500">수령인</span>
              <span className="font-medium text-gray-900">{order.shippingInfo.recipient}</span>
            </div>
            <div className="flex">
              <span className="w-20 text-gray-500">연락처</span>
              <span className="font-medium text-gray-900">{order.shippingInfo.phone}</span>
            </div>
            <div className="flex">
              <span className="w-20 text-gray-500">주소</span>
              <span className="font-medium text-gray-900">
                ({order.shippingInfo.zipCode}) {order.shippingInfo.address}
              </span>
            </div>
          </div>
        </div>

        {/* 결제 정보 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="w-5 h-5 text-gray-400" />
            <h4 className="font-semibold text-gray-900">결제 정보</h4>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">주문금액</span>
              <span className="font-medium">{formatCurrency(order.paymentInfo.totalAmount)}</span>
            </div>
            {order.paymentInfo.discountAmount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">할인금액</span>
                <span className="text-red-600">-{formatCurrency(order.paymentInfo.discountAmount)}</span>
              </div>
            )}
            {order.paymentInfo.pointsUsed > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">포인트 사용</span>
                <span className="text-red-600">-{formatCurrency(order.paymentInfo.pointsUsed)}</span>
              </div>
            )}
            {order.paymentInfo.couponDiscount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">쿠폰 할인</span>
                <span className="text-red-600">-{formatCurrency(order.paymentInfo.couponDiscount)}</span>
              </div>
            )}
            <div className="pt-2 border-t border-gray-200 flex justify-between">
              <span className="font-semibold text-gray-900">최종 결제금액</span>
              <span className="font-bold text-primary-600 text-lg">
                {formatCurrency(order.paymentInfo.paidAmount)}
              </span>
            </div>
            <div className="pt-2 border-t border-gray-200 flex justify-between">
              <span className="text-gray-600">결제수단</span>
              <span className="font-medium">{order.paymentInfo.method}</span>
            </div>
          </div>
        </div>

        {/* 배송 이력 */}
        {order.shipmentEvents && order.shipmentEvents.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Truck className="w-5 h-5 text-gray-400" />
              <h4 className="font-semibold text-gray-900">배송 이력</h4>
            </div>
            <div className="space-y-3">
              {order.shipmentEvents.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-primary-500" />
                    {index < order.shipmentEvents!.length - 1 && (
                      <div className="w-0.5 flex-1 bg-gray-200 mt-1" style={{ minHeight: '20px' }} />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-medium text-gray-900">{event.status}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatDate(event.timestamp)}</p>
                    {event.location && (
                      <p className="text-xs text-gray-500">{event.location}</p>
                    )}
                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

