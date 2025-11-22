import React, { useState } from 'react';
import { X, Plus, Trash2, Edit } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { ProductSearchModal } from './ProductSearchModal';
import { Customer } from '../../types/customer';
import {
  Product,
  OrderProductItem,
  DeliveryItem,
  PurchaseChannelLarge,
  PurchaseChannelSmall,
  CourierCompany,
  Warehouse,
} from '../../types/order';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
  onSubmit: (data: any) => void;
}

export const NewOrderModal: React.FC<NewOrderModalProps> = ({
  isOpen,
  onClose,
  customer,
  onSubmit,
}) => {
  // 주문 기본정보
  const [orderType, setOrderType] = useState('');
  const [purchaseChannelLarge, setPurchaseChannelLarge] = useState<PurchaseChannelLarge | ''>('');
  const [purchaseChannelSmall, setPurchaseChannelSmall] = useState<PurchaseChannelSmall | ''>('');
  
  // 주문 상품 목록
  const [orderProducts, setOrderProducts] = useState<OrderProductItem[]>([]);
  
  // 배송 정보
  const [deliveryItems, setDeliveryItems] = useState<DeliveryItem[]>([]);
  
  // 주문 메모
  const [orderMemo, setOrderMemo] = useState('');
  
  // 모달 상태
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [isDeliveryBulkEditOpen, setIsDeliveryBulkEditOpen] = useState(false);
  
  // 일괄 수정 데이터
  const [bulkDeliveryDate, setBulkDeliveryDate] = useState('');
  const [bulkRecipient, setBulkRecipient] = useState(customer.name);
  const [bulkRecipientPhone, setBulkRecipientPhone] = useState(customer.phone);
  const [bulkRecipientTel, setBulkRecipientTel] = useState('');
  const [bulkCourier, setBulkCourier] = useState<CourierCompany>('CJ택배');
  const [bulkWarehouse, setBulkWarehouse] = useState<Warehouse>('지곡물류');
  const [bulkZipCode, setBulkZipCode] = useState('');
  const [bulkAddress, setBulkAddress] = useState(customer.address || '');
  const [bulkAddressDetail, setBulkAddressDetail] = useState('');
  const [bulkDeliveryMemo, setBulkDeliveryMemo] = useState('');
  const [bulkShowPrice, setBulkShowPrice] = useState(false);

  const purchaseChannelsLarge: PurchaseChannelLarge[] = [
    '인터넷',
    '온라인마켓',
    '대중시설',
    '행사',
    '기타',
    'CS팀_토스',
    '전화',
    '신문',
    '방송',
    '이메일마케팅',
  ];

  const purchaseChannelsSmall: PurchaseChannelSmall[] = [
    '전화수신',
    '매장',
    '샘플',
    '문자',
    '월간지',
    '스폰서',
    '직영홍보',
    '지인소개',
    '대리점',
    '기타',
  ];

  const couriers: CourierCompany[] = [
    '우체국',
    'CJ택배',
    '한진택배',
    '롯데택배',
    '직접수령',
    '미배정',
    '기타',
  ];

  const warehouses: Warehouse[] = [
    '지곡물류',
    '백상빌딩13층',
    '마늘창고1',
    '마늘창고2',
    '마늘창고3',
    '강남직영',
    '분당직영',
    '수원직영',
    '일산직영',
    '웰니스호텔',
  ];

  // 제품 추가 핸들러
  const handleAddProduct = (product: Product, quantity: number) => {
    const newItem: OrderProductItem = {
      id: `OP-${Date.now()}-${Math.random()}`,
      productId: product.id,
      productName: product.productName,
      orderQuantity: quantity,
      deliveryQuantity: 0,
      remainingQuantity: quantity,
      unitPrice: product.memberPrice,
      isOrderable: true,
      productForm: product.productForm,
    };
    
    setOrderProducts((prev) => [...prev, newItem]);
    
    // 자동으로 배송 항목 생성
    const newDeliveryItem: DeliveryItem = {
      id: `DI-${Date.now()}-${Math.random()}`,
      sequence: deliveryItems.length + 1,
      productName: product.productName,
      deliveryCount: quantity,
      division: product.productForm === '샘플' ? '기타' : '일반',
      deliveryDate: '',
      recipientAddress: customer.address || '',
      recipient: customer.name,
      recipientPhone: customer.phone,
      recipientTel: '',
      courier: 'CJ택배',
      warehouse: '지곡물류',
      zipCode: '',
      addressDetail: '',
      deliveryMemo: '',
      showPriceOnInvoice: false,
      invoiceIncluded: true,
    };
    
    setDeliveryItems((prev) => [...prev, newDeliveryItem]);
  };

  // 제품 삭제
  const handleRemoveProduct = (productId: string) => {
    setOrderProducts((prev) => prev.filter((item) => item.id !== productId));
    // 해당 제품의 배송 항목도 삭제
    setDeliveryItems((prev) => {
      const product = orderProducts.find((p) => p.id === productId);
      if (product) {
        return prev.filter((item) => item.productName !== product.productName);
      }
      return prev;
    });
  };

  // 배송지 일괄 수정 적용
  const handleApplyBulkDelivery = () => {
    setDeliveryItems((prev) =>
      prev.map((item) => ({
        ...item,
        deliveryDate: bulkDeliveryDate || item.deliveryDate,
        recipient: bulkRecipient || item.recipient,
        recipientPhone: bulkRecipientPhone || item.recipientPhone,
        recipientTel: bulkRecipientTel || item.recipientTel,
        courier: bulkCourier || item.courier,
        warehouse: bulkWarehouse || item.warehouse,
        zipCode: bulkZipCode || item.zipCode,
        recipientAddress: bulkAddress || item.recipientAddress,
        addressDetail: bulkAddressDetail || item.addressDetail,
        deliveryMemo: bulkDeliveryMemo || item.deliveryMemo,
        showPriceOnInvoice: bulkShowPrice,
      }))
    );
    setIsDeliveryBulkEditOpen(false);
  };

  // 배송 항목 삭제
  const handleRemoveDelivery = (deliveryId: string) => {
    setDeliveryItems((prev) => prev.filter((item) => item.id !== deliveryId));
  };

  // 주문서 제출
  const handleSubmitOrder = () => {
    const orderData = {
      basicInfo: {
        memberName: customer.name,
        memberGrade: customer.membershipGrade,
        memberId: customer.id,
        orderNumber: `ORD-${Date.now()}`,
        orderType,
        purchaseChannelLarge,
        purchaseChannelSmall,
      },
      products: orderProducts,
      deliveries: deliveryItems,
      orderMemo,
    };
    
    onSubmit(orderData);
  };

  // 총 주문 금액 계산
  const totalAmount = orderProducts.reduce(
    (sum, item) => sum + item.unitPrice * item.orderQuantity,
    0
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="신규 주문서 작성" size="full">
        <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* 1. 주문 기본정보 */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">주문 기본정보</h3>
            <div className="grid grid-cols-3 gap-4">
              <Input label="회원명" value={customer.name} disabled />
              <Input label="회원등급" value={customer.membershipGrade} disabled />
              <Input label="회원번호" value={customer.id} disabled />
              <Input label="주문번호" value="자동생성" disabled />
              <Input label="주문유형" value={orderType} onChange={(e) => setOrderType(e.target.value)} />
              <Select
                label="구매경로(대)"
                value={purchaseChannelLarge}
                onChange={(e) => setPurchaseChannelLarge(e.target.value as PurchaseChannelLarge)}
              >
                <option value="">선택</option>
                {purchaseChannelsLarge.map((channel) => (
                  <option key={channel} value={channel}>
                    {channel}
                  </option>
                ))}
              </Select>
              <Select
                label="구매경로(소)"
                value={purchaseChannelSmall}
                onChange={(e) => setPurchaseChannelSmall(e.target.value as PurchaseChannelSmall)}
              >
                <option value="">선택</option>
                {purchaseChannelsSmall.map((channel) => (
                  <option key={channel} value={channel}>
                    {channel}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {/* 2. 주문정보 (필수) */}
          <div className="bg-white border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">주문정보 (필수)</h3>
              <div className="flex gap-2">
                <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsProductModalOpen(true)}>
                  제품추가
                </Button>
                <Button variant="outline" size="sm" icon={Plus} onClick={() => setIsSampleModalOpen(true)}>
                  샘플추가
                </Button>
              </div>
            </div>

            {/* 주문 목록 테이블 */}
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">구분</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">제품명</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">주문수량</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">배송수량</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">잔여수량</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">단가</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">주문가능</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">삭제</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orderProducts.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                        제품을 추가해주세요.
                      </td>
                    </tr>
                  ) : (
                    orderProducts.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                            {item.productForm === '샘플' ? '기타' : '일반'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.productName}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{item.orderQuantity}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 text-right">{item.deliveryQuantity}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 text-right">{item.remainingQuantity}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                          {item.unitPrice.toLocaleString()}원
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              item.isOrderable
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {item.isOrderable ? '가능' : '불가'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleRemoveProduct(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* 총 주문금액 */}
            {orderProducts.length > 0 && (
              <div className="mt-4 flex justify-end">
                <div className="bg-gray-50 px-6 py-3 rounded-lg">
                  <span className="text-sm text-gray-600 mr-4">총 주문금액:</span>
                  <span className="text-lg font-bold text-primary-600">
                    {totalAmount.toLocaleString()}원
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 3. 배송설정 */}
          <div className="bg-white border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">배송설정</h3>
              <Button
                variant="outline"
                size="sm"
                icon={Edit}
                onClick={() => setIsDeliveryBulkEditOpen(true)}
              >
                배송지 일괄수정
              </Button>
            </div>

            {/* 배송 목록 테이블 */}
            <div className="border rounded-lg overflow-hidden">
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">순번</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">제품명</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">배송개수</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">구분</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">수취일자</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">수취인</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">핸드폰</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">택배사</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500">제거</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {deliveryItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2 text-sm">{item.sequence}</td>
                        <td className="px-3 py-2 text-sm">{item.productName}</td>
                        <td className="px-3 py-2 text-sm">{item.deliveryCount}</td>
                        <td className="px-3 py-2 text-sm">{item.division}</td>
                        <td className="px-3 py-2 text-sm">
                          <input
                            type="date"
                            value={item.deliveryDate}
                            onChange={(e) => {
                              const updated = deliveryItems.map((d) =>
                                d.id === item.id ? { ...d, deliveryDate: e.target.value } : d
                              );
                              setDeliveryItems(updated);
                            }}
                            className="px-2 py-1 border rounded text-xs w-full"
                          />
                        </td>
                        <td className="px-3 py-2 text-sm">{item.recipient}</td>
                        <td className="px-3 py-2 text-sm">{item.recipientPhone}</td>
                        <td className="px-3 py-2 text-sm">{item.courier}</td>
                        <td className="px-3 py-2 text-center">
                          <button
                            onClick={() => handleRemoveDelivery(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 4. 주문메모 */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">주문메모</h3>
            <Textarea
              value={orderMemo}
              onChange={(e) => setOrderMemo(e.target.value)}
              placeholder="주문 관련 메모를 입력하세요..."
              rows={4}
            />
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmitOrder}
            disabled={orderProducts.length === 0}
          >
            다음 (결제하기)
          </Button>
        </div>
      </Modal>

      {/* 제품 추가 모달 */}
      <ProductSearchModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSelectProduct={handleAddProduct}
        isSample={false}
      />

      {/* 샘플 추가 모달 */}
      <ProductSearchModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
        onSelectProduct={handleAddProduct}
        isSample={true}
      />

      {/* 배송지 일괄수정 모달 */}
      <Modal
        isOpen={isDeliveryBulkEditOpen}
        onClose={() => setIsDeliveryBulkEditOpen(false)}
        title="배송지 일괄수정"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="수취일자"
              type="date"
              value={bulkDeliveryDate}
              onChange={(e) => setBulkDeliveryDate(e.target.value)}
            />
            <Input
              label="수취인"
              value={bulkRecipient}
              onChange={(e) => setBulkRecipient(e.target.value)}
            />
            <Input
              label="수취인 핸드폰"
              value={bulkRecipientPhone}
              onChange={(e) => setBulkRecipientPhone(e.target.value)}
            />
            <Input
              label="수취인 연락처"
              value={bulkRecipientTel}
              onChange={(e) => setBulkRecipientTel(e.target.value)}
            />
            <Select
              label="택배사"
              value={bulkCourier}
              onChange={(e) => setBulkCourier(e.target.value as CourierCompany)}
            >
              {couriers.map((courier) => (
                <option key={courier} value={courier}>
                  {courier}
                </option>
              ))}
            </Select>
            <Select
              label="창고"
              value={bulkWarehouse}
              onChange={(e) => setBulkWarehouse(e.target.value as Warehouse)}
            >
              {warehouses.map((warehouse) => (
                <option key={warehouse} value={warehouse}>
                  {warehouse}
                </option>
              ))}
            </Select>
            <Input
              label="우편번호"
              value={bulkZipCode}
              onChange={(e) => setBulkZipCode(e.target.value)}
            />
            <Input
              label="주소"
              value={bulkAddress}
              onChange={(e) => setBulkAddress(e.target.value)}
            />
            <Input
              label="상세주소"
              value={bulkAddressDetail}
              onChange={(e) => setBulkAddressDetail(e.target.value)}
              className="col-span-2"
            />
            <Textarea
              label="배송메모"
              value={bulkDeliveryMemo}
              onChange={(e) => setBulkDeliveryMemo(e.target.value)}
              rows={3}
              className="col-span-2"
            />
            <div className="col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={bulkShowPrice}
                  onChange={(e) => setBulkShowPrice(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">거래명세서 단가표시 여부</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsDeliveryBulkEditOpen(false)}>
              취소
            </Button>
            <Button variant="primary" onClick={handleApplyBulkDelivery}>
              적용
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

