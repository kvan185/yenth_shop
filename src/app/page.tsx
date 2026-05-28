import Image from 'next/image';
import Link from 'next/link';
import { ContactConversionForm } from '@/components/ContactConversionForm';
import { blogPosts } from '@/data/blog';

const metrics = [
  ['24h', 'phản hồi audit đầu tiên'],
  ['7 ngày', 'có bản demo để xem thật'],
  ['5 event', 'đo CTA, Zalo, phone, email, form'],
];

const proofCases = [
  {
    title: 'Trang dịch vụ YenTH Shop',
    image: '/previews/home-desktop.png',
    desc: 'Hero rõ offer, proof sớm, tracking conversion, Local SEO, blog SEO, schema, sitemap và form lead.',
    href: '/',
  },
  {
    title: 'Mẫu portfolio cá nhân',
    image: '/previews/portfolio-demo-desktop.png',
    desc: 'Bố cục dành cho freelancer/chuyên gia cần câu chuyện cá nhân, dự án nổi bật và form liên hệ rõ.',
    href: '/danh-muc',
  },
];

const deliverables = [
  'Website responsive trên điện thoại',
  'Metadata, sitemap, robots.txt, schema',
  'Open Graph social preview',
  'Form conversion có câu hỏi lọc lead',
  'GA4/GTM-ready tracking events',
  'Bàn giao mã nguồn và hướng dẫn quản trị',
];

const services = [
  {
    title: 'Website bán hàng nhỏ',
    text: 'Cho cửa hàng cần trình bày sản phẩm, chính sách, liên hệ Zalo và nội dung đủ rõ để khách hỏi mua.',
  },
  {
    title: 'Landing page dịch vụ',
    text: 'Cho spa, lớp học, tư vấn, sửa chữa, studio hoặc dịch vụ địa phương cần khách đặt lịch nhanh.',
  },
  {
    title: 'Portfolio cá nhân',
    text: 'Cho freelancer, chuyên gia, creator cần hồ sơ online đáng tin và dễ nhận dự án mới.',
  },
];

const workflow = [
  ['01', 'Audit & brief', 'Làm rõ khách hàng mục tiêu, dịch vụ chính, khu vực phục vụ, CTA và tài sản nội dung đang có.'],
  ['02', 'Wireframe & copy', 'Sắp xếp hero, proof, offer, giá, cam kết, form và nội dung SEO theo hành trình đọc thật.'],
  ['03', 'Build & measure', 'Code giao diện, tối ưu mobile, thêm schema, sitemap, Open Graph và tracking event quan trọng.'],
  ['04', 'Launch & handoff', 'Public domain, kết nối Search Console, kiểm tra form/link và bàn giao cách cập nhật nội dung.'],
];

const packages = [
  {
    name: 'Starter',
    price: '2.900.000đ',
    label: 'Hiện diện nhanh',
    text: 'Một trang giới thiệu gọn, CTA rõ, responsive, metadata cơ bản và form liên hệ.',
  },
  {
    name: 'Growth',
    price: '5.900.000đ',
    label: 'Được khuyên chọn',
    featured: true,
    text: 'Landing page/website dịch vụ có proof, Local SEO, schema, tracking event, form conversion và Search Console.',
  },
  {
    name: 'Custom',
    price: 'Từ 12.000.000đ',
    label: 'Neo giá trị',
    text: 'Nhiều trang, blog SEO, quản lý sản phẩm, đặt lịch, dashboard hoặc tích hợp hệ thống riêng.',
  },
];

const trustSignals = [
  {
    title: 'Tracking có hệ thống',
    text: 'Chuẩn bị sẵn event cho CTA, bảng giá, Zalo, phone, email và form submit để biết nguồn lead nào hiệu quả.',
  },
  {
    title: 'Tài sản thuộc về bạn',
    text: 'Bàn giao mã nguồn, tài khoản deploy, sitemap, robots, Search Console và hướng dẫn cập nhật nội dung.',
  },
  {
    title: 'SEO nhìn thấy được',
    text: 'Không chỉ gắn meta. Trang có nội dung dịch vụ, khu vực phục vụ, blog nền, schema và social preview.',
  },
];

const trackingEvents = ['hero_cta_click', 'pricing_cta_click', 'zalo_click', 'phone_click', 'lead_form_submit'];

const localAreas = [
  'Bình Thạnh',
  'Thủ Đức',
  'Gò Vấp',
  'Quận 1',
  'TP. Hồ Chí Minh',
  'Online toàn quốc',
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'YenTH Shop phù hợp với ai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'YenTH Shop phù hợp với cá nhân, cửa hàng nhỏ, freelancer, chuyên gia và dịch vụ địa phương cần website rõ offer, có SEO nền và đo được lead.',
      },
    },
    {
      '@type': 'Question',
      name: 'Website có tracking và SEO không?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Có. Website được chuẩn bị GA4/GTM tracking, sitemap, robots.txt, metadata, schema, Open Graph, Local SEO và blog SEO nền.',
      },
    },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'YenTH Shop',
  url: 'https://yenth.shop',
  telephone: '+84375266538',
  email: 'khanhvan18052004@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '105 Ung Văn Khiêm',
    addressLocality: 'Bình Thạnh',
    addressRegion: 'TP. Hồ Chí Minh',
    addressCountry: 'VN',
  },
  areaServed: ['TP. Hồ Chí Minh', 'Bình Thạnh', 'Thủ Đức', 'Gò Vấp', 'Quận 1', 'Việt Nam'],
  serviceType: ['Thiết kế website bán hàng', 'Thiết kế landing page', 'Thiết kế website portfolio', 'Local SEO'],
};

export default function Home() {
  return (
    <main className="home-redesign">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="hero redesign-hero">
        <Image
          src="/images/hero-workspace.png"
          alt="Không gian làm việc thiết kế website chuyên nghiệp"
          fill
          priority
          className="hero-image"
          sizes="100vw"
        />
        <div className="hero-overlay" />
        <div className="hero-content redesign-hero-content">
          <p className="eyebrow">Thiết kế web có proof, CTA và Local SEO</p>
          <h1>Thiết kế web cho dịch vụ nhỏ cần đủ tin, đủ rõ và đo được lead.</h1>
          <p>
            YenTH Shop thiết kế website bán hàng, landing page và portfolio cho cá nhân/cửa hàng nhỏ
            cần một trang web đẹp trên mobile, có nội dung SEO, tracking conversion và form hỏi đúng
            nhu cầu khách hàng.
          </p>
          <div className="hero-actions">
            <Link href="/lien-he" className="btn btn-primary" data-track="hero_cta_click" data-track-category="conversion">
              Nhận audit miễn phí trong 24h
            </Link>
            <Link href="#proof" className="btn btn-secondary" data-track="hero_proof_click">
              Xem bố cục mẫu
            </Link>
          </div>
          <div className="hero-metrics" aria-label="Điểm mạnh dịch vụ">
            {metrics.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="redesign-strip">
        {deliverables.map((item) => (
          <span key={item}>{item}</span>
        ))}
        <Link href="/thiet-ke-web">Trang SEO: thiết kế web</Link>
      </section>

      <section id="proof" className="redesign-section proof-lab">
        <div className="redesign-heading">
          <p className="eyebrow">Proof thực tế</p>
          <h2>Đưa preview thật lên sớm để khách không phải tin bằng lời nói.</h2>
        </div>
        <div className="proof-lab-grid">
          {proofCases.map((item) => (
            <article className="proof-lab-card" key={item.title}>
              <Link href={item.href} className="proof-lab-image">
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 820px) 100vw, 48vw" />
              </Link>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="dich-vu" className="redesign-section offer-system">
        <div className="redesign-heading">
          <p className="eyebrow">Dịch vụ</p>
          <h2>Không bán template chung chung, mà dựng bố cục theo mục tiêu liên hệ.</h2>
        </div>
        <div className="offer-grid">
          {services.map((service) => (
            <article key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="quy-trinh" className="redesign-section workflow-system">
        <div className="redesign-heading">
          <p className="eyebrow">Quy trình thực tế</p>
          <h2>Mỗi bước có đầu ra để bạn biết dự án đang đi tới đâu.</h2>
        </div>
        <div className="workflow-system-list">
          {workflow.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="redesign-section trust-lab">
        <div className="redesign-heading">
          <p className="eyebrow">Trust & tracking</p>
          <h2>Niềm tin được biến thành checklist bàn giao và event đo được.</h2>
        </div>
        <div className="trust-lab-grid">
          {trustSignals.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className="tracking-pills">
          {trackingEvents.map((eventName) => (
            <code key={eventName}>{eventName}</code>
          ))}
        </div>
      </section>

      <section id="local-seo" className="redesign-section local-lab">
        <div className="redesign-heading">
          <p className="eyebrow">Local SEO</p>
          <h2>Trang cần nói rõ bạn phục vụ khu vực nào, không chỉ nói “thiết kế website”.</h2>
          <p>
            Nội dung Local SEO được đưa vào NAP, schema, khu vực phục vụ, bài blog nền và các cụm từ
            khách thật thường tìm khi cần website cho dịch vụ địa phương.
          </p>
        </div>
        <div className="area-tags redesign-area-tags">
          {localAreas.map((area) => (
            <span key={area}>{area}</span>
          ))}
        </div>
      </section>

      <section id="goi-gia" className="redesign-section price-lab">
        <div className="redesign-heading">
          <p className="eyebrow">Gói giá</p>
          <h2>Gói Custom làm neo giá trị, Growth là lựa chọn hợp lý nhất cho đa số dịch vụ nhỏ.</h2>
        </div>
        <div className="price-lab-grid">
          {packages.map((item) => (
            <article className={item.featured ? 'featured' : ''} key={item.name}>
              <span>{item.label}</span>
              <h3>{item.name}</h3>
              <strong>{item.price}</strong>
              <p>{item.text}</p>
              <Link href="#lien-he" data-track="pricing_cta_click" data-track-category="conversion" data-track-label={item.name}>
                Trao đổi gói này
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="redesign-section blog-lab">
        <div className="redesign-heading">
          <p className="eyebrow">SEO content</p>
          <h2>Blog nền giúp website có thêm cửa vào từ Google.</h2>
        </div>
        <div className="blog-lab-grid">
          {blogPosts.slice(0, 3).map((post) => (
            <article key={post.slug}>
              <span>{post.readingTime}</span>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <Link href={`/blog/${post.slug}`}>Đọc bài</Link>
            </article>
          ))}
        </div>
      </section>

      <section id="lien-he" className="redesign-contact">
        <div>
          <p className="eyebrow">Conversion form</p>
          <h2>Gửi nhu cầu, nhận lại hướng triển khai trước khi quyết định làm.</h2>
          <p>
            Form hỏi loại website, ngân sách, timeline và mô tả ngắn để cuộc trao đổi đầu tiên đi
            thẳng vào cấu trúc trang, SEO, CTA và chi phí.
          </p>
          <div className="contact-links">
            <a href="tel:0375266538" data-track="phone_click" data-track-category="conversion">
              0375 266 538
            </a>
            <a href="https://zalo.me/0375266538" target="_blank" rel="noreferrer" data-track="zalo_click" data-track-category="conversion">
              Chat Zalo
            </a>
          </div>
        </div>
        <ContactConversionForm />
      </section>

      <footer className="footer">
        <div className="footer-primary">
          <strong>YenTH.shop</strong>
          <span>Website có proof, SEO nền, tracking và form conversion cho dịch vụ nhỏ.</span>
        </div>
        <div className="footer-secondary">
          <Link href="/blog">Blog SEO</Link>
          <Link href="/local-seo">Local SEO</Link>
          <Link href="/bang-gia">Gói giá</Link>
          <a href="mailto:khanhvan18052004@gmail.com">Email</a>
        </div>
      </footer>

      <div className="bottom-dock" aria-label="Thanh liên hệ cố định">
        <div className="bottom-dock-primary">
          <span>Audit website miễn phí trong 24h</span>
          <a href="/lien-he" data-track="bottom_dock_form_click" data-track-category="conversion">
            Gửi nhu cầu
          </a>
        </div>
        <div className="bottom-dock-secondary">
          <a href="https://zalo.me/0375266538" target="_blank" rel="noreferrer" data-track="bottom_dock_zalo_click">
            Chat Zalo
          </a>
          <a href="tel:0375266538" data-track="bottom_dock_phone_click">
            Gọi nhanh
          </a>
        </div>
      </div>
    </main>
  );
}
