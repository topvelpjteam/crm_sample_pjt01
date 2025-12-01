import React from 'react';
import { Phone, MessageSquare, UserPlus, AlertCircle, TrendingUp, ShoppingBag, Calendar } from 'lucide-react';
import { Customer } from '../../types/customer';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface CustomerHeaderProps {
  customer: Customer;
  onSendMessage: () => void;
  onCall: () => void;
  onAddToCampaign: () => void;
}

export const CustomerHeader: React.FC<CustomerHeaderProps> = ({
  customer,
  onSendMessage,
  onCall,
  onAddToCampaign,
}) => {
  const getGradeBadgeVariant = (grade: string) => {
    switch (grade) {
      case 'VIP':
        return 'danger';
      case 'Gold':
        return 'warning';
      case 'Silver':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const getLifecycleBadgeVariant = (stage: string) => {
    switch (stage) {
      case 'Active':
        return 'success';
      case 'At Risk':
        return 'warning';
      case 'Dormant':
      case 'Churned':
        return 'danger';
      default:
        return 'primary';
    }
  };

  const getRiskBadgeVariant = (score: number) => {
    if (score >= 70) return 'danger';
    if (score >= 40) return 'warning';
    return 'success';
  };

  const getRiskLevel = (score: number) => {
    if (score >= 70) return 'HIGH';
    if (score >= 40) return 'MEDIUM';
    return 'LOW';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  return (
    <div className="bg-white border-b border-gray-200">
      {/* 고객 기본 정보 섹션 */}
      <div className="px-6 py-6 border-b border-gray-100 content-header">
        <div className="flex items-start justify-between">
          {/* 좌측: 프로필 정보 */}
          <div className="flex items-start gap-4">
            {/* 아바타 */}
            <div className="relative">
              {customer.avatar ? (
                <img
                  src={customer.avatar}
                  alt={customer.name}
                  className="w-20 h-20 rounded-full border-2 border-gray-200"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-2xl font-semibold">
                  {customer.name.charAt(0)}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full" />
            </div>

            {/* 기본 정보 */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
                <Badge variant={getGradeBadgeVariant(customer.membershipGrade)} size="md">
                  {customer.membershipGrade}
                </Badge>
                <Badge variant={getLifecycleBadgeVariant(customer.lifecycleStage)} size="md">
                  {customer.lifecycleStage}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>ID: {customer.id}</span>
                <span>•</span>
                <span>{customer.email}</span>
                <span>•</span>
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {customer.interests.slice(0, 4).map((interest, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 우측: 액션 버튼 */}
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              icon={MessageSquare}
              onClick={onSendMessage}
            >
              메시지 발송
            </Button>
            <Button variant="outline" icon={Phone} onClick={onCall}>
              전화 연결
            </Button>
            <Button variant="outline" icon={UserPlus} onClick={onAddToCampaign}>
              캠페인 등록
            </Button>
          </div>
        </div>
      </div>

      {/* KPI 섹션 */}
      <div className="px-6 py-4 bg-gray-50 cont-box">
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-gray-700 font-bold mb-2">고객 생애가치</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(customer.clv)}
                </p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg ico ico1">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-gray-700 font-bold mb-2">총 구매액</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(customer.totalSales)}
                </p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg ico ico2">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-gray-700 font-bold mb-2">최근 구매일</p>
                <p className="text-base font-bold text-gray-900">
                  {formatDate(customer.lastPurchaseDate)}
                </p>
                <p className="text-xs text-gray-500 mt-3">
                  {Math.floor(
                    (new Date().getTime() - new Date(customer.lastPurchaseDate).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}
                  일 전
                </p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg ico ico3">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-gray-700 font-bold mb-2">이탈 위험도</p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-gray-900">
                    {customer.churnRiskScore}
                  </p>
                  <Badge
                    variant={getRiskBadgeVariant(customer.churnRiskScore)}
                    size="sm"
                  >
                    {getRiskLevel(customer.churnRiskScore)}
                  </Badge>
                </div>
              </div>
              <div className="p-2 bg-orange-50 rounded-lg ico ico4">
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-gray-700 font-bold mb-2">가입 경로</p>
                <p className="text-base font-bold text-gray-900">
                  {customer.signupChannel}
                </p>
                <p className="text-xs text-gray-500 mt-3">
                  {formatDate(customer.createdAt)} 가입
                </p>
              </div>
              <div className="p-2 bg-orange-50 rounded-lg ico ico5">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

