import React from 'react';
import { MessageSquare, Gift, Coins, UserPlus, FileText, Plus } from 'lucide-react';
import { Button } from '../ui/Button';

interface ActionPanelProps {
  onSendMessage: () => void;
  onIssueCoupon: () => void;
  onAwardPoints: () => void;
  onAddToCampaign: () => void;
  onEnterNote: () => void;
  onAddRecord: () => void;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({
  onSendMessage,
  onIssueCoupon,
  onAwardPoints,
  onAddToCampaign,
  onEnterNote,
  onAddRecord,
}) => {
  return (
    <div className="w-64 bg-white border-l border-gray-200 p-4 flex flex-col gap-3 aside-quick">
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Quick Actions</h3>
        <p className="text-xs text-gray-500">고객 대상 즉시 실행</p>
      </div>

      <div className="space-y-2">
        <Button
          variant="primary"
          icon={MessageSquare}
          fullWidth
          size="md"
          onClick={onSendMessage}
        >
          메시지 발송
        </Button>

        <Button
          variant="outline"
          icon={Gift}
          fullWidth
          size="md"
          onClick={onIssueCoupon}
        >
          쿠폰 발급
        </Button>

        <Button
          variant="outline"
          icon={Coins}
          fullWidth
          size="md"
          onClick={onAwardPoints}
        >
          포인트 지급
        </Button>

        <Button
          variant="outline"
          icon={UserPlus}
          fullWidth
          size="md"
          onClick={onAddToCampaign}
        >
          캠페인 등록
        </Button>

        <Button
          variant="outline"
          icon={FileText}
          fullWidth
          size="md"
          onClick={onEnterNote}
        >
          메모 등록
        </Button>

        <Button
          variant="outline"
          icon={Plus}
          fullWidth
          size="md"
          onClick={onAddRecord}
        >
          활동 기록
        </Button>
      </div>

      {/* 고객 통계 요약 */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-xs font-semibold text-gray-700 mb-3">최근 활동</h4>
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>오늘 방문</span>
            <span className="font-medium text-gray-900">3회</span>
          </div>
          <div className="flex justify-between">
            <span>장바구니</span>
            <span className="font-medium text-gray-900">2개</span>
          </div>
          <div className="flex justify-between">
            <span>미확인 메시지</span>
            <span className="font-medium text-primary-600">1건</span>
          </div>
        </div>
      </div>

      {/* 추천 액션 */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="text-xs font-semibold text-gray-700 mb-2">💡 추천 액션</h4>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-xs text-amber-900 font-medium mb-1">
            재구매 유도 쿠폰 발급
          </p>
          <p className="text-xs text-amber-700">
            최근 30일간 구매 이력이 없습니다
          </p>
        </div>
      </div>
    </div>
  );
};

