// 고객 기본 정보
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  membershipGrade: 'VIP' | 'Gold' | 'Silver' | 'Bronze' | 'Basic';
  lifecycleStage: 'New' | 'Active' | 'At Risk' | 'Dormant' | 'Churned';
  clv: number;
  totalSales: number;
  lastPurchaseDate: string;
  churnRiskScore: number;
  birthDate?: string;
  gender?: 'M' | 'F' | 'Other';
  address?: string;
  interests: string[];
  preferredCategories: string[];
  signupChannel: string;
  createdAt: string;
}

// 주문 정보
export interface Order {
  id: string;
  orderId: string;
  orderDate: string;
  channel: string;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';
  totalAmount: number;
  items: OrderItem[];
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
  shipmentEvents?: ShipmentEvent[];
}

export interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discount: number;
  thumbnail?: string;
}

export interface ShippingInfo {
  recipient: string;
  phone: string;
  address: string;
  zipCode: string;
}

export interface PaymentInfo {
  method: string;
  totalAmount: number;
  discountAmount: number;
  pointsUsed: number;
  couponDiscount: number;
  paidAmount: number;
}

export interface ShipmentEvent {
  status: string;
  timestamp: string;
  location?: string;
  description: string;
}

// VOC (Voice of Customer)
export interface VOC {
  id: string;
  customerId: string;
  channel: 'Call' | 'Chat' | 'Email' | 'Visit' | 'Other';
  type: 'Complaint' | 'Inquiry' | 'Compliment' | 'Suggestion';
  title: string;
  content: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  department?: string;
  assignee?: string;
  dueDate?: string;
  createdAt: string;
  history: VOCHistory[];
}

export interface VOCHistory {
  id: string;
  timestamp: string;
  action: string;
  content: string;
  actor: string;
}

// 마케팅 터치포인트
export interface MarketingTouchpoint {
  id: string;
  campaignId: string;
  campaignName: string;
  channel: 'SMS' | 'KAKAO' | 'PUSH' | 'EMAIL';
  sentAt: string;
  opened: boolean;
  clicked: boolean;
  converted: boolean;
  openedAt?: string;
  clickedAt?: string;
}

// CTI 통화 기록
export interface CallRecord {
  id: string;
  callId: string;
  direction: 'Inbound' | 'Outbound';
  phoneNumber: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  status: 'Completed' | 'Missed' | 'Busy' | 'Failed';
  agent: string;
  category?: string;
  note?: string;
  recordingUrl?: string;
}

// 방문 기록
export interface Visit {
  id: string;
  visitDate: string;
  storeId: string;
  storeName: string;
  purpose: string;
  agent?: string;
  relatedOrders?: string[];
  note?: string;
}

// 채널 상호작용 이벤트
export interface ChannelEvent {
  id: string;
  eventType: string;
  eventTime: string;
  channel: 'App' | 'Web' | 'Mobile Web';
  device: 'PC' | 'Mobile' | 'Tablet';
  browser?: string;
  url?: string;
  screenName?: string;
  metadata?: Record<string, any>;
}

// 이탈 위험 분석
export interface ChurnRisk {
  riskScore: number;
  riskLevel: 'High' | 'Medium' | 'Low';
  rfmScore: {
    recency: number;
    frequency: number;
    monetary: number;
  };
  riskDrivers: RiskDriver[];
  trend: RiskTrendPoint[];
}

export interface RiskDriver {
  id: string;
  factor: string;
  description: string;
  impact: number;
}

export interface RiskTrendPoint {
  date: string;
  score: number;
}

// NBA (Next Best Action) 추천
export interface Recommendation {
  id: string;
  actionType: 'Message' | 'Coupon' | 'Points' | 'CS Call' | 'Campaign';
  title: string;
  description: string;
  expectedImpact: string;
  reason: string;
  priority: number;
  actionData?: Record<string, any>;
}

// 쿠폰
export interface Coupon {
  id: string;
  templateId: string;
  templateName: string;
  discountType: 'Fixed' | 'Percentage' | 'Free Shipping';
  discountValue: number;
  validFrom: string;
  validTo: string;
  usedAt?: string;
  status: 'Available' | 'Used' | 'Expired';
}

// 포인트 거래
export interface PointTransaction {
  id: string;
  type: 'Earn' | 'Spend' | 'Expire' | 'Award';
  amount: number;
  reason: string;
  timestamp: string;
  balance: number;
  expireDate?: string;
}

// 메모
export interface CustomerNote {
  id: string;
  title?: string;
  content: string;
  category: 'General' | 'CS' | 'Marketing' | 'Sales';
  priority: 'High' | 'Medium' | 'Low';
  createdBy: string;
  createdAt: string;
}

// 고객 활동 기록
export interface CustomerActivity {
  id: string;
  type: 'Visit' | 'Meeting' | 'Event' | 'Other';
  datetime: string;
  channel: string;
  description: string;
  operator?: string;
}

// 캠페인
export interface Campaign {
  id: string;
  name: string;
  period: {
    start: string;
    end: string;
  };
  channel: string;
  status: 'Draft' | 'Active' | 'Completed' | 'Cancelled';
  targetSummary?: string;
  metrics?: {
    sent: number;
    opened: number;
    clicked: number;
    converted: number;
  };
}

// 메시지 템플릿
export interface MessageTemplate {
  id: string;
  name: string;
  channel: 'SMS' | 'KAKAO' | 'PUSH' | 'EMAIL';
  subject?: string;
  body: string;
}

// 발신자 정보
export interface Sender {
  id: string;
  name: string;
  channel: 'SMS' | 'KAKAO' | 'PUSH' | 'EMAIL';
  identifier: string; // 전화번호 또는 이메일
}

