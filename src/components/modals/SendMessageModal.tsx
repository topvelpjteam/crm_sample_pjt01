import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { MessageTemplate, Sender, Customer } from '../../types/customer';

interface SendMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
  templates: MessageTemplate[];
  senders: Sender[];
  onSend: (data: any) => void;
}

export const SendMessageModal: React.FC<SendMessageModalProps> = ({
  isOpen,
  onClose,
  customer,
  templates,
  senders,
  onSend,
}) => {
  const [channel, setChannel] = useState<'SMS' | 'KAKAO' | 'PUSH' | 'EMAIL'>('KAKAO');
  const [senderId, setSenderId] = useState('');
  const [templateId, setTemplateId] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [scheduleType, setScheduleType] = useState<'IMMEDIATE' | 'RESERVED'>('IMMEDIATE');
  const [scheduleDatetime, setScheduleDatetime] = useState('');

  const channelSenders = senders.filter((s) => s.channel === channel);
  const channelTemplates = templates.filter((t) => t.channel === channel);

  const handleTemplateChange = (templateId: string) => {
    setTemplateId(templateId);
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setTitle(template.subject || '');
      setBody(template.body);
    }
  };

  const handleSend = () => {
    onSend({
      channel,
      senderId,
      templateId,
      title,
      body,
      scheduleType,
      scheduleDatetime: scheduleType === 'RESERVED' ? scheduleDatetime : undefined,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="메시지 발송"
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleSend}>
            발송
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* 고객 정보 */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">고객 정보</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">이름:</span>{' '}
              <span className="font-medium">{customer.name}</span>
            </div>
            <div>
              <span className="text-gray-500">ID:</span>{' '}
              <span className="font-mono text-xs">{customer.id}</span>
            </div>
            <div>
              <span className="text-gray-500">전화번호:</span>{' '}
              <span className="font-medium">{customer.phone}</span>
            </div>
            <div>
              <span className="text-gray-500">이메일:</span>{' '}
              <span className="font-medium">{customer.email}</span>
            </div>
          </div>
        </div>

        {/* 채널 선택 */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-3 block">
            발송 채널 <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(['SMS', 'KAKAO', 'PUSH', 'EMAIL'] as const).map((ch) => (
              <button
                key={ch}
                onClick={() => setChannel(ch)}
                className={`p-3 border-2 rounded-lg font-medium transition-all ${
                  channel === ch
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                {ch}
              </button>
            ))}
          </div>
        </div>

        {/* 발신자 선택 */}
        <Select
          label="발신번호/계정"
          required
          value={senderId}
          onChange={(e) => setSenderId(e.target.value)}
          options={channelSenders.map((s) => ({
            value: s.id,
            label: `${s.name} (${s.identifier})`,
          }))}
        />

        {/* 템플릿 선택 */}
        <Select
          label="템플릿"
          value={templateId}
          onChange={(e) => handleTemplateChange(e.target.value)}
          options={channelTemplates.map((t) => ({
            value: t.id,
            label: t.name,
          }))}
          hint="템플릿을 선택하면 내용이 자동으로 채워집니다"
        />

        {/* 제목 (EMAIL/PUSH만) */}
        {(channel === 'EMAIL' || channel === 'PUSH') && (
          <Input
            label="제목"
            required={channel === 'EMAIL' || channel === 'PUSH'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="메시지 제목을 입력하세요"
          />
        )}

        {/* 본문 */}
        <Textarea
          label="메시지 본문"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="메시지 내용을 입력하세요"
          rows={6}
        />

        {/* 발송 유형 */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-3 block">
            발송 시간 <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => setScheduleType('IMMEDIATE')}
              className={`p-3 border-2 rounded-lg font-medium transition-all ${
                scheduleType === 'IMMEDIATE'
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              즉시 발송
            </button>
            <button
              onClick={() => setScheduleType('RESERVED')}
              className={`p-3 border-2 rounded-lg font-medium transition-all ${
                scheduleType === 'RESERVED'
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              예약 발송
            </button>
          </div>

          {scheduleType === 'RESERVED' && (
            <Input
              type="datetime-local"
              value={scheduleDatetime}
              onChange={(e) => setScheduleDatetime(e.target.value)}
              required
            />
          )}
        </div>

        {/* 수신 동의 상태 */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">마케팅 수신 동의</span>
            <Badge variant="success">동의</Badge>
          </div>
          <p className="text-xs text-blue-700 mt-1">
            고객이 마케팅 정보 수신에 동의하였습니다.
          </p>
        </div>
      </div>
    </Modal>
  );
};

