import React from 'react';
import { Edit, Mail, Phone, MapPin, Calendar, Tag } from 'lucide-react';
import { Customer } from '../../types/customer';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface ProfileViewProps {
  customer: Customer;
  onEdit: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ customer, onEdit }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  return (
    <div className="space-y-6">
      {/* 기본 정보 카드 */}
      <Card
        title="기본 정보"
        headerAction={
          <Button variant="outline" size="sm" icon={Edit} onClick={onEdit}>
            수정
          </Button>
        }
      >
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-500">이름</label>
            <p className="mt-1 text-base text-gray-900">{customer.name}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">고객 ID</label>
            <p className="mt-1 text-base text-gray-900 font-mono">{customer.id}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">이메일</label>
            <div className="mt-1 flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <p className="text-base text-gray-900">{customer.email}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">전화번호</label>
            <div className="mt-1 flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <p className="text-base text-gray-900">{customer.phone}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">생년월일</label>
            <div className="mt-1 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <p className="text-base text-gray-900">{formatDate(customer.birthDate)}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">성별</label>
            <p className="mt-1 text-base text-gray-900">
              {customer.gender === 'M' ? '남성' : customer.gender === 'F' ? '여성' : '기타'}
            </p>
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-500">주소</label>
            <div className="mt-1 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gray-400 mt-1" />
              <p className="text-base text-gray-900">{customer.address || '-'}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* 멤버십 & 라이프사이클 */}
      <Card title="멤버십 & 라이프사이클">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-500">멤버십 등급</label>
            <div className="mt-2">
              <Badge
                variant={
                  customer.membershipGrade === 'VIP'
                    ? 'danger'
                    : customer.membershipGrade === 'Gold'
                    ? 'warning'
                    : 'gray'
                }
                size="lg"
              >
                {customer.membershipGrade}
              </Badge>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">라이프사이클 단계</label>
            <div className="mt-2">
              <Badge
                variant={
                  customer.lifecycleStage === 'Active'
                    ? 'success'
                    : customer.lifecycleStage === 'At Risk'
                    ? 'warning'
                    : 'gray'
                }
                size="lg"
              >
                {customer.lifecycleStage}
              </Badge>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">가입 경로</label>
            <p className="mt-2 text-base text-gray-900">{customer.signupChannel}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">가입일</label>
            <p className="mt-2 text-base text-gray-900">{formatDate(customer.createdAt)}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">고객 기간</label>
            <p className="mt-2 text-base text-gray-900">
              {Math.floor(
                (new Date().getTime() - new Date(customer.createdAt).getTime()) /
                  (1000 * 60 * 60 * 24)
              )}{' '}
              일
            </p>
          </div>
        </div>
      </Card>

      {/* 관심사 & 선호 */}
      <Card title="관심사 & 선호 카테고리">
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4" />
              관심사
            </label>
            <div className="flex flex-wrap gap-2">
              {customer.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4" />
              선호 카테고리
            </label>
            <div className="flex flex-wrap gap-2">
              {customer.preferredCategories.map((category, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm font-medium"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* 동의 현황 */}
      <Card title="동의 현황">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">마케팅 수신 동의</p>
              <p className="text-sm text-gray-500 mt-1">SMS, 이메일, 카카오톡</p>
            </div>
            <Badge variant="success">동의</Badge>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">개인정보 수집 및 이용</p>
              <p className="text-sm text-gray-500 mt-1">필수</p>
            </div>
            <Badge variant="success">동의</Badge>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">제3자 정보 제공</p>
              <p className="text-sm text-gray-500 mt-1">선택</p>
            </div>
            <Badge variant="gray">미동의</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};

