import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Product, ProductForm, ProductType, ProductCategory } from '../../types/order';

interface ProductSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product, quantity: number) => void;
  isSample?: boolean; // 샘플 추가 모드 여부
}

// 샘플 제품 데이터
const mockProducts: Product[] = [
  {
    id: 'P001',
    productName: '인산죽염 9회죽염 250g',
    productForm: '일반품',
    productType: '제품',
    productCategory: '죽염류',
    consumerPrice: 45000,
    memberPrice: 40500,
    stockQuantity: 100,
  },
  {
    id: 'P002',
    productName: '인산죽염 생활용품 세트',
    productForm: 'SET품',
    productType: '상품',
    productCategory: '세트조합류',
    consumerPrice: 120000,
    memberPrice: 108000,
    stockQuantity: 50,
  },
  {
    id: 'P003',
    productName: '인산죽염 샘플 (10g)',
    productForm: '샘플',
    productType: '제품',
    productCategory: '죽염류',
    consumerPrice: 0,
    memberPrice: 0,
    stockQuantity: 500,
  },
  {
    id: 'P004',
    productName: '인산가 건강식품 진액류 500ml',
    productForm: '일반품',
    productType: '상품',
    productCategory: '진액류',
    consumerPrice: 85000,
    memberPrice: 76500,
    stockQuantity: 75,
  },
  {
    id: 'P005',
    productName: '인산 명품장류 세트',
    productForm: 'SET품',
    productType: '상품',
    productCategory: '장류',
    consumerPrice: 150000,
    memberPrice: 135000,
    stockQuantity: 30,
  },
];

export const ProductSearchModal: React.FC<ProductSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  isSample = false,
}) => {
  const [searchForm, setSearchForm] = useState<ProductForm | ''>('');
  const [searchType, setSearchType] = useState<ProductType | ''>('');
  const [searchCategory, setSearchCategory] = useState<ProductCategory | ''>('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});

  const productForms: ProductForm[] = ['일반품', 'SET품', '샘플'];
  const productTypes: ProductType[] = [
    '부자재',
    '비용(비)',
    '상품',
    '제품',
    '반제품',
    '도서류',
    '소모품(비)',
    '원자재',
    '회원용(비)',
  ];
  const productCategories: ProductCategory[] = [
    '토종상품류',
    '쇼핑몰전용',
    '죽염류',
    '기타류',
    '도서',
    '건상식품류',
    '장류',
    '연수원/기타',
    '호텔',
    '환/분말류',
    'SSL',
    '생활용품류',
    '진액류',
    '세트조합류',
  ];

  // 검색 필터링
  const filteredProducts = mockProducts.filter((product) => {
    if (searchForm && product.productForm !== searchForm) return false;
    if (searchType && product.productType !== searchType) return false;
    if (searchCategory && product.productCategory !== searchCategory) return false;
    if (searchKeyword && !product.productName.toLowerCase().includes(searchKeyword.toLowerCase()))
      return false;
    // 샘플 모드일 경우 샘플 제품만 표시
    if (isSample && product.productForm !== '샘플') return false;
    return true;
  });

  const handleQuantityChange = (productId: string, quantity: number) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  const handleAddProduct = (product: Product) => {
    const quantity = selectedQuantities[product.id] || 1;
    onSelectProduct(product, quantity);
    setSelectedQuantities((prev) => {
      const updated = { ...prev };
      delete updated[product.id];
      return updated;
    });
  };

  const handleReset = () => {
    setSearchForm('');
    setSearchType('');
    setSearchCategory('');
    setSearchKeyword('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isSample ? '샘플 추가' : '제품 추가'}
      size="xl"
    >
      <div className="space-y-6">
        {/* 검색 조건 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <Select
              label="제품형태"
              value={searchForm}
              onChange={(e) => setSearchForm(e.target.value as ProductForm | '')}
            >
              <option value="">전체</option>
              {productForms.map((form) => (
                <option key={form} value={form}>
                  {form}
                </option>
              ))}
            </Select>

            <Select
              label="제품유형"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as ProductType | '')}
            >
              <option value="">전체</option>
              {productTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>

            <Select
              label="제품분류"
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value as ProductCategory | '')}
            >
              <option value="">전체</option>
              {productCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>

            <Input
              label="제품명"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="검색어 입력"
              icon={Search}
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              초기화
            </Button>
          </div>
        </div>

        {/* 검색 결과 */}
        <div className="border rounded-lg overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    구분
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    제품명
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    제품형태
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    소비자가
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    회원가
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    수량
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    추가
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      검색 결과가 없습니다.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            product.productForm === '샘플'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {product.productForm === '샘플' ? '기타' : '일반'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {product.productName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {product.productForm}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {product.consumerPrice.toLocaleString()}원
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                        {product.memberPrice.toLocaleString()}원
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="1"
                          value={selectedQuantities[product.id] || 1}
                          onChange={(e) =>
                            handleQuantityChange(product.id, parseInt(e.target.value) || 1)
                          }
                          className="w-16 px-2 py-1 border border-gray-300 rounded text-sm text-center"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          icon={Plus}
                          onClick={() => handleAddProduct(product)}
                        >
                          추가
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            닫기
          </Button>
        </div>
      </div>
    </Modal>
  );
};

