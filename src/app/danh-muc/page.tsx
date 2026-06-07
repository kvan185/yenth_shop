import type { Metadata } from 'next';
import Link from 'next/link';

type CategoryLink = {
  href: string;
  label: string;
  external?: boolean;
};

type Category = {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  bestFor: string;
  outcome: string;
  priceHint: string;
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
    id: 'ban-hang',
    eyebrow: 'Bán hàng',
    title: 'Web bán hàng đơn giản cho doanh nghiệp nhỏ',
    text: 'Phù hợp cửa hàng, hộ kinh doanh và thương hiệu nhỏ cần giới thiệu sản phẩm, chính sách, nút gọi/Zalo và form nhận đơn hoặc tư vấn.',
    bestFor: 'Cửa hàng yến, mỹ phẩm, đồ thủ công, thực phẩm sạch, shop địa phương.',
    outcome: 'Khách xem sản phẩm, hiểu chính sách và bấm hỏi mua nhanh.',
    priceHint: 'Từ gói Cơ bản hoặc Tăng trưởng',
    links: [
      { href: '/web-ban-hang-don-gian-cho-doanh-nghiep-nho/mau_1', label: 'Xem mẫu 1', external: true },
      { href: '/web-ban-hang-don-gian-cho-doanh-nghiep-nho/mau_2', label: 'Xem mẫu 2', external: true },
    ],
  },
  {
    id: 'cong-dong',
    eyebrow: 'Cộng đồng',
    title: 'Web mạng xã hội',
    text: 'Dành cho mô hình cần hồ sơ người dùng, bảng tin, bài đăng, bình luận, kết nối thành viên hoặc cộng đồng nội bộ.',
    bestFor: 'Cộng đồng nhỏ, lớp học, nhóm thành viên, mạng nội bộ thử nghiệm.',
    outcome: 'Người dùng có tài khoản, đăng nội dung và tương tác trong một không gian riêng.',
    priceHint: 'Thường thuộc gói Theo yêu cầu',
    links: [
      { href: '/web-mang-xa-hoi/facebook/mau_1', label: 'Xem mẫu Facebook', external: true },
      { href: '/web-mang-xa-hoi/zalo/mau_1', label: 'Xem mẫu Zalo', external: true },
    ],
  },
  {
    id: 'san-pham',
    eyebrow: 'Sản phẩm',
    title: 'Web giới thiệu sản phẩm',
    text: 'Tập trung trình bày điểm mạnh, hình ảnh, thông số, lợi ích, câu hỏi thường gặp và CTA để khách hỏi mua hoặc đặt lịch tư vấn.',
    bestFor: 'Một sản phẩm chủ lực, sản phẩm mới ra mắt hoặc sản phẩm cần giải thích kỹ.',
    outcome: 'Khách hiểu lợi ích, xem bằng chứng và gửi nhu cầu tư vấn.',
    priceHint: 'Từ gói Tăng trưởng',
    links: [{ href: '/web-gioi-thieu-san-pham/mau_1', label: 'Xem mẫu 1', external: true }],
  },
  {
    id: 'dich-vu',
    eyebrow: 'Dịch vụ',
    title: 'Landing page dịch vụ',
    text: 'Một trang bán hàng gọn cho spa, lớp học, tư vấn, sửa chữa, studio hoặc dịch vụ địa phương cần khách để lại thông tin nhanh.',
    bestFor: 'Spa, nha khoa, sửa chữa, giáo viên, tư vấn, studio, dịch vụ tại TP.HCM.',
    outcome: 'Tăng cuộc gọi, tin nhắn Zalo, form đặt lịch và lead từ Google.',
    priceHint: 'Khuyên dùng gói Tăng trưởng',
    links: [{ href: '/landing-page-dich-vu/mau_1', label: 'Xem mẫu 1', external: true }],
  },
  {
    id: 'doanh-nghiep',
    eyebrow: 'Thương hiệu',
    title: 'Web giới thiệu doanh nghiệp',
    text: 'Trang công ty nhỏ với câu chuyện thương hiệu, dịch vụ, năng lực, quy trình, khách hàng tiêu biểu và thông tin liên hệ rõ ràng.',
    bestFor: 'Công ty dịch vụ, đội thi công, agency nhỏ, văn phòng tư vấn.',
    outcome: 'Tạo độ tin cậy khi khách tra cứu thương hiệu trước khi liên hệ.',
    priceHint: 'Từ gói Tăng trưởng',
    links: [{ href: '/web-gioi-thieu-doanh-nghiep/mau_1', label: 'Xem mẫu 1', external: true }],
  },
  {
    id: 'ca-nhan',
    eyebrow: 'Cá nhân',
    title: 'Web portfolio cá nhân',
    text: 'Hồ sơ online cho freelancer, chuyên gia hoặc creator cần giới thiệu kinh nghiệm, dự án, dịch vụ và kênh liên hệ chuyên nghiệp.',
    bestFor: 'Freelancer, chuyên gia, creator, người đi làm cần hồ sơ riêng.',
    outcome: 'Biến portfolio thành kênh nhận dự án và cuộc hẹn tư vấn.',
    priceHint: 'Từ gói Cơ bản',
    links: [{ href: '/web-portfolio-ca-nhan/mau_1', label: 'Xem mẫu 1', external: true }],
  },
  {
    id: 'noi-dung',
    eyebrow: 'Nội dung',
    title: 'Web blog / tin tức',
    text: 'Hệ thống bài viết SEO, chuyên mục, trang chi tiết bài và CTA liên hệ để kéo thêm lượt truy cập từ Google.',
    bestFor: 'Dịch vụ cần làm nội dung đều, chuyên gia muốn xây uy tín, doanh nghiệp làm SEO.',
    outcome: 'Có thêm cửa vào từ Google qua bài viết và cụm nội dung dài hạn.',
    priceHint: 'Từ gói Theo yêu cầu',
    links: [{ href: '/web-blog-tin-tuc/mau_1', label: 'Xem mẫu 1', external: true }],
  },
  {
    id: 'dat-lich',
    eyebrow: 'Đặt lịch',
    title: 'Web tư vấn / đặt lịch',
    text: 'Phù hợp dịch vụ cần khách chọn gói, gửi nhu cầu, đặt lịch hẹn hoặc để lại brief trước khi trao đổi chi tiết.',
    bestFor: 'Tư vấn, coaching, spa, lớp học, dịch vụ cần hẹn trước.',
    outcome: 'Giảm hỏi qua lại, gom đủ thông tin trước buổi tư vấn.',
    priceHint: 'Từ gói Tăng trưởng',
    links: [{ href: '/web-tu-van-dat-lich/mau_1', label: 'Xem mẫu 1', external: true }],
  },
  {
    id: 'day-hoc',
    eyebrow: 'Dạy học',
    title: 'Web dạy học',
    text: 'Phù hợp giáo viên, trung tâm hoặc khóa học online cần đăng lớp, giao đề, cho học viên thi thử, chấm điểm tự động và xem báo cáo tiến độ.',
    bestFor: 'Giáo viên, trung tâm nhỏ, khóa học online, lớp luyện thi.',
    outcome: 'Học viên có nơi thi thử, xem điểm và quay lại học tiếp.',
    priceHint: 'Thường thuộc gói Theo yêu cầu',
    links: [{ href: '/web-day-hoc/thi-thu/mau_1', label: 'Mẫu thi thử', external: true }],
  },
  {
    id: 'tuy-chinh',
    eyebrow: 'Theo yêu cầu',
    title: 'Web chức năng riêng',
    text: 'Các luồng riêng như dashboard nhỏ, quản lý sản phẩm, form nhiều bước, theo dõi lead hoặc tích hợp hệ thống đang dùng.',
    bestFor: 'Doanh nghiệp có quy trình riêng hoặc muốn biến website thành công cụ vận hành.',
    outcome: 'Website không chỉ giới thiệu mà còn xử lý một phần công việc hằng ngày.',
    priceHint: 'Gói Theo yêu cầu',
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
        <p className="eyebrow">/mau-website</p>
        <h1>Chọn mẫu website theo mục tiêu kinh doanh, không chọn theo hình thức bên ngoài.</h1>
        <p>
          Mỗi mẫu bên dưới được gắn với nhóm khách phù hợp, kết quả cần đạt và gói giá gợi ý để bạn dễ biết
          nên bắt đầu từ đâu.
        </p>
        <div className="template-filter">
          {categories.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.eyebrow}
            </a>
          ))}
        </div>
      </section>

      <section className="simple-grid-section template-gallery">
        {categories.map((item) => (
          <article id={item.id} key={item.title}>
            <span className="category-eyebrow">{item.eyebrow}</span>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
            <dl>
              <div>
                <dt>Phù hợp</dt>
                <dd>{item.bestFor}</dd>
              </div>
              <div>
                <dt>Mục tiêu</dt>
                <dd>{item.outcome}</dd>
              </div>
              <div>
                <dt>Gói gợi ý</dt>
                <dd>{item.priceHint}</dd>
              </div>
            </dl>
            <div className="category-actions">
              {item.links.map((link) => (
                <Link key={link.href} href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined}>
                  {link.label}
                </Link>
              ))}
              <Link href={`/lien-he?mau=${item.id}`} data-track="template_cta_click" data-track-category="conversion">
                Tư vấn mẫu này
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="simple-list-section decision-section">
        <article>
          <span>01</span>
          <div>
            <h2>Chưa biết chọn mẫu nào?</h2>
            <p>Gửi ngành nghề, sản phẩm/dịch vụ chính và khu vực phục vụ. YenTH Shop sẽ gợi ý mẫu, cấu trúc trang và gói giá phù hợp trước khi bạn quyết định.</p>
            <Link href="/lien-he">Nhận gợi ý mẫu miễn phí</Link>
          </div>
        </article>
      </section>
    </main>
  );
}
