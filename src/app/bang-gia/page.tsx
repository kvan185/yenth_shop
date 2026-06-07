import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bảng giá thiết kế web',
  description:
    'Bảng giá thiết kế web minh bạch cho doanh nghiệp nhỏ: gói Cơ bản, Tăng trưởng và Theo yêu cầu, kèm phạm vi bàn giao, thời gian và FAQ.',
  alternates: {
    canonical: '/bang-gia',
  },
};

const packages = [
  {
    name: 'Cơ bản',
    price: '2.900.000đ',
    tag: 'Hiện diện nhanh',
    fit: 'Freelancer, cá nhân, cửa hàng nhỏ cần một trang gọn để gửi khách xem.',
    timeline: '3-5 ngày',
    includes: ['1 trang giới thiệu', 'CTA gọi/Zalo/form', 'Responsive mobile', 'Metadata cơ bản', 'Bàn giao hướng dẫn cập nhật'],
    notIncluded: 'Chưa bao gồm blog, nhiều trang con hoặc chức năng quản trị riêng.',
  },
  {
    name: 'Tăng trưởng',
    price: '5.900.000đ',
    tag: 'Khuyên chọn',
    featured: true,
    fit: 'Dịch vụ địa phương, shop nhỏ, lớp học, spa, tư vấn cần khách hỏi giá hoặc đặt lịch.',
    timeline: '7-10 ngày',
    includes: ['Landing/website 3-5 section', 'Bảng giá hoặc gói dịch vụ', 'Proof/case study', 'Local SEO + schema', 'Tracking CTA và form'],
    notIncluded: 'Chưa bao gồm dashboard phức tạp hoặc tích hợp hệ thống ngoài.',
  },
  {
    name: 'Theo yêu cầu',
    price: 'Từ 12.000.000đ',
    tag: 'Nhiều chức năng',
    fit: 'Doanh nghiệp cần nhiều trang, blog, sản phẩm, đặt lịch, luồng form riêng hoặc dashboard.',
    timeline: 'Theo phạm vi',
    includes: ['Nhiều trang/chức năng', 'Blog hoặc sản phẩm', 'Form nhiều bước', 'Tích hợp hoặc dashboard', 'Bàn giao theo milestone'],
    notIncluded: 'Chi phí cuối được chốt sau khi xác định luồng vận hành và dữ liệu cần quản lý.',
  },
];

const trustNotes = [
  ['Tư vấn trước khi chốt', 'Không ép gói. Buổi đầu dùng để hiểu ngành nghề, mục tiêu liên hệ, nội dung đang có và ngân sách phù hợp.'],
  ['Bàn giao rõ tài sản', 'Mã nguồn, hướng dẫn cập nhật, cấu hình deploy, sitemap, robots, metadata và các kênh liên hệ được bàn giao theo checklist.'],
  ['Đo được chuyển đổi', 'Các điểm bấm quan trọng như form, Zalo, điện thoại, email và CTA được đặt data-track để sẵn sàng đo lường.'],
];

const comparisonRows = [
  ['Phù hợp nhất', 'Cá nhân/shop rất nhỏ', 'Dịch vụ địa phương cần lead', 'Doanh nghiệp cần luồng riêng'],
  ['Số trang/section', '1 trang gọn', '3-5 section bán hàng', 'Nhiều trang theo phạm vi'],
  ['Nội dung bán hàng', 'Nội dung nền', 'Offer, proof, FAQ, bảng giá', 'Copy theo từng luồng/chức năng'],
  ['SEO nền', 'Metadata cơ bản', 'Local SEO, schema, sitemap', 'Cấu trúc SEO mở rộng'],
  ['Đo chuyển đổi', 'CTA chính', 'Form, Zalo, phone, CTA', 'Event theo luồng riêng'],
  ['Bàn giao', 'Hướng dẫn cập nhật', 'Checklist SEO/tracking/form', 'Milestone và tài liệu vận hành'],
];

const faqs = [
  ['Tôi chưa có nội dung thì có làm được không?', 'Có. Gói Tăng trưởng đã tính phần sắp xếp nội dung nền: dịch vụ chính, lợi ích, proof, bảng giá, FAQ và CTA.'],
  ['Có cần chọn gói ngay không?', 'Không. Bạn có thể gửi nhu cầu trước, YenTH Shop sẽ đề xuất gói và phạm vi phù hợp sau khi hiểu mục tiêu.'],
  ['Giá có phát sinh không?', 'Chỉ phát sinh khi thêm trang, chức năng hoặc tích hợp ngoài phạm vi đã thống nhất. Phần này sẽ được báo trước khi làm.'],
  ['Website có dùng được trên điện thoại không?', 'Có. Các gói đều ưu tiên mobile vì phần lớn khách hàng từ Facebook, Zalo và Google sẽ mở bằng điện thoại.'],
];

export default function PricingPage() {
  return (
    <main className="simple-page">
      <section className="simple-hero">
        <Link href="/" className="back-link">
          YenTH.shop
        </Link>
        <p className="eyebrow">/bang-gia</p>
        <h1>Bảng giá thiết kế web rõ phạm vi, rõ thời gian, rõ gói phù hợp.</h1>
        <p>
          Giá không chỉ tính theo số trang, mà theo mục tiêu: hiện diện nhanh, tạo lead tốt hơn,
          hay xây website có nhiều chức năng riêng.
        </p>
      </section>
      <section className="simple-grid-section pricing-detail-grid">
        {packages.map((item) => (
          <article className={item.featured ? 'featured' : undefined} key={item.name}>
            <span>{item.tag}</span>
            <h2>{item.name}</h2>
            <strong>{item.price}</strong>
            <p>{item.fit}</p>
            <dl>
              <div>
                <dt>Thời gian</dt>
                <dd>{item.timeline}</dd>
              </div>
              <div>
                <dt>Lưu ý</dt>
                <dd>{item.notIncluded}</dd>
              </div>
            </dl>
            <ul>
              {item.includes.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <Link href={`/lien-he?goi=${encodeURIComponent(item.name)}`}>Trao đổi gói này</Link>
          </article>
        ))}
      </section>
      <section className="pricing-compare-section">
        <div className="redesign-heading">
          <p className="eyebrow">So sánh nhanh</p>
          <h2>Quét trong 30 giây để biết gói nào đang đúng giai đoạn.</h2>
          <p>
            Bảng này tập trung vào phạm vi bàn giao thực tế: nội dung, SEO, tracking và mức độ tùy chỉnh.
          </p>
        </div>
        <div className="pricing-compare-table" role="table" aria-label="So sánh gói thiết kế web">
          <div role="row" className="pricing-compare-head">
            <span role="columnheader">Hạng mục</span>
            {packages.map((item) => (
              <span role="columnheader" key={item.name}>
                {item.name}
              </span>
            ))}
          </div>
          {comparisonRows.map(([label, basic, growth, custom]) => (
            <div role="row" key={label}>
              <strong role="rowheader">{label}</strong>
              <span role="cell">{basic}</span>
              <span role="cell">{growth}</span>
              <span role="cell">{custom}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="simple-grid-section trust-pricing-grid">
        {trustNotes.map(([title, text]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <section className="simple-list-section pricing-faq">
        {faqs.map(([question, answer], index) => (
          <article key={question}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h2>{question}</h2>
              <p>{answer}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="simple-cta-band">
        <div>
          <h2>Muốn biết nên chọn gói nào?</h2>
          <p>Gửi ngành nghề, loại website mong muốn và ngân sách dự kiến. Bạn sẽ nhận lại hướng triển khai trước khi quyết định.</p>
        </div>
        <Link href="/lien-he" data-track="pricing_page_cta_click" data-track-category="conversion">
          Nhận tư vấn miễn phí
        </Link>
      </section>
    </main>
  );
}
