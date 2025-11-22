import React from 'react';
import { Modal } from '../ui/Modal';
import { Tabs } from '../ui/Tabs';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Badge } from '../ui/Badge';
import {
  DeliverySeparationItem,
  CancellationItem,
} from '../../types/order';

interface OrderDetailTabsModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
}

export const OrderDetailTabsModal: React.FC<OrderDetailTabsModalProps> = ({
  isOpen,
  onClose,
  orderNumber,
}) => {
  // 샘플 데이터
  const mockDeliveryItems: DeliverySeparationItem[] = [
    {
      sequence: 1,
      deliveryScheduledDate: '2024-11-25',
      recipientAddress: '서울시 강남구 테헤란로 123',
      recipient: '홍길동',
      recipientPhone: '010-1234-5678',
      stockStatus: '출고',
      productName: '인산죽염 9회죽염 250g',
      unitQuantity: 2,
      courier: 'CJ택배',
      releaseAcceptDate: '2024-11-23',
    },
  ];

  const mockCancellationItems: CancellationItem[] = [
    {
      sequence: 1,
      deliveryDate: '2024-11-25',
      recipientAddress: '서울시 강남구 테헤란로 123',
      warehouse: '지곡물류',
      stockStatus: '미출고',
      productName: '인산죽염 9회죽염 250g',
      orderQuantity: 2,
      cancellationCompleted: 0,
      cancellable: 2,
      cancellationQuantity: 0,
    },
  ];

  const renderTabContent = (tabKey: string) => {
    switch (tabKey) {
      case 'delivery-separation':
        return (
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">순번</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                      배송예정일
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                      수취인주소
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                      수취인
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                      수취인HP
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                      수불상태
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                      제품명
                    </th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">
                      단품수량
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                      택배사
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {mockDeliveryItems.map((item) => (
                    <tr key={item.sequence}>
                      <td className="px-3 py-2 text-sm">{item.sequence}</td>
                      <td className="px-3 py-2 text-sm">{item.deliveryScheduledDate}</td>
                      <td className="px-3 py-2 text-sm">{item.recipientAddress}</td>
                      <td className="px-3 py-2 text-sm">{item.recipient}</td>
                      <td className="px-3 py-2 text-sm">{item.recipientPhone}</td>
                      <td className="px-3 py-2">
                        <Badge variant="success">{item.stockStatus}</Badge>
                      </td>
                      <td className="px-3 py-2 text-sm">{item.productName}</td>
                      <td className="px-3 py-2 text-sm text-right">{item.unitQuantity}</td>
                      <td className="px-3 py-2 text-sm">{item.courier}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'cancellation':
        return (
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">순번</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                      배송일자
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                      수취인주소
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                      물류창고
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                      수불상태
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                      제품명
                    </th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">
                      주문수량
                    </th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">
                      취소가능
                    </th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500">
                      취소수량
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {mockCancellationItems.map((item) => (
                    <tr key={item.sequence}>
                      <td className="px-3 py-2 text-sm">{item.sequence}</td>
                      <td className="px-3 py-2 text-sm">{item.deliveryDate}</td>
                      <td className="px-3 py-2 text-sm">{item.recipientAddress}</td>
                      <td className="px-3 py-2 text-sm">{item.warehouse}</td>
                      <td className="px-3 py-2">
                        <Badge variant="warning">{item.stockStatus}</Badge>
                      </td>
                      <td className="px-3 py-2 text-sm">{item.productName}</td>
                      <td className="px-3 py-2 text-sm text-right">{item.orderQuantity}</td>
                      <td className="px-3 py-2 text-sm text-right">{item.cancellable}</td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          min="0"
                          max={item.cancellable}
                          defaultValue="0"
                          className="w-16 px-2 py-1 border rounded text-sm text-center"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end">
              <Button variant="primary">취소 요청</Button>
            </div>
          </div>
        );

      case 'claim':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="발생일자" type="date" />
              <Input label="회원번호" defaultValue={orderNumber} disabled />
              <Input label="회원명" />
              <Input label="주문번호" defaultValue={orderNumber} disabled />
              <Input label="주문일자" type="date" />
              <Input label="주문가격" type="number" />
              <Input label="담당자" />
              <Select label="클레임구분">
                <option value="">선택</option>
                <option value="제품">제품</option>
                <option value="서비스">서비스</option>
                <option value="기타">기타</option>
              </Select>
              <Select label="클레임분류">
                <option value="">선택</option>
                <option value="제품파손">제품파손</option>
                <option value="제품변질">제품변질</option>
                <option value="기타">기타</option>
              </Select>
              <Select label="클레임제품처리">
                <option value="">선택</option>
                <option value="교환">교환</option>
                <option value="반품">반품</option>
                <option value="취소">취소</option>
                <option value="상급자보고">상급자보고</option>
                <option value="기타">기타</option>
              </Select>
              <Select label="클레임결과">
                <option value="">선택</option>
                <option value="처리중">처리중</option>
                <option value="미완료">미완료</option>
                <option value="완료">완료</option>
                <option value="기타">기타</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">제품선택</label>
              <div className="border rounded p-2 text-sm text-gray-600">
                주문한 제품 목록이 여기 표시됩니다.
              </div>
            </div>
            <Textarea label="클레임내용" rows={4} placeholder="클레임 내용을 입력하세요..." />
            <div className="flex justify-end gap-2">
              <Button variant="outline">취소</Button>
              <Button variant="primary">클레임 등록</Button>
            </div>
          </div>
        );

      case 'cash-receipt':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="회원명" />
              <Select label="용도">
                <option value="">선택</option>
                <option value="소득공제">소득공제</option>
                <option value="지출증빙">지출증빙</option>
              </Select>
              <Input label="휴대폰번호" type="tel" placeholder="010-0000-0000" />
              <Input label="금액" type="number" />
              <div className="col-span-2">
                <Input label="제품명" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">취소</Button>
              <Button variant="primary">현금영수증 발급</Button>
            </div>
          </div>
        );

      case 'tax-invoice':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="일자" type="date" />
              <Input label="거래처명" />
              <div className="col-span-2">
                <Input label="주소" />
              </div>
              <Input label="담당자" />
              <Input label="이메일" type="email" />
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">사본업로드</label>
                <input type="file" className="block w-full text-sm" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">취소</Button>
              <Button variant="primary">세금계산서 발행</Button>
            </div>
          </div>
        );

      case 'payment-change':
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">결제수단 변경</h4>
              <div className="grid grid-cols-2 gap-4">
                <Select label="결제수단">
                  <option value="">선택</option>
                  <option value="적립금/예치금">적립금/예치금</option>
                  <option value="쿠폰">쿠폰</option>
                  <option value="가상계좌">가상계좌</option>
                  <option value="무통장입금">무통장입금</option>
                  <option value="신용카드">신용카드</option>
                  <option value="직영(현금)">직영(현금)</option>
                  <option value="직영(카드)">직영(카드)</option>
                </Select>
                <Input label="변경 금액" type="number" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">취소</Button>
              <Button variant="primary">결제수단 변경</Button>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8 text-gray-500">
            탭 내용이 준비 중입니다.
          </div>
        );
    }
  };

  const tabs = [
    { key: 'delivery-separation', label: '배송지분리', content: renderTabContent('delivery-separation') },
    { key: 'delivery-bulk-edit', label: '배송지일괄변경', content: renderTabContent('delivery-bulk-edit') },
    { key: 'cancellation', label: '취소', content: renderTabContent('cancellation') },
    { key: 'forced-action', label: '확정취소/강제출고', content: renderTabContent('forced-action') },
    { key: 'return', label: '반품', content: renderTabContent('return') },
    { key: 'cancel-return-payment', label: '취소/반품 결제', content: renderTabContent('cancel-return-payment') },
    { key: 'exchange', label: '교환', content: renderTabContent('exchange') },
    { key: 'cash-receipt', label: '현금영수증', content: renderTabContent('cash-receipt') },
    { key: 'tax-invoice', label: '세금계산서', content: renderTabContent('tax-invoice') },
    { key: 'claim', label: '클레임', content: renderTabContent('claim') },
    { key: 'payment-change', label: '결제/계좌변경', content: renderTabContent('payment-change') },
    { key: 'precedent', label: '사례', content: renderTabContent('precedent') },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`주문 상세: ${orderNumber}`} size="full">
      <Tabs tabs={tabs} />
    </Modal>
  );
};

