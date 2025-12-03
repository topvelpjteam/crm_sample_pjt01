import { Customer, Order, VOC, MarketingTouchpoint, CallRecord, Visit, ChannelEvent, ChurnRisk, Recommendation, Coupon, PointTransaction, CustomerNote, Campaign, MessageTemplate, Sender } from '../types/customer';

// Mock Customer Data
export const mockCustomer: Customer = {
  id: 'CUST-2024-001',
  name: '김지민',
  email: 'jimin.kim@example.com',
  phone: '010-1234-5678',
  avatar: '/assets/images/jimin_photo.jpg',
  membershipGrade: 'VIP',
  lifecycleStage: 'Active',
  clv: 15800000,
  totalSales: 12500000,
  lastPurchaseDate: '2024-11-15',
  churnRiskScore: 15,
  birthDate: '1992-03-15',
  gender: 'F',
  address: '서울특별시 강남구 테헤란로 123',
  interests: ['패션', '뷰티', '건강식품', '여행'],
  preferredCategories: ['여성의류', '화장품', '액세서리'],
  signupChannel: '모바일 앱',
  createdAt: '2022-06-10',
};

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: '1',
    orderId: 'ORD-2024-11-001',
    orderDate: '2024-11-15T14:30:00',
    channel: '자사몰(앱)',
    status: 'Delivered',
    totalAmount: 285000,
    items: [
      {
        id: '1',
        productName: '프리미엄 원피스',
        quantity: 1,
        unitPrice: 189000,
        totalPrice: 189000,
        discount: 0,
      },
      {
        id: '2',
        productName: '레더 핸드백',
        quantity: 1,
        unitPrice: 120000,
        totalPrice: 120000,
        discount: 24000,
      },
    ],
    shippingInfo: {
      recipient: '김지민',
      phone: '010-1234-5678',
      address: '서울특별시 강남구 테헤란로 123, 101동 501호',
      zipCode: '06234',
    },
    paymentInfo: {
      method: '신용카드',
      totalAmount: 309000,
      discountAmount: 24000,
      pointsUsed: 0,
      couponDiscount: 0,
      paidAmount: 285000,
    },
    shipmentEvents: [
      { status: '배송완료', timestamp: '2024-11-18T09:30:00', location: '서울 강남', description: '배송이 완료되었습니다.' },
      { status: '배송중', timestamp: '2024-11-17T14:20:00', location: '서울 물류센터', description: '배송 중입니다.' },
      { status: '출고', timestamp: '2024-11-16T10:00:00', location: '물류센터', description: '상품이 출고되었습니다.' },
    ],
  },
  {
    id: '2',
    orderId: 'ORD-2024-10-045',
    orderDate: '2024-10-22T11:20:00',
    channel: '자사몰(웹)',
    status: 'Delivered',
    totalAmount: 156000,
    items: [
      {
        id: '3',
        productName: '시그니처 블라우스',
        quantity: 2,
        unitPrice: 89000,
        totalPrice: 178000,
        discount: 22000,
      },
    ],
    shippingInfo: {
      recipient: '김지민',
      phone: '010-1234-5678',
      address: '서울특별시 강남구 테헤란로 123, 101동 501호',
      zipCode: '06234',
    },
    paymentInfo: {
      method: '신용카드',
      totalAmount: 178000,
      discountAmount: 22000,
      pointsUsed: 0,
      couponDiscount: 0,
      paidAmount: 156000,
    },
  },
  {
    id: '3',
    orderId: 'ORD-2024-09-120',
    orderDate: '2024-09-05T16:45:00',
    channel: '오프라인매장',
    status: 'Delivered',
    totalAmount: 420000,
    items: [
      {
        id: '4',
        productName: '가을 자켓',
        quantity: 1,
        unitPrice: 298000,
        totalPrice: 298000,
        discount: 0,
      },
      {
        id: '5',
        productName: '슬랙스 팬츠',
        quantity: 1,
        unitPrice: 122000,
        totalPrice: 122000,
        discount: 0,
      },
    ],
    shippingInfo: {
      recipient: '김지민',
      phone: '010-1234-5678',
      address: '서울특별시 강남구 테헤란로 123, 101동 501호',
      zipCode: '06234',
    },
    paymentInfo: {
      method: '신용카드',
      totalAmount: 420000,
      discountAmount: 0,
      pointsUsed: 5000,
      couponDiscount: 0,
      paidAmount: 415000,
    },
  },
];

// Mock VOC
export const mockVOCs: VOC[] = [
  {
    id: '1',
    customerId: 'CUST-2024-001',
    channel: 'Call',
    type: 'Inquiry',
    title: '제품 교환 문의',
    content: '구매한 원피스 사이즈가 맞지 않아 교환하고 싶습니다.',
    priority: 'Medium',
    status: 'Resolved',
    department: 'CS팀',
    assignee: '박상담',
    dueDate: '2024-11-20',
    createdAt: '2024-11-18T10:30:00',
    history: [
      {
        id: '1',
        timestamp: '2024-11-18T10:30:00',
        action: 'VOC 등록',
        content: '고객이 원피스 교환을 요청함',
        actor: '시스템',
      },
      {
        id: '2',
        timestamp: '2024-11-18T14:20:00',
        action: '처리 완료',
        content: '교환 승인 및 반품 택배 수거 예약 완료',
        actor: '박상담',
      },
    ],
  },
  {
    id: '2',
    customerId: 'CUST-2024-001',
    channel: 'Email',
    type: 'Compliment',
    title: '상품 품질 만족',
    content: '구매한 핸드백 품질이 매우 좋습니다. 감사합니다.',
    priority: 'Low',
    status: 'Closed',
    createdAt: '2024-11-10T09:15:00',
    history: [],
  },
];

// Mock Marketing Touchpoints
export const mockTouchpoints: MarketingTouchpoint[] = [
  {
    id: '1',
    campaignId: 'CAMP-2024-11',
    campaignName: '가을 시즌 특가',
    channel: 'KAKAO',
    sentAt: '2024-11-01T10:00:00',
    opened: true,
    clicked: true,
    converted: true,
    openedAt: '2024-11-01T11:30:00',
    clickedAt: '2024-11-01T11:32:00',
  },
  {
    id: '2',
    campaignId: 'CAMP-2024-10',
    campaignName: 'VIP 고객 전용 쿠폰',
    channel: 'PUSH',
    sentAt: '2024-10-15T15:00:00',
    opened: true,
    clicked: false,
    converted: false,
    openedAt: '2024-10-15T16:20:00',
  },
  {
    id: '3',
    campaignId: 'CAMP-2024-09',
    campaignName: '신규 컬렉션 런칭',
    channel: 'EMAIL',
    sentAt: '2024-09-20T09:00:00',
    opened: true,
    clicked: true,
    converted: false,
    openedAt: '2024-09-20T10:45:00',
    clickedAt: '2024-09-20T10:50:00',
  },
];

// Mock Call Records
export const mockCallRecords: CallRecord[] = [
  {
    id: '1',
    callId: 'CALL-2024-11-180001',
    direction: 'Inbound',
    phoneNumber: '010-1234-5678',
    startTime: '2024-11-18T10:30:00',
    endTime: '2024-11-18T10:42:00',
    duration: 720,
    status: 'Completed',
    agent: '박상담',
    category: '교환/반품',
    note: '원피스 사이즈 교환 요청. 반품 택배 수거 예약 완료.',
    recordingUrl: '#',
  },
  {
    id: '2',
    callId: 'CALL-2024-10-250002',
    direction: 'Outbound',
    phoneNumber: '010-1234-5678',
    startTime: '2024-10-25T14:15:00',
    endTime: '2024-10-25T14:20:00',
    duration: 300,
    status: 'Completed',
    agent: '이상담',
    category: '만족도 조사',
    note: 'VIP 고객 만족도 조사 완료. 매우 만족',
  },
];

// Mock Visits
export const mockVisits: Visit[] = [
  {
    id: '1',
    visitDate: '2024-09-05T15:30:00',
    storeId: 'STORE-001',
    storeName: '강남 플래그십 스토어',
    purpose: '상품 구매',
    agent: '김매니저',
    relatedOrders: ['ORD-2024-09-120'],
    note: '가을 신상품 구매. VIP 라운지 이용',
  },
  {
    id: '2',
    visitDate: '2024-07-20T11:00:00',
    storeId: 'STORE-001',
    storeName: '강남 플래그십 스토어',
    purpose: '스타일링 상담',
    agent: '최스타일리스트',
    note: '여름 시즌 스타일링 상담',
  },
];

// Mock Channel Events
export const mockChannelEvents: ChannelEvent[] = [
  {
    id: '1',
    eventType: 'PAGE_VIEW',
    eventTime: '2024-11-19T10:30:00',
    channel: 'App',
    device: 'Mobile',
    screenName: '신상품 목록',
    metadata: { category: '여성의류', subcategory: '원피스' },
  },
  {
    id: '2',
    eventType: 'PRODUCT_CLICK',
    eventTime: '2024-11-19T10:32:00',
    channel: 'App',
    device: 'Mobile',
    screenName: '상품 상세',
    metadata: { productId: 'PROD-12345', productName: '프리미엄 원피스' },
  },
  {
    id: '3',
    eventType: 'ADD_TO_CART',
    eventTime: '2024-11-19T10:35:00',
    channel: 'App',
    device: 'Mobile',
    screenName: '장바구니',
    metadata: { productId: 'PROD-12345', quantity: 1 },
  },
];

// Mock Churn Risk
export const mockChurnRisk: ChurnRisk = {
  riskScore: 15,
  riskLevel: 'Low',
  rfmScore: {
    recency: 5,
    frequency: 5,
    monetary: 4,
  },
  riskDrivers: [
    {
      id: '1',
      factor: '최근 구매 활동',
      description: '최근 30일 내 구매 이력 존재',
      impact: -10,
    },
    {
      id: '2',
      factor: '평균 구매 주기',
      description: '평균 구매 주기 대비 정상 범위',
      impact: -5,
    },
  ],
  trend: [
    { date: '2024-05', score: 20 },
    { date: '2024-06', score: 18 },
    { date: '2024-07', score: 22 },
    { date: '2024-08', score: 15 },
    { date: '2024-09', score: 12 },
    { date: '2024-10', score: 10 },
    { date: '2024-11', score: 15 },
  ],
};

// Mock Recommendations
export const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    actionType: 'Coupon',
    title: '재구매 유도 쿠폰 발급',
    description: '다음 구매 시 사용할 수 있는 15% 할인 쿠폰을 발급하세요',
    expectedImpact: '재구매율 25% 증가 예상',
    reason: '최근 구매 후 30일 경과, 높은 만족도 기록',
    priority: 1,
    actionData: { couponType: 'PERCENTAGE', value: 15, validDays: 30 },
  },
  {
    id: '2',
    actionType: 'Message',
    title: '신상품 입고 알림',
    description: '고객 관심 카테고리의 신상품 입고 알림을 발송하세요',
    expectedImpact: '클릭률 35% 예상',
    reason: '패션, 여성의류 카테고리에 높은 관심도',
    priority: 2,
    actionData: { channel: 'KAKAO', templateId: 'TPL-NEW-ARRIVAL' },
  },
  {
    id: '3',
    actionType: 'Campaign',
    title: 'VIP 전용 이벤트 초대',
    description: 'VIP 고객 대상 특별 세일 이벤트에 초대하세요',
    expectedImpact: '참여율 60% 예상',
    reason: 'VIP 등급, 높은 구매력',
    priority: 3,
  },
];

// Mock Coupons
export const mockCoupons: Coupon[] = [
  {
    id: '1',
    templateId: 'TPL-001',
    templateName: 'VIP 전용 15% 할인',
    discountType: 'Percentage',
    discountValue: 15,
    validFrom: '2024-11-01',
    validTo: '2024-12-31',
    status: 'Available',
  },
  {
    id: '2',
    templateId: 'TPL-002',
    templateName: '무료배송 쿠폰',
    discountType: 'Free Shipping',
    discountValue: 0,
    validFrom: '2024-11-01',
    validTo: '2024-11-30',
    status: 'Available',
  },
];

// Mock Point Transactions
export const mockPointTransactions: PointTransaction[] = [
  {
    id: '1',
    type: 'Earn',
    amount: 2850,
    reason: '주문 적립 (ORD-2024-11-001)',
    timestamp: '2024-11-18T09:30:00',
    balance: 12850,
  },
  {
    id: '2',
    type: 'Spend',
    amount: -5000,
    reason: '주문 사용 (ORD-2024-09-120)',
    timestamp: '2024-09-05T16:45:00',
    balance: 10000,
  },
];

// Mock Customer Notes
export const mockNotes: CustomerNote[] = [
  {
    id: '1',
    title: 'VIP 고객 특별 관리 대상',
    content: '연간 구매액 1,000만원 이상, 충성도 높음. 신상품 우선 안내 필요',
    category: 'Marketing',
    priority: 'High',
    createdBy: '마케팅팀',
    createdAt: '2024-10-01T10:00:00',
  },
  {
    id: '2',
    content: '교환 처리 완료. 고객 매우 만족',
    category: 'CS',
    priority: 'Medium',
    createdBy: '박상담',
    createdAt: '2024-11-18T14:30:00',
  },
];

// Mock Campaigns
export const mockCampaigns: Campaign[] = [
  {
    id: 'CAMP-2024-12',
    name: '연말 특별 세일',
    period: { start: '2024-12-01', end: '2024-12-31' },
    channel: 'Multi-channel',
    status: 'Active',
    targetSummary: 'VIP 고객 1,234명',
  },
  {
    id: 'CAMP-2024-11',
    name: '가을 시즌 특가',
    period: { start: '2024-11-01', end: '2024-11-30' },
    channel: 'KAKAO, PUSH',
    status: 'Active',
  },
];

// Mock Message Templates
export const mockTemplates: MessageTemplate[] = [
  {
    id: 'TPL-001',
    name: '장바구니 리마인더',
    channel: 'KAKAO',
    body: '고객님, 장바구니에 상품이 있습니다. 지금 구매하시면 특별 할인 혜택을 드립니다!',
  },
  {
    id: 'TPL-002',
    name: '신상품 입고 알림',
    channel: 'PUSH',
    subject: '고객님이 좋아하실 신상품이 입고되었습니다',
    body: '고객님의 관심 카테고리에 새로운 상품이 입고되었습니다. 지금 확인해보세요!',
  },
  {
    id: 'TPL-003',
    name: 'VIP 쿠폰 발급',
    channel: 'EMAIL',
    subject: 'VIP 고객님께 특별한 선물을 드립니다',
    body: 'VIP 고객님께 감사의 마음을 담아 15% 할인 쿠폰을 드립니다.',
  },
];

// Mock Senders
export const mockSenders: Sender[] = [
  { id: 'SND-001', name: 'CRM 시스템', channel: 'SMS', identifier: '1588-1234' },
  { id: 'SND-002', name: 'CRM 알림톡', channel: 'KAKAO', identifier: '@crm_official' },
  { id: 'SND-003', name: 'CRM 공식', channel: 'EMAIL', identifier: 'noreply@crm.com' },
  { id: 'SND-004', name: 'CRM 앱', channel: 'PUSH', identifier: 'CRM_APP' },
];

