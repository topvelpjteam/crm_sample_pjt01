// 주문서 작성 관련 타입 정의

// 구매경로 (대)
export type PurchaseChannelLarge = 
  | '인터넷'
  | '온라인마켓'
  | '대중시설'
  | '행사'
  | '기타'
  | 'CS팀_토스'
  | '전화'
  | '신문'
  | '방송'
  | '이메일마케팅';

// 구매경로 (소)
export type PurchaseChannelSmall =
  | '전화수신'
  | '매장'
  | '샘플'
  | '문자'
  | '월간지'
  | '스폰서'
  | '직영홍보'
  | '지인소개'
  | '대리점'
  | '기타';

// 제품형태
export type ProductForm = '일반품' | 'SET품' | '샘플';

// 제품유형
export type ProductType =
  | '부자재'
  | '비용(비)'
  | '상품'
  | '제품'
  | '반제품'
  | '도서류'
  | '소모품(비)'
  | '원자재'
  | '회원용(비)';

// 제품분류
export type ProductCategory =
  | '토종상품류'
  | '쇼핑몰전용'
  | '죽염류'
  | '기타류'
  | '도서'
  | '건상식품류'
  | '장류'
  | '연수원/기타'
  | '호텔'
  | '환/분말류'
  | 'SSL'
  | '생활용품류'
  | '진액류'
  | '세트조합류';

// 택배사
export type CourierCompany =
  | '우체국'
  | 'CJ택배'
  | '한진택배'
  | '롯데택배'
  | '직접수령'
  | '미배정'
  | '기타';

// 창고
export type Warehouse =
  | '지곡물류'
  | '백상빌딩13층'
  | '마늘창고1'
  | '마늘창고2'
  | '마늘창고3'
  | '강남직영'
  | '분당직영'
  | '수원직영'
  | '일산직영'
  | '웰니스호텔';

// 주문유형
export type OrderType = '주문' | '교환' | '반품' | '취소';

// 주문형태
export type OrderForm = '일반' | '정기배송' | '선물' | '샘플';

// 결제상태
export type PaymentStatus = '결제' | '미결제' | '부분결제' | '환불';

// 주문상태
export type OrderStatus = '접수' | '확인' | '출고' | '배송중' | '배송완료' | '취소' | '반품';

// 결제수단
export type PaymentMethod =
  | '적립금/예치금'
  | '쿠폰'
  | '가상계좌'
  | '무통장입금'
  | '신용카드'
  | '직영(현금)'
  | '직영(카드)';

// 클레임 구분
export type ClaimType = '제품' | '서비스' | '기타';

// 클레임 분류
export type ClaimCategory = '제품파손' | '제품변질' | '기타';

// 클레임 제품 처리
export type ClaimProductHandling = '교환' | '반품' | '취소' | '상급자보고' | '기타';

// 클레임 결과
export type ClaimResult = '처리중' | '미완료' | '완료' | '기타';

// 현금영수증 용도
export type CashReceiptPurpose = '소득공제' | '지출증빙';

// 제품 정보
export interface Product {
  id: string;
  productName: string;
  productForm: ProductForm;
  productType: ProductType;
  productCategory: ProductCategory;
  consumerPrice: number;
  memberPrice: number;
  stockQuantity: number;
  thumbnail?: string;
}

// 주문 기본 정보
export interface OrderBasicInfo {
  memberName: string;
  memberGrade: string;
  memberId: string;
  orderNumber: string;
  orderType: string;
  purchaseChannelLarge?: PurchaseChannelLarge;
  purchaseChannelSmall?: PurchaseChannelSmall;
}

// 주문 상품 항목
export interface OrderProductItem {
  id: string;
  productId: string;
  productName: string;
  orderQuantity: number;
  deliveryQuantity: number;
  remainingQuantity: number;
  unitPrice: number;
  isOrderable: boolean;
  productForm: ProductForm;
}

// 배송 정보 항목
export interface DeliveryItem {
  id: string;
  sequence: number;
  productName: string;
  deliveryCount: number;
  division: string; // 구분
  deliveryDate: string; // 수취일자
  recipientAddress: string; // 수취인주소
  recipient: string; // 수취인
  recipientPhone: string; // 핸드폰
  recipientTel: string; // 연락처
  courier: CourierCompany; // 택배사
  warehouse?: Warehouse; // 창고
  zipCode?: string; // 우편번호
  addressDetail?: string; // 상세주소
  deliveryMemo?: string; // 배송메모
  showPriceOnInvoice: boolean; // 거래명세서 단가표시 여부
  reference?: string; // 참고
  invoiceIncluded: boolean; // 명세
}

// 주문서 작성 데이터
export interface NewOrderData {
  basicInfo: OrderBasicInfo;
  products: OrderProductItem[];
  deliveries: DeliveryItem[];
  orderMemo?: string;
}

// 주문 목록 조회 필터
export interface OrderListFilter {
  startDate: string;
  endDate: string;
  orderType?: string;
  orderForm?: string;
  paymentStatus?: PaymentStatus;
  memberId?: string;
}

// 주문 목록 항목
export interface OrderListItem {
  sequence: number;
  memberId: string;
  memberName: string;
  orderNumber: string;
  originalOrderNumber?: string;
  orderType: OrderType;
  orderDate: string;
  orderForm: OrderForm;
  orderStatus: OrderStatus;
  orderAmount: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  paidAmount: number;
  unpaidAmount: number;
  depositDate?: string;
  assignedEmployee?: string;
  orderEmployee?: string;
  recipient: string;
  hasMemo: boolean;
}

// 주문 상세 항목
export interface OrderDetailItem {
  orderNumber: string;
  sequence: number;
  productName: string;
  unitPrice: number;
  orderQuantity: number;
  amount: number;
  releaseAcceptDate?: string;
  releaseWarehouse?: Warehouse;
  orderDate: string;
  deliveryScheduledDate?: string;
  trackingNumber?: string;
  recipient: string;
  releaseDate?: string;
  recipientContact: string;
  deliveryMemo?: string;
  stockStatus: '출고' | '미출고' | '반품' | '교환' | '취소' | '회수' | '미회수';
}

// 클레임 정보
export interface ClaimInfo {
  id: string;
  occurredDate: string;
  memberId: string;
  memberName: string;
  orderNumber: string;
  orderDate: string;
  orderPrice: number;
  assignee: string;
  claimType: ClaimType;
  claimCategory: ClaimCategory;
  productHandling: ClaimProductHandling;
  claimResult: ClaimResult;
  selectedProducts: string[]; // 제품 ID 목록
  claimContent: string;
}

// 현금영수증 정보
export interface CashReceiptInfo {
  memberName: string;
  purpose: CashReceiptPurpose;
  phoneNumber: string;
  amount: number;
  products: string;
}

// 세금계산서 정보
export interface TaxInvoiceInfo {
  date: string;
  businessName: string;
  address: string;
  contactPerson: string;
  email: string;
  documentUrl?: string;
}

// 배송지 분리 항목
export interface DeliverySeparationItem {
  sequence: number;
  deliveryScheduledDate: string;
  recipientAddress: string;
  recipient: string;
  recipientPhone: string;
  stockStatus: string;
  productName: string;
  unitQuantity: number;
  courier?: CourierCompany;
  releaseAcceptDate?: string;
}

// 취소 항목
export interface CancellationItem {
  sequence: number;
  deliveryDate?: string;
  recipientAddress: string;
  warehouse: Warehouse;
  stockStatus: string;
  productName: string;
  orderQuantity: number;
  cancellationCompleted: number;
  cancellable: number;
  cancellationQuantity: number;
}

// 반품 항목
export interface ReturnItem {
  sequence: number;
  deliveryDate?: string;
  returnAddress: string;
  warehouse: Warehouse;
  productName: string;
  orderQuantity: number;
  orderAmount: number;
  cancellationCompleted: number;
  returnCompleted: number;
  returnable: number;
  returnableAmount: number;
  returnQuantity: number;
}

// 교환 항목
export interface ExchangeItem {
  sequence: number;
  deliveryDate?: string;
  recipientAddress: string;
  warehouse: Warehouse;
  stockStatus: string;
  productName: string;
  releaseQuantity: number;
  returnQuantity: number;
  cancellationQuantity: number;
  exchangeCompleted: number;
  exchangeable: number;
  exchangeQuantity: number;
}

