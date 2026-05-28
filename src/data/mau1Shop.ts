export type Mau1Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  badge: string;
  description: string;
  detail: string;
  stock: number;
};

export const mau1Products: Mau1Product[] = [
  {
    id: 'yen-tinh-che-50g',
    name: 'Yến tinh chế 50g',
    category: 'Yến sào',
    price: 1650000,
    oldPrice: 1850000,
    badge: 'Bán chạy',
    description: 'Tổ yến tinh chế sạch lông, phù hợp dùng hằng tuần hoặc biếu tặng.',
    detail:
      'Sản phẩm đã được làm sạch thủ công, giữ sợi yến tự nhiên, đóng gói kín và phù hợp cho khách muốn tự chưng tại nhà.',
    stock: 24,
  },
  {
    id: 'yen-chung-san',
    name: 'Yến chưng sẵn 6 hũ',
    category: 'Yến chưng',
    price: 420000,
    badge: 'Tiện lợi',
    description: 'Combo 6 hũ yến chưng đường phèn, bảo quản lạnh, dùng nhanh trong ngày bận.',
    detail:
      'Mỗi hũ được chưng theo mẻ nhỏ, vị thanh, dễ dùng cho dân văn phòng, người lớn tuổi hoặc khách cần bổ sung nhanh.',
    stock: 48,
  },
  {
    id: 'set-qua-tang',
    name: 'Set quà tặng sức khỏe',
    category: 'Quà tặng',
    price: 2200000,
    badge: 'Cao cấp',
    description: 'Hộp quà yến sào sang trọng cho đối tác, gia đình hoặc dịp lễ tết.',
    detail:
      'Bộ quà gồm yến chọn lọc, hộp cứng cao cấp, thiệp chúc và túi xách, phù hợp tặng khách hàng hoặc người thân.',
    stock: 16,
  },
  {
    id: 'yen-tho-100g',
    name: 'Yến thô chọn lọc 100g',
    category: 'Yến sào',
    price: 3100000,
    oldPrice: 3450000,
    badge: 'Giá tốt',
    description: 'Yến thô nguyên tổ cho khách muốn tự làm sạch và kiểm soát quy trình chế biến.',
    detail:
      'Yến thô giữ nguyên dáng tổ, mùi tự nhiên, thích hợp cho người dùng lâu năm hoặc cửa hàng cần nguyên liệu chất lượng.',
    stock: 9,
  },
  {
    id: 'combo-gia-dinh',
    name: 'Combo gia đình 1 tháng',
    category: 'Combo',
    price: 1280000,
    badge: 'Tiết kiệm',
    description: 'Gói yến chưng và yến tinh chế dành cho gia đình 3-4 người sử dụng đều đặn.',
    detail:
      'Combo được thiết kế để dùng đều trong 4 tuần, có hướng dẫn chưng và lịch dùng mẫu cho từng thành viên.',
    stock: 31,
  },
  {
    id: 'yen-chung-khong-duong',
    name: 'Yến chưng không đường',
    category: 'Yến chưng',
    price: 480000,
    badge: 'Healthy',
    description: 'Phù hợp người ăn kiêng, người lớn tuổi hoặc khách muốn vị thanh nhẹ.',
    detail:
      'Công thức không đường, giữ vị yến tự nhiên, có thể dùng lạnh hoặc hâm nhẹ tùy thói quen của khách.',
    stock: 36,
  },
];

export const mau1Categories = Array.from(new Set(mau1Products.map((product) => product.category)));

export function formatVnd(value: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
}

export function toCategorySlug(category: string) {
  return category
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getMau1CategoryBySlug(slug: string) {
  return mau1Categories.find((category) => toCategorySlug(category) === slug);
}

export function getMau1ProductById(id: string) {
  return mau1Products.find((product) => product.id === id);
}
