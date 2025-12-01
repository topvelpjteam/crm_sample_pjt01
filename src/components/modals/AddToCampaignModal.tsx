import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Customer, Campaign } from '../../types/customer';

interface AddToCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
  campaigns: Campaign[];
  onAdd: (data: any) => void;
}

export const AddToCampaignModal: React.FC<AddToCampaignModalProps> = ({
  isOpen,
  onClose,
  customer,
  campaigns,
  onAdd,
}) => {
  const [campaignId, setCampaignId] = useState('');
  const [reason, setReason] = useState('');

  const selectedCampaign = campaigns.find((c) => c.id === campaignId);

  const handleAdd = () => {
    onAdd({
      campaignId,
      reason,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="캠페인 대상 등록"
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            등록
          </Button>
        </>
      }
    >
      <div className="space-y-5 modal">
        {/* 고객 정보 */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">등록 대상 고객</h4>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
              {customer.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-gray-900">{customer.name}</p>
              <p className="text-sm text-gray-500">
                {customer.membershipGrade} · {customer.email}
              </p>
            </div>
          </div>
        </div>

        {/* 캠페인 선택 */}
        <Select
          label="캠페인"
          required
          value={campaignId}
          onChange={(e) => setCampaignId(e.target.value)}
          options={campaigns
            .filter((c) => c.status === 'Active' || c.status === 'Draft')
            .map((c) => ({
              value: c.id,
              label: `${c.name} (${c.period.start} ~ ${c.period.end})`,
            }))}
          hint="진행중 또는 예정된 캠페인만 표시됩니다"
        />

        {/* 선택된 캠페인 정보 */}
        {selectedCampaign && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-blue-900">{selectedCampaign.name}</h4>
              <Badge
                variant={selectedCampaign.status === 'Active' ? 'success' : 'warning'}
              >
                {selectedCampaign.status === 'Active' ? '진행중' : '준비중'}
              </Badge>
            </div>
            <div className="space-y-1 text-sm text-blue-700">
              <p>기간: {selectedCampaign.period.start} ~ {selectedCampaign.period.end}</p>
              <p>채널: {selectedCampaign.channel}</p>
              {selectedCampaign.targetSummary && (
                <p>타겟: {selectedCampaign.targetSummary}</p>
              )}
            </div>
          </div>
        )}

        {/* 등록 사유 */}
        <Textarea
          label="등록 사유"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="고객을 이 캠페인에 추가하는 이유를 입력하세요 (선택)"
          rows={3}
        />

        {/* 안내 */}
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-blue-800">
            💡 캠페인에 등록된 고객은 캠페인 발송 시점에 자동으로 메시지를 받게 됩니다.
          </p>
        </div>
      </div>
    </Modal>
  );
};

