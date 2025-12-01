import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Customer } from '../../types/customer';

interface NewVOCModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
  onSubmit: (data: any) => void;
}

export const NewVOCModal: React.FC<NewVOCModalProps> = ({
  isOpen,
  onClose,
  customer,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    channel: '',
    type: '',
    title: '',
    content: '',
    priority: 'Medium' as const,
    departmentId: '',
    assigneeId: '',
    dueDate: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="신규 VOC 등록"
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            등록
          </Button>
        </>
      }
    >
      <div className="space-y-5 modal">
        {/* 고객 정보 */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">고객 정보</h4>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
              {customer.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-gray-900">{customer.name}</p>
              <p className="text-sm text-gray-500">{customer.phone}</p>
            </div>
          </div>
        </div>

        {/* 채널 및 유형 */}
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="접수 채널"
            required
            value={formData.channel}
            onChange={(e) => handleChange('channel', e.target.value)}
            options={[
              { value: 'Call', label: '전화' },
              { value: 'Chat', label: '채팅' },
              { value: 'Email', label: '이메일' },
              { value: 'Visit', label: '방문' },
              { value: 'Other', label: '기타' },
            ]}
          />

          <Select
            label="VOC 유형"
            required
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            options={[
              { value: 'Complaint', label: '불만' },
              { value: 'Inquiry', label: '문의' },
              { value: 'Compliment', label: '칭찬' },
              { value: 'Suggestion', label: '제안' },
            ]}
          />
        </div>

        {/* 제목 */}
        <Input
          label="제목"
          required
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="VOC 제목을 입력하세요"
        />

        {/* 상세 내용 */}
        <Textarea
          label="상세 내용"
          required
          value={formData.content}
          onChange={(e) => handleChange('content', e.target.value)}
          placeholder="VOC 상세 내용을 입력하세요"
          rows={5}
        />

        {/* 우선순위 */}
        <Select
          label="우선순위"
          value={formData.priority}
          onChange={(e) => handleChange('priority', e.target.value)}
          options={[
            { value: 'High', label: '상' },
            { value: 'Medium', label: '중' },
            { value: 'Low', label: '하' },
          ]}
        />

        {/* 담당 부서 및 담당자 */}
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="담당 부서"
            value={formData.departmentId}
            onChange={(e) => handleChange('departmentId', e.target.value)}
            options={[
              { value: 'DEPT-CS', label: 'CS팀' },
              { value: 'DEPT-SALES', label: '영업팀' },
              { value: 'DEPT-PRODUCT', label: '상품팀' },
              { value: 'DEPT-TECH', label: '기술팀' },
            ]}
          />

          <Select
            label="담당자"
            value={formData.assigneeId}
            onChange={(e) => handleChange('assigneeId', e.target.value)}
            options={[
              { value: 'USER-001', label: '박상담' },
              { value: 'USER-002', label: '김상담' },
              { value: 'USER-003', label: '이상담' },
            ]}
          />
        </div>

        {/* SLA 마감일 */}
        <Input
          label="SLA 마감일"
          type="date"
          value={formData.dueDate}
          onChange={(e) => handleChange('dueDate', e.target.value)}
          hint="처리 완료 목표일"
        />

        {/* 안내 */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800">
            💡 VOC 등록 시 담당자에게 알림이 자동으로 전송됩니다.
          </p>
        </div>
      </div>
    </Modal>
  );
};

