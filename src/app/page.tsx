import Image from 'next/image';
import Link from 'next/link';
import { ContactConversionForm } from '@/components/ContactConversionForm';
import { blogPosts } from '@/data/blog';

const services = [
  {
    title: 'Website giới thiệu',
    text: 'Trang cá nhân, hồ sơ năng lực, landing page dịch vụ hoặc trang thương hiệu có nội dung rõ ràng và dễ tạo niềm tin.',
  },
  {
    title: 'Website bán hàng',
    text: 'Gian hàng online có danh mục sản phẩm, giỏ hàng, trang liên hệ và phần quản trị cơ bản để cập nhật nội dung.',
  },
  {
    title: 'Tối ưu tìm kiếm',
    text: 'Cấu trúc SEO nền tảng, tốc độ tải tốt, nội dung theo từ khóa khách hàng hay tìm và dữ liệu chia sẻ mạng xã hội.',
  },
  {
    title: 'Chăm sóc sau bàn giao',
    text: 'Hỗ trợ chỉnh sửa, thêm tính năng, hướng dẫn quản trị và đồng hành khi website bắt đầu có khách truy cập.',
  },
];

const process = [
  ['01', 'Hiểu nhu cầu', 'Trao đổi ngành nghề, khách hàng mục tiêu, nội dung sẵn có và cách bạn muốn nhận liên hệ.'],
  ['02', 'Dựng giao diện', 'Thiết kế bố cục, màu sắc, nội dung chính và trải nghiệm trên điện thoại trước khi hoàn thiện.'],
  ['03', 'Phát triển web', 'Code website, tối ưu tốc độ, SEO cơ bản, form liên hệ, đo lường và kiểm tra lỗi hiển thị.'],
  ['04', 'Bàn giao & hỗ trợ', 'Hướng dẫn sử dụng, deploy tên miền, bàn giao mã nguồn và tiếp tục hỗ trợ khi cần nâng cấp.'],
];

const realWorkflow = [
  {
    day: 'Ngày 1',
    title: 'Chốt mục tiêu & checklist nội dung',
    text: 'Tôi hỏi rõ dịch vụ chính, nhóm khách hàng, khu vực phục vụ, CTA cần đo và những phần bạn đã có như logo, ảnh, sản phẩm, bảng giá.',
  },
  {
    day: 'Ngày 2-3',
    title: 'Lên wireframe và nội dung chuyển đổi',
    text: 'Dựng bố cục trang, viết lại headline, CTA, phần niềm tin, quy trình, cam kết và form để người xem hiểu nhanh nên liên hệ vì điều gì.',
  },
  {
    day: 'Ngày 4-6',
    title: 'Code giao diện, SEO và tracking',
    text: 'Triển khai responsive, metadata, sitemap, robots.txt, schema, Open Graph, form conversion và các event đo CTA, phone, Zalo, form submit.',
  },
  {
    day: 'Ngày 7',
    title: 'Review, public và bàn giao',
    text: 'Kiểm tra mobile, tốc độ, link, form, Search Console, hướng dẫn cập nhật nội dung và bàn giao mã nguồn/tài khoản triển khai rõ ràng.',
  },
];

const packages = [
  {
    name: 'Starter',
    price: '2.900.000đ',
    anchor: 'Gói vào nghề',
    desc: 'Phù hợp cá nhân hoặc dịch vụ mới cần một trang giới thiệu nhanh, đẹp, responsive và có form liên hệ cơ bản.',
  },
  {
    name: 'Growth',
    price: '5.900.000đ',
    anchor: 'Được chọn nhiều nhất',
    featured: true,
    desc: 'Gói cân bằng nhất cho cửa hàng và dịch vụ địa phương: landing page/website nhiều phần, SEO nền, tracking, Search Console và form conversion.',
  },
  {
    name: 'Custom',
    price: 'Từ 12.000.000đ',
    anchor: 'Neo giá trị',
    desc: 'Dành cho dự án cần blog SEO, nhiều trang, quản lý sản phẩm, đặt lịch, dashboard hoặc tích hợp hệ thống riêng.',
  },
];

const works = [
  'Landing page dịch vụ',
  'Website bán hàng yến sào',
  'Trang cá nhân chuyên gia',
  'Blog chia sẻ kiến thức',
  'Trang doanh nghiệp nhỏ',
  'Mini CRM nội bộ',
];

const templates = [
  {
    title: 'Website cá nhân / portfolio',
    desc: 'Mẫu dành cho freelancer, chuyên gia, creator hoặc người cần một hồ sơ online chuyên nghiệp.',
    href: '/mau/portfolio',
    tag: 'Demo mới',
  },
  {
    title: 'Landing page dịch vụ',
    desc: 'Mẫu một trang cho spa, tư vấn, lớp học, sửa chữa hoặc dịch vụ địa phương cần khách đặt lịch nhanh.',
    href: '/mau/landing-page-dich-vu',
    tag: 'Dễ chốt khách',
  },
];

const proofCases = [
  {
    title: 'Trang dịch vụ YenTH Shop',
    image: '/previews/home-desktop.png',
    desc: 'Trang chủ có hero rõ dịch vụ, CTA, form conversion, Local SEO, blog SEO, sitemap, robots và tracking sự kiện.',
    result: 'Phù hợp dịch vụ cá nhân, cửa hàng nhỏ, tư vấn, spa, lớp học hoặc thương hiệu mới.',
  },
  {
    title: 'Mẫu portfolio cá nhân',
    image: '/previews/portfolio-demo-desktop.png',
    desc: 'Mẫu portfolio có câu chuyện cá nhân, dự án nổi bật, lời chứng thực, form liên hệ và bố cục tối ưu cho mobile.',
    result: 'Phù hợp freelancer, chuyên gia, creator, tư vấn viên hoặc người làm thương hiệu cá nhân.',
  },
];

const trustSignals = [
  ['3 nhóm', 'website đang nhận làm'],
  ['7 ngày', 'có bản demo đầu tiên'],
  ['100%', 'responsive & SEO nền tảng'],
];

const trustBadges = [
  'Bàn giao mã nguồn',
  'Gắn Google Search Console',
  'Tối ưu tốc độ & mobile',
  'Hướng dẫn quản trị sau bàn giao',
];

const trustStack = [
  {
    title: 'Đo được chuyển đổi',
    text: 'CTA, click gọi điện, click Zalo, click email và submit form đều được gắn event để biết khách đến từ đâu và hành động gì.',
  },
  {
    title: 'Không mất tài sản số',
    text: 'Bạn giữ mã nguồn, tài khoản deploy, domain, Search Console, sitemap và toàn bộ nội dung đã triển khai.',
  },
  {
    title: 'Có checklist bàn giao',
    text: 'Trước khi public, tôi kiểm tra responsive, metadata, Open Graph, robots.txt, sitemap, schema, form và các link liên hệ.',
  },
  {
    title: 'Có người giải thích sau khi xong',
    text: 'Bạn được hướng dẫn cách cập nhật nội dung, đọc chỉ số cơ bản và biết phần nào nên tối ưu tiếp sau khi website có traffic.',
  },
];

const trackingPlan = [
  ['view_home', 'Người dùng vào trang chủ'],
  ['hero_cta_click', 'Bấm CTA audit miễn phí'],
  ['pricing_cta_click', 'Bấm chọn gói giá'],
  ['phone_click / zalo_click', 'Liên hệ nhanh qua điện thoại hoặc Zalo'],
  ['lead_form_submit', 'Gửi form tư vấn website'],
];

const localHighlights = [
  'Thiết kế website cho cá nhân, cửa hàng và dịch vụ tại TP. Hồ Chí Minh',
  'Tư vấn online, nhận dự án ở Bình Thạnh, Thủ Đức, Gò Vấp, Quận 1 và toàn quốc',
  'Tối ưu NAP, sitemap, robots.txt, Search Console và schema ngay khi bàn giao',
];

const localAreas = [
  'Thiết kế website tại Bình Thạnh',
  'Thiết kế landing page tại Thủ Đức',
  'Website bán hàng tại Gò Vấp',
  'Website dịch vụ tại Quận 1',
  'Website cá nhân tại TP. Hồ Chí Minh',
  'Tư vấn làm website online toàn quốc',
];

const seoContentBlocks = [
  {
    title: 'Thiết kế website bán hàng cần rõ sản phẩm, giá trị và cách đặt mua',
    text: 'Một website bán hàng tốt không chỉ đẹp. Trang cần có danh mục dễ hiểu, ảnh sản phẩm đáng tin, mô tả lợi ích, chính sách giao hàng, nút gọi/Zalo và cấu trúc SEO để Google hiểu cửa hàng đang bán gì.',
  },
  {
    title: 'Landing page dịch vụ cần thuyết phục trong vài giây đầu',
    text: 'Khách thường không đọc hết trang nếu phần đầu không nói rõ dịch vụ, khu vực phục vụ, lợi ích và bước tiếp theo. Vì vậy landing page cần hook mạnh, proof trực quan, cam kết, bảng giá neo tâm lý và form hỏi đúng thông tin.',
  },
  {
    title: 'Website địa phương cần Local SEO ngay từ khi public',
    text: 'Local SEO không chỉ là nhắc tên TP. Hồ Chí Minh. Website cần NAP nhất quán, schema dịch vụ, sitemap, robots, Google Search Console, blog trả lời câu hỏi thật và nội dung khu vực được viết tự nhiên.',
  },
];

const guarantees = [
  {
    title: 'Demo trước khi hoàn thiện',
    text: 'Bạn được xem bản demo bố cục và nội dung chính trước khi tôi đi vào hoàn thiện toàn bộ trang.',
  },
  {
    title: 'Sửa hợp lý sau bàn giao',
    text: 'Hỗ trợ chỉnh các lỗi hiển thị, nội dung nhỏ và hướng dẫn vận hành trong 7 ngày sau khi bàn giao.',
  },
  {
    title: 'Bàn giao tài sản rõ ràng',
    text: 'Bàn giao mã nguồn, tài khoản triển khai, sitemap, robots.txt, Search Console và hướng dẫn cập nhật nội dung.',
  },
  {
    title: 'Không bỏ quên mobile',
    text: 'Các trang chính được kiểm tra trên điện thoại để CTA, form, chữ và hình ảnh không bị lệch hoặc khó thao tác.',
  },
];

const brandPrinciples = [
  'Trang web phải giúp khách hiểu nhanh bạn bán gì, phục vụ ai và vì sao nên tin.',
  'Thiết kế phải phục vụ chuyển đổi, không chỉ để nhìn đẹp trong ảnh chụp màn hình.',
  'SEO nền tảng, tracking và tài sản bàn giao là một phần của sản phẩm, không phải phụ kiện.',
];

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'YenTH Shop',
  url: 'https://yenth.shop',
  image: 'https://yenth.shop/opengraph-image',
  telephone: '+84375266538',
  email: 'khanhvan18052004@gmail.com',
  priceRange: '₫₫',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '105 Ung Văn Khiêm',
    addressLocality: 'Bình Thạnh',
    addressRegion: 'TP. Hồ Chí Minh',
    addressCountry: 'VN',
  },
  areaServed: [
    'TP. Hồ Chí Minh',
    'Bình Thạnh',
    'Thủ Đức',
    'Gò Vấp',
    'Quận 1',
    'Việt Nam',
  ],
  serviceType: [
    'Thiết kế website bán hàng',
    'Thiết kế landing page',
    'Thiết kế website portfolio',
    'Tối ưu SEO nền tảng',
  ],
  sameAs: ['https://zalo.me/0375266538'],
};
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'YenTH Shop',
  url: 'https://yenth.shop',
  inLanguage: 'vi-VN',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://yenth.shop/blog?search={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'YenTH Shop làm những loại website nào?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'YenTH Shop làm website bán hàng, landing page dịch vụ, portfolio cá nhân, website doanh nghiệp nhỏ và các trang có nền SEO, tracking, form conversion.',
      },
    },
    {
      '@type': 'Question',
      name: 'Website có được tối ưu SEO và Local SEO không?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Có. Website được triển khai metadata, sitemap, robots.txt, schema, Open Graph, Search Console và nội dung khu vực phục vụ phù hợp với dịch vụ.',
      },
    },
    {
      '@type': 'Question',
      name: 'Sau khi bàn giao có theo dõi chuyển đổi được không?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Có. Website có thể gắn GA4 hoặc Google Tag Manager qua biến môi trường và theo dõi CTA, click gọi điện, Zalo, email, form submit.',
      },
    },
  ],
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <header className="site-header">
        <Link className="brand" href="/">
          YenTH<span>.shop</span>
        </Link>
        <nav aria-label="Điều hướng chính">
          <Link href="#dich-vu">Dịch vụ</Link>
          <Link href="#local-seo">Local SEO</Link>
          <Link href="/blog">Blog</Link>
          <Link href="#quy-trinh">Quy trình</Link>
          <Link href="#bang-gia">Bảng giá</Link>
          <Link href="#lien-he">Liên hệ</Link>
        </nav>
      </header>

      <section className="hero">
        <Image
          src="/images/hero-workspace.png"
          alt="Không gian làm việc thiết kế website hiện đại"
          fill
          priority
          className="hero-image"
          sizes="100vw"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">Dịch vụ thiết kế website bán hàng, landing page và portfolio</p>
          <h1>Làm website chuyên nghiệp để khách tin bạn ngay từ lần xem đầu tiên.</h1>
          <p>
            YenTH Shop xây website giới thiệu, landing page, website bán hàng và portfolio cá nhân
            cho người kinh doanh nhỏ cần trang web đẹp, rõ dịch vụ, dễ lên Google và có nút liên hệ
            đủ mạnh để khách để lại thông tin.
          </p>
          <div className="hero-actions">
            <Link
              href="#lien-he"
              className="btn btn-primary"
              data-track="hero_cta_click"
              data-track-category="conversion"
              data-track-label="Nhận audit website miễn phí"
            >
              Nhận audit website miễn phí trong 24h
            </Link>
            <Link
              href="#mau-giao-dien"
              className="btn btn-secondary"
              data-track="hero_secondary_click"
              data-track-category="cta"
              data-track-label="Xem mẫu đã dựng"
            >
              Xem mẫu đã dựng
            </Link>
          </div>
          <p className="cta-note">Bạn nhận lại checklist trang cần có, hướng SEO/CTA và khoảng chi phí phù hợp trước khi quyết định làm.</p>
          <div className="trust-metrics" aria-label="Cam kết và năng lực triển khai">
            {trustSignals.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="hero-stats" aria-label="Điểm tạo niềm tin">
            {trustBadges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="intro section">
        <div>
          <p className="eyebrow">Về tôi</p>
          <h2>Làm web không chỉ là dựng giao diện, mà là biến dịch vụ của bạn thành một điểm chạm đáng tin.</h2>
        </div>
        <p>
          Tôi tập trung vào các website thực dụng: tải nhanh, rõ nội dung, nhìn chuyên nghiệp trên
          điện thoại và có đường liên hệ đủ rõ để khách không phải đoán. Nếu bạn đang bắt đầu bán
          hàng, làm thương hiệu cá nhân hoặc cần một trang giới thiệu dịch vụ, YenTH Shop là nơi để
          bạn đặt nền móng online đầu tiên.
        </p>
      </section>

      <section className="brand-depth section">
        <div className="section-heading">
          <p className="eyebrow">Chiều sâu thương hiệu</p>
          <h2>YenTH Shop không bán “một trang web”, mà bán một nền tảng nhỏ để bạn được khách tin và liên hệ.</h2>
        </div>
        <div className="brand-depth-grid">
          <div className="brand-story">
            <h3>Góc nhìn triển khai</h3>
            <p>
              Tôi xây website cho cá nhân, cửa hàng và dịch vụ nhỏ nên ưu tiên thứ rất thực tế:
              khách đọc có hiểu không, có tin không, có biết bấm vào đâu không, và chủ website có
              tự quản trị được sau khi bàn giao không.
            </p>
          </div>
          <div className="brand-principles">
            {brandPrinciples.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="proof section">
        <div className="section-heading">
          <p className="eyebrow">Proof thực tế</p>
          <h2>Không chỉ nói “làm website đẹp”, đây là các mẫu đã dựng để bạn kiểm tra bố cục thật.</h2>
        </div>
        <div className="proof-grid">
          {proofCases.map((item) => (
            <article className="proof-card" key={item.title}>
              <div className="proof-image-wrap">
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 820px) 100vw, 50vw" />
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <strong>{item.result}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="dich-vu" className="section services">
        <div className="section-heading">
          <p className="eyebrow">Dịch vụ</p>
          <h2>Tôi có thể xây gì cho bạn?</h2>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="trust-system section">
        <div className="section-heading">
          <p className="eyebrow">Trust signals</p>
          <h2>Niềm tin không chỉ nằm ở lời hứa, mà nằm ở những thứ bạn kiểm tra được sau bàn giao.</h2>
        </div>
        <div className="trust-system-grid">
          {trustStack.map((item) => (
            <article className="trust-system-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="local-seo" className="local-seo section">
        <div className="section-heading">
          <p className="eyebrow">Local SEO</p>
          <h2>Không chỉ có giao diện đẹp, website còn cần nói rõ bạn phục vụ ai và ở đâu.</h2>
          <p>
            YenTH Shop tối ưu thông tin địa phương ngay từ cấu trúc trang: tên thương hiệu, số điện
            thoại, email, khu vực phục vụ, dữ liệu có cấu trúc và các URL quan trọng cho Google.
          </p>
        </div>
        <div className="local-grid">
          <article className="local-card">
            <span>NAP</span>
            <h3>YenTH Shop</h3>
            <p>105 Ung Văn Khiêm, Bình Thạnh, TP. Hồ Chí Minh</p>
            <a href="tel:0375266538">0375 266 538</a>
            <a href="mailto:khanhvan18052004@gmail.com">khanhvan18052004@gmail.com</a>
          </article>
          <article className="local-card local-card-strong">
            <span>Khu vực phục vụ</span>
            <h3>TP. Hồ Chí Minh và toàn quốc</h3>
            <ul>
              {localHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
        <div className="area-tags" aria-label="Khu vực và nhu cầu Local SEO">
          {localAreas.map((area) => (
            <span key={area}>{area}</span>
          ))}
        </div>
      </section>

      <section className="seo-content section">
        <div className="section-heading">
          <p className="eyebrow">SEO content</p>
          <h2>Nội dung trên trang được viết để khách hiểu nhanh và Google hiểu đúng dịch vụ.</h2>
        </div>
        <div className="seo-content-grid">
          {seoContentBlocks.map((item) => (
            <article className="seo-content-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="tracking-system section">
        <div className="section-heading">
          <p className="eyebrow">Tracking system</p>
          <h2>Website được chuẩn bị để đo lead, không chỉ để “có mặt trên mạng”.</h2>
          <p>
            Khi bạn thêm GA4 hoặc Google Tag Manager trên Vercel, các hành động quan trọng sẽ được
            đẩy vào dataLayer/gtag để phân tích nguồn lead và tối ưu CTA.
          </p>
        </div>
        <div className="tracking-grid">
          {trackingPlan.map(([eventName, meaning]) => (
            <article key={eventName}>
              <code>{eventName}</code>
              <span>{meaning}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="quy-trinh" className="section process-section">
        <div className="section-heading">
          <p className="eyebrow">Quy trình</p>
          <h2>Làm rõ từ đầu, triển khai gọn từng bước.</h2>
        </div>
        <div className="process-list">
          {process.map(([number, title, text]) => (
            <article key={number} className="process-item">
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="workflow section">
        <div className="section-heading">
          <p className="eyebrow">Quy trình thực tế</p>
          <h2>Mỗi bước đều có đầu ra rõ, để bạn biết website đang tiến triển tới đâu.</h2>
        </div>
        <div className="workflow-list">
          {realWorkflow.map((item) => (
            <article className="workflow-item" key={item.day}>
              <span>{item.day}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio section">
        <div className="portfolio-copy">
          <p className="eyebrow">Kiểu dự án phù hợp</p>
          <h2>Ưu tiên các website nhỏ đến vừa, cần ra mắt nhanh nhưng vẫn chỉn chu.</h2>
          <p>
            Mỗi dự án được xây theo mục tiêu thật: giới thiệu bản thân, lấy khách hàng tiềm năng,
            bán sản phẩm, chia sẻ kiến thức hoặc quản lý nội dung. Bạn không cần biết kỹ thuật trước,
            chỉ cần có ý tưởng và mong muốn kinh doanh rõ ràng.
          </p>
        </div>
        <div className="work-tags">
          {works.map((work) => (
            <span key={work}>{work}</span>
          ))}
        </div>
      </section>

      <section id="mau-giao-dien" className="section template-showcase">
        <div className="section-heading">
          <p className="eyebrow">Mẫu giao diện</p>
          <h2>Khách có thể xem mẫu thật trước khi chọn hướng triển khai.</h2>
        </div>
        <div className="template-grid">
          {templates.map((template) => (
            <article className="template-card" key={template.href}>
              <span>{template.tag}</span>
              <h3>{template.title}</h3>
              <p>{template.desc}</p>
              <Link href={template.href} className="text-link">
                Xem demo
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section blog-preview">
        <div className="section-heading">
          <p className="eyebrow">Blog SEO</p>
          <h2>Nội dung nền giúp website có thêm điểm chạm từ Google.</h2>
        </div>
        <div className="blog-preview-grid">
          {blogPosts.slice(0, 3).map((post) => (
            <article className="blog-preview-card" key={post.slug}>
              <span>{post.readingTime}</span>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <Link className="text-link" href={`/blog/${post.slug}`}>
                Đọc bài
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="guarantees section">
        <div className="section-heading">
          <p className="eyebrow">Cam kết</p>
          <h2>Rõ việc, rõ tài sản bàn giao, rõ cách đo hiệu quả sau khi public.</h2>
        </div>
        <div className="guarantee-grid">
          {guarantees.map((item) => (
            <article className="guarantee-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="bang-gia" className="section pricing">
        <div className="section-heading">
          <p className="eyebrow">Gói tham khảo</p>
          <h2>Gói Custom đặt neo giá trị, để gói Growth trở thành lựa chọn hợp lý nhất.</h2>
          <p className="pricing-note">
            Nếu bạn chỉ cần hiện diện nhanh, Starter là đủ. Nếu bạn cần SEO, tracking, form
            conversion và tài sản bàn giao rõ, Growth là điểm cân bằng. Custom cho dự án cần chiều
            sâu nội dung, blog, tính năng riêng hoặc nhiều trang.
          </p>
        </div>
        <div className="pricing-grid">
          {packages.map((item) => (
            <article className={`price-card${item.featured ? ' price-card-featured' : ''}`} key={item.name}>
              <span className="price-anchor">{item.anchor}</span>
              <h3>{item.name}</h3>
              <strong>{item.price}</strong>
              <p>{item.desc}</p>
              <Link
                href="#lien-he"
                className="text-link"
                data-track="pricing_cta_click"
                data-track-category="conversion"
                data-track-label={item.name}
              >
                Trao đổi gói này
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="lien-he" className="contact">
        <div className="contact-copy">
          <p className="eyebrow">Bắt đầu dự án</p>
          <h2>Kể tôi nghe bạn muốn website làm được điều gì.</h2>
          <p>
            Gửi mô tả ngắn về ngành nghề, số trang cần có, ngân sách dự kiến và thời gian mong muốn.
            Tôi sẽ phản hồi bằng hướng triển khai rõ ràng.
          </p>
          <div className="contact-links">
            <a
              href="tel:0375266538"
              data-track="phone_click"
              data-track-category="conversion"
              data-track-label="Hotline"
            >
              Hotline: 0375 266 538
            </a>
            <a
              href="mailto:khanhvan18052004@gmail.com"
              data-track="email_click"
              data-track-category="conversion"
              data-track-label="Email"
            >
              khanhvan18052004@gmail.com
            </a>
            <a
              href="https://zalo.me/0375266538"
              target="_blank"
              rel="noreferrer"
              data-track="zalo_click"
              data-track-category="conversion"
              data-track-label="Zalo"
            >
              Chat Zalo
            </a>
          </div>
        </div>
        <ContactConversionForm />
      </section>

      <footer className="footer">
        <strong>YenTH.shop</strong>
        <span>Dịch vụ xây dựng website online cho cá nhân, cửa hàng và doanh nghiệp nhỏ.</span>
      </footer>
      <div className="live-chat" aria-label="Liên hệ nhanh">
        <a
          href="https://zalo.me/0375266538"
          target="_blank"
          rel="noreferrer"
          data-track="floating_zalo_click"
          data-track-category="conversion"
          data-track-label="Live chat Zalo"
        >
          Chat Zalo
        </a>
        <a
          href="tel:0375266538"
          data-track="floating_phone_click"
          data-track-category="conversion"
          data-track-label="Floating phone"
        >
          Gọi nhanh
        </a>
      </div>
    </main>
  );
}
