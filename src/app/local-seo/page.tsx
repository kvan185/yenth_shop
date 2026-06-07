import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Local SEO cho website dịch vụ',
  description:
    'Local SEO cho website dịch vụ tại TP. Hồ Chí Minh: NAP, schema, khu vực phục vụ, sitemap, Search Console và nội dung địa phương.',
  alternates: {
    canonical: '/local-seo',
  },
};

const areas = ['Bình Thạnh', 'Thủ Đức', 'Gò Vấp', 'Quận 1', 'TP. Hồ Chí Minh', 'Online toàn quốc'];

const localSeoSteps = [
  ['NAP nhất quán', 'Tên, địa chỉ, số điện thoại và khu vực phục vụ được trình bày rõ để khách và Google không bị mơ hồ.'],
  ['Schema địa phương', 'Gắn dữ liệu có cấu trúc cho loại dịch vụ, khu vực, liên hệ và trang FAQ.'],
  ['Trang theo khu vực/ngành', 'Tạo nội dung riêng cho ngành hoặc khu vực có nhu cầu tìm kiếm thật.'],
  ['Đo lead địa phương', 'Theo dõi bấm gọi, Zalo, email và form để biết kênh nào mang khách liên hệ.'],
];

const localExamples = [
  {
    title: 'Dịch vụ cần đặt lịch',
    pages: ['landing page spa tại TP.HCM', 'website lớp học tại Thủ Đức', 'web tư vấn tại Bình Thạnh'],
    goal: 'Tăng cuộc gọi, tin nhắn Zalo và form đặt lịch có đủ thông tin.',
  },
  {
    title: 'Shop nhỏ bán sản phẩm',
    pages: ['website bán đặc sản tại TP.HCM', 'web bán yến sào', 'website mỹ phẩm handmade'],
    goal: 'Giúp khách xem sản phẩm, chính sách, chứng nhận và hỏi mua nhanh.',
  },
  {
    title: 'Doanh nghiệp dịch vụ',
    pages: ['thiết kế web doanh nghiệp nhỏ', 'website công ty dịch vụ', 'web giới thiệu năng lực'],
    goal: 'Tạo độ tin cậy khi khách tra cứu thương hiệu trước khi liên hệ.',
  },
];

const localDeliverables = [
  'Cụm từ khóa theo ngành và khu vực phục vụ',
  'NAP, schema và metadata nhất quán',
  'CTA gọi/Zalo/form gắn tracking',
  'FAQ xử lý câu hỏi địa phương',
  'Sitemap, robots và Search Console-ready',
];

export default function LocalSeoPage() {
  return (
    <main className="simple-page">
      <section className="simple-hero">
        <Link href="/" className="back-link">
          YenTH.shop
        </Link>
        <p className="eyebrow">/local-seo</p>
        <h1>Local SEO giúp Google hiểu bạn phục vụ khu vực nào và dịch vụ gì.</h1>
        <p>YenTH Shop tối ưu NAP, schema, sitemap, robots, Search Console và nội dung khu vực.</p>
      </section>
      <section className="simple-tags">
        {areas.map((area) => (
          <span key={area}>{area}</span>
        ))}
      </section>
      <section className="simple-grid-section technical-signal-grid">
        {localSeoSteps.map(([title, text]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <section className="simple-grid-section local-example-grid">
        {localExamples.map((item) => (
          <article key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.goal}</p>
            <ul>
              {item.pages.map((page) => (
                <li key={page}>{page}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
      <section className="simple-list-section local-deliverable-list">
        <article>
          <span>✓</span>
          <div>
            <h2>Checklist bàn giao Local SEO nền</h2>
            <p>Mỗi website dịch vụ địa phương nên có đủ tín hiệu để khách và Google hiểu bạn phục vụ ai, ở đâu và cần liên hệ bằng cách nào.</p>
            <div className="local-deliverable-tags">
              {localDeliverables.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </article>
      </section>
      <section className="simple-cta-band">
        <div>
          <h2>Cần khách tìm thấy bạn theo khu vực?</h2>
          <p>Gửi ngành nghề và khu vực phục vụ, YenTH Shop sẽ gợi ý cấu trúc trang Local SEO phù hợp.</p>
        </div>
        <Link href="/lien-he">Tư vấn Local SEO</Link>
      </section>
    </main>
  );
}
