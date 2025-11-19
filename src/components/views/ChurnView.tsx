import React from 'react';
import { AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { ChurnRisk } from '../../types/customer';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChurnViewProps {
  churnRisk: ChurnRisk;
  onRiskDriverClick: (driver: ChurnRisk['riskDrivers'][0]) => void;
}

export const ChurnView: React.FC<ChurnViewProps> = ({ churnRisk, onRiskDriverClick }) => {
  const getRiskColor = (level: ChurnRisk['riskLevel']) => {
    switch (level) {
      case 'High':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskBadgeVariant = (level: ChurnRisk['riskLevel']) => {
    switch (level) {
      case 'High':
        return 'danger';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'success';
      default:
        return 'gray';
    }
  };

  const getRiskLevelText = (level: ChurnRisk['riskLevel']) => {
    switch (level) {
      case 'High':
        return '높음';
      case 'Medium':
        return '중간';
      case 'Low':
        return '낮음';
      default:
        return '-';
    }
  };

  return (
    <div className="space-y-6">
      {/* 이탈 위험 점수 메인 카드 */}
      <Card>
        <div className={`p-8 rounded-xl border-2 ${getRiskColor(churnRisk.riskLevel)}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-8 h-8" />
                <h2 className="text-2xl font-bold">이탈 위험 점수</h2>
              </div>
              <p className="text-sm opacity-80">고객의 이탈 가능성을 나타냅니다</p>
            </div>
            <div className="text-right">
              <div className="text-6xl font-bold mb-2">{churnRisk.riskScore}</div>
              <Badge variant={getRiskBadgeVariant(churnRisk.riskLevel)} size="lg">
                위험도: {getRiskLevelText(churnRisk.riskLevel)}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* RFM 점수 */}
      <Card title="RFM 분석" subtitle="최근성, 빈도, 금액 기반 고객 세분화">
        <div className="grid grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-blue-900">Recency (최근성)</p>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-4xl font-bold text-blue-900 mb-2">
              {churnRisk.rfmScore.recency}
            </div>
            <p className="text-xs text-blue-700">최근 구매일 기준</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-green-900">Frequency (빈도)</p>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-4xl font-bold text-green-900 mb-2">
              {churnRisk.rfmScore.frequency}
            </div>
            <p className="text-xs text-green-700">구매 빈도 기준</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-purple-900">Monetary (금액)</p>
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-4xl font-bold text-purple-900 mb-2">
              {churnRisk.rfmScore.monetary}
            </div>
            <p className="text-xs text-purple-700">구매 금액 기준</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>종합 평가:</strong> RFM 점수가 높을수록 우수한 고객입니다. 현재 고객은{' '}
            <strong className="text-primary-600">
              R:{churnRisk.rfmScore.recency}/F:{churnRisk.rfmScore.frequency}/M:
              {churnRisk.rfmScore.monetary}
            </strong>{' '}
            로 평가됩니다.
          </p>
        </div>
      </Card>

      {/* 이탈 위험 요인 */}
      <Card title="이탈 위험 요인" subtitle="고객 이탈에 영향을 주는 주요 요인">
        <div className="space-y-3">
          {churnRisk.riskDrivers.map((driver) => {
            const isPositive = driver.impact < 0;

            return (
              <div
                key={driver.id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onRiskDriverClick(driver)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-gray-900">{driver.factor}</h4>
                      {isPositive ? (
                        <TrendingDown className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{driver.description}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div
                      className={`text-lg font-bold ${
                        isPositive ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {driver.impact > 0 ? '+' : ''}
                      {driver.impact}
                    </div>
                    <p className="text-xs text-gray-500">영향도</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {churnRisk.riskDrivers.length === 0 && (
          <p className="text-center py-8 text-gray-500">위험 요인 정보가 없습니다.</p>
        )}
      </Card>

      {/* 이탈 위험 추이 */}
      <Card title="이탈 위험 점수 추이" subtitle="최근 6개월 변화">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={churnRisk.trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <p className="text-xs text-gray-500 mb-1">최고점</p>
            <p className="text-lg font-bold text-gray-900">
              {Math.max(...churnRisk.trend.map((t) => t.score))}
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <p className="text-xs text-gray-500 mb-1">최저점</p>
            <p className="text-lg font-bold text-gray-900">
              {Math.min(...churnRisk.trend.map((t) => t.score))}
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <p className="text-xs text-gray-500 mb-1">평균</p>
            <p className="text-lg font-bold text-gray-900">
              {(
                churnRisk.trend.reduce((sum, t) => sum + t.score, 0) /
                churnRisk.trend.length
              ).toFixed(0)}
            </p>
          </div>
        </div>
      </Card>

      {/* 개선 권장 사항 */}
      <Card title="💡 개선 권장 사항">
        <div className="space-y-3">
          {churnRisk.riskLevel === 'High' ? (
            <>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm font-medium text-red-900 mb-2">긴급 조치 필요</p>
                <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                  <li>즉시 고객 상담 진행</li>
                  <li>VIP 혜택 및 특별 쿠폰 제공</li>
                  <li>만족도 조사 및 피드백 수집</li>
                </ul>
              </div>
            </>
          ) : churnRisk.riskLevel === 'Medium' ? (
            <>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm font-medium text-yellow-900 mb-2">예방 조치 권장</p>
                <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                  <li>맞춤형 프로모션 메시지 발송</li>
                  <li>관심 카테고리 신상품 안내</li>
                  <li>재구매 유도 쿠폰 제공</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium text-green-900 mb-2">현재 상태 양호</p>
                <ul className="text-sm text-green-700 space-y-1 list-disc list-inside">
                  <li>정기적인 혜택 제공으로 관계 유지</li>
                  <li>고객 만족도 지속 모니터링</li>
                  <li>VIP 등급 승급 검토</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

