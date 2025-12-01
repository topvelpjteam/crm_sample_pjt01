import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Customer } from '../../types/customer';

interface IssueCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
  onIssue: (data: any) => void;
}

export const IssueCouponModal: React.FC<IssueCouponModalProps> = ({
  isOpen,
  onClose,
  customer,
  onIssue,
}) => {
  const [templateId, setTemplateId] = useState('');
  const [validFrom, setValidFrom] = useState(new Date().toISOString().split('T')[0]);
  const [validTo, setValidTo] = useState('');
  const [remark, setRemark] = useState('');

  const couponTemplates = [
    { value: 'TPL-001', label: '10,000원 할인 쿠폰' },
    { value: 'TPL-002', label: '15% 할인 쿠폰' },
    { value: 'TPL-003', label: '20% 할인 쿠폰 (VIP 전용)' },
    { value: 'TPL-004', label: '무료배송 쿠폰' },
    { value: 'TPL-005', label: '신상품 30% 할인' },
  ];

  const handleIssue = () => {
    onIssue({
      templateId,
      validFrom,
      validTo,
      remark,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="쿠폰 발급"
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button variant="success" onClick={handleIssue}>
            발급
          </Button>
        </>
      }
    >
      <div className="space-y-5 modal">
        {/* 고객 정보 */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">발급 대상</h4>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
              {customer.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-gray-900">{customer.name}</p>
              <p className="text-sm text-gray-500">{customer.id}</p>
            </div>
          </div>
        </div>

        {/* 쿠폰 템플릿 선택 */}
        <Select
          label="쿠폰 템플릿"
          required
          value={templateId}
          onChange={(e) => setTemplateId(e.target.value)}
          options={couponTemplates}
        />

        {/* 유효기간 */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="유효 시작일"
            type="date"
            value={validFrom}
            onChange={(e) => setValidFrom(e.target.value)}
            required
          />
          <Input
            label="유효 종료일"
            type="date"
            value={validTo}
            onChange={(e) => setValidTo(e.target.value)}
            required
          />
        </div>

        {/* 메모 */}
        <Textarea
          label="발급 메모"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="발급 사유나 특이사항을 입력하세요 (선택)"
          rows={3}
        />

        {/* 안내 */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800">
            💡 발급된 쿠폰은 고객의 앱/웹에서 즉시 확인할 수 있으며, 알림톡이 자동으로
            발송됩니다.
          </p>
        </div>
      </div>
    </Modal>
  );
};

