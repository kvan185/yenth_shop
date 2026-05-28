export type TemplateItem = {
  slug: string;
  title: string;
  category: string;
  bestFor: string;
  description: string;
  features: string[];
  accent: string;
};

export const templates: TemplateItem[] = [
  {
    slug: 'ban-hang-nho',
    title: 'Website bán hàng nhỏ',
    category: 'Cửa hàng / sản phẩm',
    bestFor: 'Yến sào, mỹ phẩm, đồ handmade, thực phẩm, phụ kiện',
    description:
      'Mẫu dành cho cửa hàng cần trình bày sản phẩm, lợi ích, chính sách, đánh giá và nút đặt mua nhanh qua Zalo.',
    features: ['Hero sản phẩm', 'Danh mục bán chạy', 'Chính sách giao hàng', 'CTA Zalo'],
    accent: '#0e6f5c',
  },
  {
    slug: 'spa-dich-vu',
    title: 'Landing page spa / dịch vụ',
    category: 'Dịch vụ địa phương',
    bestFor: 'Spa, clinic, sửa chữa, lớp học, tư vấn, studio',
    description:
      'Mẫu tập trung chuyển đổi với bảng dịch vụ, quy trình, cam kết, review và form đặt lịch rõ ràng.',
    features: ['Bảng dịch vụ', 'Đặt lịch', 'Review', 'Local SEO'],
    accent: '#c96367',
  },
  {
    slug: 'nha-hang-cafe',
    title: 'Website nhà hàng / quán cafe',
    category: 'Ẩm thực',
    bestFor: 'Cafe, nhà hàng nhỏ, tiệm bánh, quán ăn địa phương',
    description:
      'Mẫu có menu nổi bật, không gian quán, giờ mở cửa, vị trí, combo bán chạy và CTA đặt bàn/gọi món.',
    features: ['Menu nổi bật', 'Giờ mở cửa', 'Địa chỉ', 'Đặt bàn'],
    accent: '#8a5a2d',
  },
  {
    slug: 'portfolio-chuyen-gia',
    title: 'Portfolio chuyên gia',
    category: 'Cá nhân / chuyên gia',
    bestFor: 'Freelancer, creator, tư vấn viên, giảng viên, nhiếp ảnh gia',
    description:
      'Mẫu giúp kể câu chuyện cá nhân, thể hiện năng lực, case study, dịch vụ và form nhận dự án.',
    features: ['Câu chuyện cá nhân', 'Case study', 'Dịch vụ', 'Form nhận dự án'],
    accent: '#245b8f',
  },
  {
    slug: 'doanh-nghiep-nho',
    title: 'Website doanh nghiệp nhỏ',
    category: 'Công ty / đội nhóm',
    bestFor: 'Agency nhỏ, công ty dịch vụ, đội thi công, đơn vị tư vấn',
    description:
      'Mẫu nhiều section cho năng lực, dịch vụ, quy trình, dự án, khách hàng và form nhận brief.',
    features: ['Năng lực', 'Quy trình', 'Dự án', 'Nhận brief'],
    accent: '#073c34',
  },
];

export function getTemplate(slug: string) {
  return templates.find((template) => template.slug === slug);
}
