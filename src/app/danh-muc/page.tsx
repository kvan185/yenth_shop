import type { Metadata } from 'next';
import Link from 'next/link';

type CategoryLink = {
  href: string;
  label: string;
  external?: boolean;
};

type Category = {
  eyebrow: string;
  title: string;
  text: string;
  links: CategoryLink[];
};

export const metadata: Metadata = {
  title: 'Danh mục loại website',
  description:
    'Danh mục các loại website YenTH Shop có thể triển khai: web bán hàng đơn giản, web mạng xã hội, web giới thiệu sản phẩm, landing page và portfolio.',
  alternates: {
    canonical: '/danh-muc',
  },
};

const categories: Category[] = [
  {
    eyebrow: 'Bán hàng',
    title: 'Web bán hàng đơn giản cho doanh nghiệp nhỏ',
    text: 'Phù hợp cửa hàng, hộ kinh doanh và thương hiệu nhỏ cần giới thiệu sản phẩm, chính sách, nút gọi/Zalo và form nhận đơn hoặc tư vấn.',
    links: [
      { href: '/web-ban-hang-don-gian-cho-doanh-nghiep-nho/mau_1', label: 'Xem mẫu 1', external: true },
      { href: '/web-ban-hang-don-gian-cho-doanh-nghiep-nho/mau_2', label: 'Xem mẫu 2', external: true },
    ],
  },
  {
    eyebrow: 'Cộng đồng',
    title: 'Web mạng xã hội',
    text: 'Dành cho mô hình cần hồ sơ người dùng, bảng tin, bài đăng, bình luận, kết nối thành viên hoặc cộng đồng nội bộ.',
    links: [
      { href: '/web-mang-xa-hoi/facebook/mau_1', label: 'Xem mẫu Facebook', external: true },
      { href: '/web-mang-xa-hoi/zalo/mau_1', label: 'Xem mẫu Zalo', external: true },
    ],
  },
  {
    eyebrow: 'Sản phẩm',
    title: 'Web giới thiệu sản phẩm',
    text: 'Tập trung trình bày điểm mạnh, hình ảnh, thông số, lợi ích, câu hỏi thường gặp và CTA để khách hỏi mua hoặc đặt lịch tư vấn.',
    links: [{ href: '/web-gioi-thieu-san-pham/mau_1', label: 'Xem mẫu 1', external: true }],
  },
  {
    eyebrow: 'Dịch vụ',
    title: 'Landing page dịch vụ',
    text: 'Một trang bán hàng gọn cho spa, lớp học, tư vấn, sửa chữa, studio hoặc dịch vụ địa phương cần khách để lại thông tin nhanh.',
    links: [{ href: '/landing-page-dich-vu/mau_1', label: 'Xem mẫu 1', external: true }],
  },
  {
    eyebrow: 'Thương hiệu',
    title: 'Web giới thiệu doanh nghiệp',
    text: 'Trang công ty nhỏ với câu chuyện thương hiệu, dịch vụ, năng lực, quy trình, khách hàng tiêu biểu và thông tin liên hệ rõ ràng.',
    links: [{ href: '/web-gioi-thieu-doanh-nghiep/mau_1', label: 'Xem mẫu 1', external: true }],
  },
  {
    eyebrow: 'Cá nhân',
    title: 'Web portfolio cá nhân',
    text: 'Hồ sơ online cho freelancer, chuyên gia hoặc creator cần giới thiệu kinh nghiệm, dự án, dịch vụ và kênh liên hệ chuyên nghiệp.',
    links: [{ href: '/web-portfolio-ca-nhan/mau_1', label: 'Xem mẫu 1', external: true }],
  },
  {
    eyebrow: 'Nội dung',
    title: 'Web blog / tin tức',
    text: 'Hệ thống bài viết SEO, chuyên mục, trang chi tiết bài và CTA liên hệ để kéo thêm lượt truy cập từ Google.',
    links: [{ href: '/web-blog-tin-tuc/mau_1', label: 'Xem mẫu 1', external: true }],
  },
  {
    eyebrow: 'Đặt lịch',
    title: 'Web tư vấn / đặt lịch',
    text: 'Phù hợp dịch vụ cần khách chọn gói, gửi nhu cầu, đặt lịch hẹn hoặc để lại brief trước khi trao đổi chi tiết.',
    links: [{ href: '/web-tu-van-dat-lich/mau_1', label: 'Xem mẫu 1', external: true }],
  },
  {
    eyebrow: 'Dạy học',
    title: 'Web dạy học',
    text: 'Phù hợp giáo viên, trung tâm hoặc khóa học online cần đăng lớp, giao đề, cho học viên thi thử, chấm điểm tự động và xem báo cáo tiến độ.',
    links: [{ href: '/web-day-hoc/thi-thu/mau_1', label: 'Mẫu thi thử', external: true }],
  },
  {
    eyebrow: 'Theo yêu cầu',
    title: 'Web chức năng riêng',
    text: 'Các luồng riêng như dashboard nhỏ, quản lý sản phẩm, form nhiều bước, theo dõi lead hoặc tích hợp hệ thống đang dùng.',
    links: [
      { href: '/web-chuc-nang-rieng/mau_1', label: 'Xem mẫu 1', external: true },
      { href: '/lien-he', label: 'Trao đổi nhu cầu' },
    ],
  },
];

export default function CategoryPage() {
  return (
    <main className="simple-page">
      <section className="simple-hero">
        <Link href="/home" className="back-link">
          YenTH.shop
        </Link>
        <p className="eyebrow">/danh-muc</p>
        <h1>Danh mục các loại website có thể triển khai theo nhu cầu thật của bạn.</h1>
        <p>
          Chọn nhóm gần nhất với mô hình kinh doanh, sau đó YenTH Shop sẽ tinh chỉnh cấu trúc trang, nội dung, CTA,
          SEO và tracking cho đúng mục tiêu.
        </p>
      </section>

      <section className="simple-grid-section">
        {categories.map((item) => (
          <article key={item.title}>
            <span className="category-eyebrow">{item.eyebrow}</span>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
            <div className="category-actions">
              {item.links.map((link) => (
                <Link key={link.href} href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined}>
                  {link.label}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
