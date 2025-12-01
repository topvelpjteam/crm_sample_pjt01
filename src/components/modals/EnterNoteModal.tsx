import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Customer } from '../../types/customer';

interface EnterNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
  onSave: (data: any) => void;
}

export const EnterNoteModal: React.FC<EnterNoteModalProps> = ({
  isOpen,
  onClose,
  customer,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [priority, setPriority] = useState('Medium');

  const handleSave = () => {
    onSave({
      title: title || undefined,
      content,
      category,
      priority,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="메모 등록"
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleSave}>
            저장
          </Button>
        </>
      }
    >
      <div className="space-y-5 modal">
        {/* 고객 정보 */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">메모 대상</h4>
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

        {/* 메모 제목 */}
        <Input
          label="메모 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="메모 제목 (선택)"
        />

        {/* 메모 내용 */}
        <Textarea
          label="메모 내용"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="메모 내용을 입력하세요"
          rows={6}
        />

        {/* 분류 및 우선순위 */}
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="분류"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={[
              { value: 'General', label: '일반' },
              { value: 'CS', label: 'CS' },
              { value: 'Marketing', label: '마케팅' },
              { value: 'Sales', label: '영업' },
            ]}
          />

          <Select
            label="우선순위"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            options={[
              { value: 'High', label: '상' },
              { value: 'Medium', label: '중' },
              { value: 'Low', label: '하' },
            ]}
          />
        </div>

        {/* 안내 */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-blue-800">
            💡 메모는 팀 내에서 공유되며, 고객 이력 관리에 활용됩니다.
          </p>
        </div>
      </div>
    </Modal>
  );
};

