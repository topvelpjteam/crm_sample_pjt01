import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Coins } from 'lucide-react';
import { Customer } from '../../types/customer';

interface AwardPointsModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
  onAward: (data: any) => void;
}

export const AwardPointsModal: React.FC<AwardPointsModalProps> = ({
  isOpen,
  onClose,
  customer,
  onAward,
}) => {
  const [points, setPoints] = useState('');
  const [reason, setReason] = useState('');
  const [expireDate, setExpireDate] = useState('');

  const handleAward = () => {
    onAward({
      points: parseInt(points),
      reason,
      expireDate: expireDate || undefined,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="포인트 지급"
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleAward}>
            지급
          </Button>
        </>
      }
    >
      <div className="space-y-5 modal">
        {/* 고객 정보 */}
        <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <Coins className="w-8 h-8 text-yellow-600" />
            <div>
              <h4 className="font-semibold text-gray-900">{customer.name}</h4>
              <p className="text-sm text-gray-600">{customer.id}</p>
            </div>
          </div>
          <div className="pt-3 border-t border-yellow-200">
            <p className="text-xs text-gray-600">현재 보유 포인트</p>
            <p className="text-2xl font-bold text-gray-900">12,850 P</p>
          </div>
        </div>

        {/* 지급 포인트 */}
        <Input
          label="지급 포인트"
          type="number"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          placeholder="0"
          required
          hint="최소 100P 이상, 최대 100,000P까지 지급 가능합니다"
        />

        {/* 지급 사유 */}
        <Textarea
          label="지급 사유"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="예: VIP 고객 보상, 불편 사항 보상, 이벤트 참여 등"
          required
          rows={3}
        />

        {/* 만료일 */}
        <Input
          label="포인트 만료일"
          type="date"
          value={expireDate}
          onChange={(e) => setExpireDate(e.target.value)}
          hint="미입력 시 1년 후 자동 만료"
        />

        {/* 예상 결과 */}
        {points && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-medium text-green-900 mb-1">지급 후 예상 포인트</p>
            <p className="text-2xl font-bold text-green-600">
              {(12850 + parseInt(points || '0')).toLocaleString()} P
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

