import React from 'react';
import { Target, MessageSquare, Gift, Coins, Phone, UserPlus, TrendingUp, Zap } from 'lucide-react';
import { Recommendation } from '../../types/customer';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface RecommendationsViewProps {
  recommendations: Recommendation[];
  onExecuteAction: (recommendation: Recommendation) => void;
}

export const RecommendationsView: React.FC<RecommendationsViewProps> = ({
  recommendations,
  onExecuteAction,
}) => {
  const getActionIcon = (actionType: Recommendation['actionType']) => {
    switch (actionType) {
      case 'Message':
        return MessageSquare;
      case 'Coupon':
        return Gift;
      case 'Points':
        return Coins;
      case 'CS Call':
        return Phone;
      case 'Campaign':
        return UserPlus;
      default:
        return Target;
    }
  };

  const getActionColor = (actionType: Recommendation['actionType']) => {
    switch (actionType) {
      case 'Message':
        return 'from-blue-500 to-blue-600';
      case 'Coupon':
        return 'from-purple-500 to-purple-600';
      case 'Points':
        return 'from-yellow-500 to-yellow-600';
      case 'CS Call':
        return 'from-green-500 to-green-600';
      case 'Campaign':
        return 'from-red-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getActionBadgeVariant = (actionType: Recommendation['actionType']) => {
    switch (actionType) {
      case 'Message':
        return 'primary';
      case 'Coupon':
        return 'success';
      case 'Points':
        return 'warning';
      case 'CS Call':
        return 'danger';
      default:
        return 'gray';
    }
  };

  const topRecommendations = recommendations.slice(0, 3);
  const otherRecommendations = recommendations.slice(3);

  return (
    <div className="space-y-6">
      {/* 헤더 설명 */}
      <Card>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
            <Target className="w-8 h-8 text-primary-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Next Best Action 추천
            </h3>
            <p className="text-sm text-gray-600">
              AI가 분석한 고객 데이터를 기반으로 현재 시점에서 가장 효과적인 액션을
              추천합니다. 각 추천은 예상 효과와 근거를 포함하고 있습니다.
            </p>
          </div>
        </div>
      </Card>

      {/* Top 3 추천 액션 */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-yellow-500" />
          <h2 className="text-lg font-semibold text-gray-900">우선순위 높은 추천</h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {topRecommendations.map((rec, index) => {
            const Icon = getActionIcon(rec.actionType);
            const colorClass = getActionColor(rec.actionType);

            return (
              <div
                key={rec.id}
                className="relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white hover:shadow-lg transition-all"
              >
                {/* Priority Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow-md">
                    <span className="text-2xl font-bold text-primary-600">#{index + 1}</span>
                    <span className="text-xs font-medium text-gray-600">우선순위</span>
                  </div>
                </div>

                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-5`} />

                <div className="relative p-6">
                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div className={`p-4 bg-gradient-to-br ${colorClass} rounded-2xl`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <Badge variant={getActionBadgeVariant(rec.actionType)} size="md">
                            {rec.actionType}
                          </Badge>
                          <h3 className="text-xl font-bold text-gray-900 mt-2">{rec.title}</h3>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{rec.description}</p>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="w-4 h-4 text-blue-600" />
                            <p className="text-xs font-medium text-blue-900">기대 효과</p>
                          </div>
                          <p className="text-sm text-blue-700">{rec.expectedImpact}</p>
                        </div>

                        <div className="p-3 bg-purple-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Target className="w-4 h-4 text-purple-600" />
                            <p className="text-xs font-medium text-purple-900">추천 근거</p>
                          </div>
                          <p className="text-sm text-purple-700">{rec.reason}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button
                          variant="primary"
                          onClick={() => onExecuteAction(rec)}
                          className="flex-1"
                        >
                          즉시 실행
                        </Button>
                        <Button variant="outline" className="flex-1">
                          상세 설정
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 기타 추천 액션 */}
      {otherRecommendations.length > 0 && (
        <Card title="추가 추천 액션" subtitle="우선순위는 낮지만 고려할 만한 액션">
          <div className="space-y-3">
            {otherRecommendations.map((rec, index) => {
              const Icon = getActionIcon(rec.actionType);
              const colorClass = getActionColor(rec.actionType);

              return (
                <div
                  key={rec.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 bg-gradient-to-br ${colorClass} rounded-xl`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={getActionBadgeVariant(rec.actionType)}>
                          {rec.actionType}
                        </Badge>
                        <span className="text-xs text-gray-500">#{topRecommendations.length + index + 1}</span>
                      </div>
                      <h4 className="text-base font-semibold text-gray-900 mb-1">
                        {rec.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                      <p className="text-xs text-gray-500">{rec.reason}</p>
                    </div>

                    <div className="flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onExecuteAction(rec)}
                      >
                        실행
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* 추천 설명 */}
      <Card title="💡 추천 시스템 안내">
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">
              추천 액션은 어떻게 결정되나요?
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              고객의 구매 이력, 행동 패턴, RFM 점수, 이탈 위험도, 관심사 등 다양한
              데이터를 AI가 종합적으로 분석하여 현재 시점에서 가장 효과적인 액션을
              제안합니다.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900 mb-1">데이터 기반</p>
              <p className="text-xs text-blue-700">
                과거 유사 고객의 반응 데이터를 학습하여 높은 정확도로 예측합니다.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-900 mb-1">실시간 업데이트</p>
              <p className="text-xs text-green-700">
                고객 활동이 발생할 때마다 추천 내용이 자동으로 갱신됩니다.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* 빈 상태 */}
      {recommendations.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">현재 추천할 액션이 없습니다.</p>
            <p className="text-sm text-gray-400">
              고객 데이터가 축적되면 자동으로 추천이 생성됩니다.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

