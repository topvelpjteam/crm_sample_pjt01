import React, { useState } from 'react';
import { CreditCard, Wallet, Receipt } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Customer } from '../../types/customer';
import { PaymentMethod } from '../../types/order';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
  orderAmount: number;
  onPaymentComplete: (data: any) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  customer,
  orderAmount,
  onPaymentComplete,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('신용카드');
  const [usePoints, setUsePoints] = useState(0);
  const [useDeposit, setUseDeposit] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  
  // 신용카드 정보
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  
  // 무통장 입금 정보
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [depositorName, setDepositorName] = useState(customer.name);
  
  // 가상계좌 정보
  const [virtualAccountBank, setVirtualAccountBank] = useState('');
  
  // 직영 결제 정보
  const [directPaymentType, setDirectPaymentType] = useState<'현금' | '카드'>('현금');

  const paymentMethods: PaymentMethod[] = [
    '신용카드',
    '무통장입금',
    '가상계좌',
    '적립금/예치금',
    '쿠폰',
    '직영(현금)',
    '직영(카드)',
  ];

  const banks = [
    '국민은행',
    '신한은행',
    '우리은행',
    '하나은행',
    'KB국민은행',
    '농협은행',
    '기업은행',
    '외환은행',
    '씨티은행',
    'SC제일은행',
  ];

  // 최종 결제금액 계산
  const totalDiscount = usePoints + useDeposit + couponDiscount;
  const finalAmount = Math.max(0, orderAmount - totalDiscount);

  const handlePayment = () => {
    const paymentData = {
      orderAmount,
      paymentMethod,
      usePoints,
      useDeposit,
      couponDiscount,
      finalAmount,
      cardInfo: paymentMethod === '신용카드' ? {
        cardNumber,
        cardExpiry,
        cardCvc,
        cardHolderName,
      } : undefined,
      bankInfo: paymentMethod === '무통장입금' ? {
        bankName,
        accountNumber,
        depositorName,
      } : undefined,
      virtualAccount: paymentMethod === '가상계좌' ? {
        bank: virtualAccountBank,
      } : undefined,
      directPayment: (paymentMethod === '직영(현금)' || paymentMethod === '직영(카드)') ? {
        type: directPaymentType,
      } : undefined,
    };
    
    onPaymentComplete(paymentData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="결제" size="lg">
      <div className="space-y-6">
        {/* 주문 금액 요약 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">주문금액</span>
              <span className="font-medium">{orderAmount.toLocaleString()}원</span>
            </div>
            {usePoints > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">적립금 사용</span>
                <span className="text-red-600">-{usePoints.toLocaleString()}원</span>
              </div>
            )}
            {useDeposit > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">예치금 사용</span>
                <span className="text-red-600">-{useDeposit.toLocaleString()}원</span>
              </div>
            )}
            {couponDiscount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">쿠폰 할인</span>
                <span className="text-red-600">-{couponDiscount.toLocaleString()}원</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between">
              <span className="font-semibold">최종 결제금액</span>
              <span className="text-xl font-bold text-primary-600">
                {finalAmount.toLocaleString()}원
              </span>
            </div>
          </div>
        </div>

        {/* 적립금/예치금 사용 */}
        <div className="border rounded-lg p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            적립금 / 예치금 사용
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                label="적립금 사용"
                type="number"
                value={usePoints}
                onChange={(e) => setUsePoints(parseInt(e.target.value) || 0)}
                placeholder="0"
              />
              <p className="text-xs text-gray-500 mt-1">
                사용가능: {customer.totalSales.toLocaleString()}P
              </p>
            </div>
            <div>
              <Input
                label="예치금 사용"
                type="number"
                value={useDeposit}
                onChange={(e) => setUseDeposit(parseInt(e.target.value) || 0)}
                placeholder="0"
              />
              <p className="text-xs text-gray-500 mt-1">사용가능: 0원</p>
            </div>
          </div>
        </div>

        {/* 쿠폰 사용 */}
        <div className="border rounded-lg p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            쿠폰 사용
          </h4>
          <div className="flex gap-2">
            <Input
              type="number"
              value={couponDiscount}
              onChange={(e) => setCouponDiscount(parseInt(e.target.value) || 0)}
              placeholder="쿠폰 할인 금액"
            />
            <Button variant="outline">쿠폰 선택</Button>
          </div>
        </div>

        {/* 결제수단 선택 */}
        <div className="border rounded-lg p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            결제수단
          </h4>
          
          <Select
            label="결제수단"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
          >
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </Select>

          {/* 신용카드 */}
          {paymentMethod === '신용카드' && (
            <div className="mt-4 space-y-3">
              <Input
                label="카드번호"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="0000-0000-0000-0000"
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="유효기간"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  placeholder="MM/YY"
                />
                <Input
                  label="CVC"
                  type="password"
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value)}
                  placeholder="000"
                  maxLength={3}
                />
              </div>
              <Input
                label="카드 소유자명"
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
                placeholder="카드에 표시된 이름"
              />
            </div>
          )}

          {/* 무통장 입금 */}
          {paymentMethod === '무통장입금' && (
            <div className="mt-4 space-y-3">
              <Select
                label="은행"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              >
                <option value="">은행 선택</option>
                {banks.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </Select>
              <Input
                label="계좌번호"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="계좌번호 입력"
              />
              <Input
                label="입금자명"
                value={depositorName}
                onChange={(e) => setDepositorName(e.target.value)}
                placeholder="입금자명"
              />
            </div>
          )}

          {/* 가상계좌 */}
          {paymentMethod === '가상계좌' && (
            <div className="mt-4">
              <Select
                label="은행"
                value={virtualAccountBank}
                onChange={(e) => setVirtualAccountBank(e.target.value)}
              >
                <option value="">은행 선택</option>
                {banks.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </Select>
              <p className="text-sm text-gray-500 mt-2">
                가상계좌는 주문 완료 후 자동으로 발급됩니다.
              </p>
            </div>
          )}

          {/* 직영 결제 */}
          {(paymentMethod === '직영(현금)' || paymentMethod === '직영(카드)') && (
            <div className="mt-4">
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="directPayment"
                    value="현금"
                    checked={directPaymentType === '현금'}
                    onChange={(e) => setDirectPaymentType(e.target.value as '현금')}
                    className="rounded"
                  />
                  <span className="text-sm">현금</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="directPayment"
                    value="카드"
                    checked={directPaymentType === '카드'}
                    onChange={(e) => setDirectPaymentType(e.target.value as '카드')}
                    className="rounded"
                  />
                  <span className="text-sm">카드</span>
                </label>
              </div>
            </div>
          )}

          {/* 적립금/예치금 전액 사용 */}
          {paymentMethod === '적립금/예치금' && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                적립금/예치금으로 전액 결제됩니다.
              </p>
            </div>
          )}

          {/* 쿠폰 전액 사용 */}
          {paymentMethod === '쿠폰' && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                쿠폰으로 전액 결제됩니다.
              </p>
            </div>
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={handlePayment}
            disabled={finalAmount > 0 && !paymentMethod}
          >
            {finalAmount.toLocaleString()}원 결제하기
          </Button>
        </div>
      </div>
    </Modal>
  );
};

