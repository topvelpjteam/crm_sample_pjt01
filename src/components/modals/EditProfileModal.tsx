import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Tabs } from '../ui/Tabs';
import { Customer } from '../../types/customer';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
  onSave: (data: any) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  customer,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    birthDate: customer.birthDate || '',
    gender: customer.gender || '',
    address: customer.address || '',
    interests: customer.interests.join(', '),
    preferredCategories: customer.preferredCategories.join(', '),
    lifecycleStage: customer.lifecycleStage,
    signupChannel: customer.signupChannel,
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave({
      ...formData,
      interests: formData.interests.split(',').map((s) => s.trim()).filter(Boolean),
      preferredCategories: formData.preferredCategories
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    });
    onClose();
  };

  const tabs = [
    {
      key: 'basic',
      label: '기본 정보',
      content: (
        <div className="space-y-4">
          <Input
            label="이름"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="생년월일"
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleChange('birthDate', e.target.value)}
            />
            <Select
              label="성별"
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              options={[
                { value: 'M', label: '남성' },
                { value: 'F', label: '여성' },
                { value: 'Other', label: '기타' },
              ]}
            />
          </div>

          <Input
            label="연락처"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />

          <Input
            label="주소"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
          />
        </div>
      ),
    },
    {
      key: 'preferences',
      label: '관심사/선호',
      content: (
        <div className="space-y-4">
          <Input
            label="관심사"
            value={formData.interests}
            onChange={(e) => handleChange('interests', e.target.value)}
            placeholder="쉼표(,)로 구분하여 입력"
            hint="예: 패션, 뷰티, 건강식품"
          />

          <Input
            label="선호 카테고리"
            value={formData.preferredCategories}
            onChange={(e) => handleChange('preferredCategories', e.target.value)}
            placeholder="쉼표(,)로 구분하여 입력"
            hint="예: 여성의류, 화장품, 액세서리"
          />
        </div>
      ),
    },
    {
      key: 'other',
      label: '기타 정보',
      content: (
        <div className="space-y-4">
          <Select
            label="라이프사이클 단계"
            value={formData.lifecycleStage}
            onChange={(e) => handleChange('lifecycleStage', e.target.value)}
            options={[
              { value: 'New', label: '신규' },
              { value: 'Active', label: '활성' },
              { value: 'At Risk', label: '휴면예정' },
              { value: 'Dormant', label: '휴면' },
              { value: 'Churned', label: '이탈' },
            ]}
          />

          <Select
            label="가입 경로"
            value={formData.signupChannel}
            onChange={(e) => handleChange('signupChannel', e.target.value)}
            options={[
              { value: '모바일 앱', label: '모바일 앱' },
              { value: 'PC 웹', label: 'PC 웹' },
              { value: '오프라인 매장', label: '오프라인 매장' },
              { value: '제휴사', label: '제휴사' },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="프로필 수정"
      size="lg"
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
      <Tabs tabs={tabs} />
    </Modal>
  );
};

