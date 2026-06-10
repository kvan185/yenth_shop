export type MysticDomain = {
  id: string;
  name: string;
  shortName: string;
  navLabel: string;
  description: string;
  accent: string;
  modes: {
    id: 'overview' | 'love' | 'money' | 'career';
    label: string;
    title: string;
    question: string;
  }[];
  offerings: string[];
};

export const mysticDomains: MysticDomain[] = [
  {
    id: 'tu-vi',
    name: 'Tử Vi Đông Phương',
    shortName: 'Tử Vi',
    navLabel: 'Tử vi',
    accent: 'Can Chi - Ngũ Hành - 12 con giáp',
    description:
      'Luận giải ngày sinh theo Can Chi, ngũ hành và nhịp vận cá nhân. Cách trình bày giữ chất Á Đông, rõ ràng, không phô diễn kỹ thuật.',
    modes: [
      { id: 'overview', label: 'Tổng quan', title: 'Tổng quan', question: '3 tháng tới mình nên tập trung điều gì?' },
      { id: 'love', label: 'Tình duyên', title: 'Tình duyên', question: 'Tình duyên 3 tháng tới có chuyển biến không?' },
      { id: 'money', label: 'Tài lộc', title: 'Tài lộc', question: 'Tài lộc sắp tới nên mở hay nên giữ?' },
      { id: 'career', label: 'Sự nghiệp', title: 'Sự nghiệp', question: 'Công việc sắp tới có cơ hội nào đáng chú ý?' },
    ],
    offerings: ['Báo cáo tử vi 12 tháng', 'Xem tuổi hợp nhau', 'Chọn ngày tốt', 'Tư vấn phong thủy'],
  },
  {
    id: 'phong-thuy',
    name: 'Phong Thủy Ứng Dụng',
    shortName: 'Phong Thủy',
    navLabel: 'Phong thủy',
    accent: 'Không gian - hướng khí - màu sắc',
    description: 'Định hướng nhà ở, cửa hàng, bàn làm việc và màu sắc theo nhu cầu thực tế.',
    modes: [],
    offerings: ['Tư vấn bố trí không gian', 'Chọn màu hợp mệnh', 'Xem hướng khai trương'],
  },
  {
    id: 'lich-ngay-tot',
    name: 'Lịch Ngày Tốt',
    shortName: 'Ngày Tốt',
    navLabel: 'Ngày tốt',
    accent: 'Khai trương - ký kết - cưới hỏi',
    description: 'Chọn ngày theo mục đích, ưu tiên lời khuyên dễ dùng thay vì bảng thuật ngữ dày đặc.',
    modes: [],
    offerings: ['Chọn ngày khai trương', 'Chọn ngày ký hợp đồng', 'Chọn ngày cưới hỏi'],
  },
];

export const primaryDomain = mysticDomains[0];

export const trustItems = ['Luận giải trong 10 giây', 'Không cần đăng ký', 'Có gợi ý hành động ngay'];
