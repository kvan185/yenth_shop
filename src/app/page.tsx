import Image from 'next/image';
import Link from 'next/link';
import { ContactConversionForm } from '@/components/ContactConversionForm';
import { NeedPicker } from '@/components/NeedPicker';
import { blogPosts } from '@/data/blog';

const metrics = [
  ['24h', 'phản hồi hướng triển khai đầu tiên'],
  ['7 ngày', 'có bản demo để duyệt bố cục'],
  ['5 điểm chạm', 'form, Zalo, phone, email, CTA'],
];

const heroOutcomes = [
  'Offer rõ trong 5 giây đầu',
  'CTA Zalo/gọi/form xuất hiện đúng ngữ cảnh',
  'SEO nền, schema và tracking được bàn giao cùng website',
];

const templateShowcase = [
  {
    title: 'Shop nhỏ bán sản phẩm',
    image: '/previews/home-desktop.png',
    href: '/web-ban-hang-don-gian-cho-doanh-nghiep-nho/mau_2',
    tags: ['Danh mục', 'Chính sách', 'Hỏi mua Zalo'],
  },
  {
    title: 'Landing page dịch vụ',
    image: '/images/templates/landing-spa-hero.png',
    href: '/landing-page-dich-vu/mau_1',
    tags: ['Gói dịch vụ', 'FAQ', 'Form tư vấn'],
  },
  {
    title: 'Portfolio cá nhân',
    image: '/previews/portfolio-demo-desktop.png',
    href: '/web-portfolio-ca-nhan/mau_1',
    tags: ['Dự án', 'Uy tín cá nhân', 'Liên hệ nhanh'],
  },
];

const proofCases = [
  {
    title: 'Trang dịch vụ có tracking và SEO nền',
    image: '/previews/home-desktop.png',
    desc: 'Cấu trúc hero, proof, bảng giá, Local SEO, blog SEO, schema, sitemap và form lead được gom vào một luồng chuyển đổi.',
    href: '/',
    result: 'Phù hợp để chạy Google, Facebook, Zalo hoặc gửi link tư vấn.',
  },
  {
    title: 'Mẫu shop nhỏ có trang sản phẩm',
    image: '/previews/home-desktop.png',
    desc: 'Có danh mục, sản phẩm nổi bật, chứng nhận, blog, chính sách và nút hỏi mua để chủ shop không phải giải thích lại từ đầu.',
    href: '/web-ban-hang-don-gian-cho-doanh-nghiep-nho/mau_2',
    result: 'Phù hợp với đặc sản, mỹ phẩm, handmade, cửa hàng địa phương.',
  },
];

const caseStudies = [
  {
    title: 'Cửa hàng bán sản phẩm địa phương',
    problem: 'Khách hỏi rải rác qua Facebook/Zalo nhưng chưa có nơi trình bày sản phẩm, chính sách và độ tin cậy.',
    solution: 'Dựng web bán hàng gọn với danh mục sản phẩm, proof, chính sách, CTA Zalo và form hỏi nhu cầu.',
    outcome: 'Khách có link rõ để xem trước khi hỏi mua, chủ shop giảm thời gian giải thích lại.',
  },
  {
    title: 'Dịch vụ cần đặt lịch tư vấn',
    problem: 'Khách nhắn tin nhưng thiếu thông tin, cuộc tư vấn đầu tiên mất nhiều thời gian hỏi lại.',
    solution: 'Làm landing page có gói dịch vụ, FAQ, form lọc nhu cầu và CTA đặt lịch/gọi nhanh.',
    outcome: 'Lead gửi về có ngữ cảnh hơn: loại dịch vụ, ngân sách, timeline và mô tả vấn đề.',
  },
  {
    title: 'Chuyên gia/freelancer cần hồ sơ online',
    problem: 'Portfolio nằm rải rác ở mạng xã hội, khó tạo cảm giác chuyên nghiệp khi gửi cho khách mới.',
    solution: 'Gom câu chuyện cá nhân, dịch vụ, dự án nổi bật, lời chứng thực và form liên hệ vào một trang.',
    outcome: 'Có một hồ sơ đáng tin để gửi trong đề xuất, email, CV hoặc tin nhắn tư vấn.',
  },
];

const beforeAfterScenarios = [
  {
    before: 'Khách hỏi giá qua Zalo nhưng thiếu ngành nghề, ngân sách, timeline và loại website cần làm.',
    after: 'Form lead hỏi đúng 4-5 thông tin chính, giúp buổi tư vấn đầu tiên đi thẳng vào cấu trúc trang và chi phí.',
  },
  {
    before: 'Shop gửi album ảnh rời rạc qua Facebook, khách phải nhắn lại để hỏi sản phẩm, chính sách và phí giao.',
    after: 'Website có danh mục, sản phẩm nổi bật, chính sách, chứng nhận và nút hỏi mua nhanh ở từng ngữ cảnh.',
  },
  {
    before: 'Dịch vụ chạy quảng cáo nhưng landing page thiếu proof, FAQ và tracking nên khó biết kênh nào ra lead.',
    after: 'Trang có proof sớm, FAQ xử lý phản đối, CTA rõ và event đo form, Zalo, phone, email.',
  },
];

const buyerFaqs = [
  ['Tôi chưa biết nên làm loại web nào?', 'Bắt đầu từ mục tiêu: cần khách gọi/Zalo, cần giới thiệu sản phẩm, cần đặt lịch hay cần quản lý dữ liệu. YenTH Shop sẽ gợi ý mẫu và gói sau buổi tư vấn đầu tiên.'],
  ['Tôi chưa có ảnh và nội dung thì sao?', 'Có thể bắt đầu bằng nội dung nền: dịch vụ chính, lợi ích, quy trình, câu hỏi thường gặp và CTA. Ảnh có thể dùng ảnh thật hiện có hoặc chuẩn bị danh sách ảnh cần chụp.'],
  ['Sau khi bàn giao có tự sửa được không?', 'Có hướng dẫn cập nhật phần nội dung cơ bản. Với nhu cầu sửa nhiều hoặc thêm tính năng, có thể tách thành hạng mục bảo trì/nâng cấp sau.'],
  ['Website có giúp SEO ngay không?', 'Website được dựng nền kỹ thuật SEO: metadata, sitemap, robots, schema, nội dung dịch vụ và cấu trúc trang. SEO tăng trưởng cần thêm bài viết và tối ưu đều theo thời gian.'],
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
    name: 'Cơ bản',
    price: '2.900.000đ',
    label: 'Hiện diện nhanh',
    fit: 'Cá nhân, freelancer hoặc dịch vụ nhỏ cần có website gọn để gửi khách xem.',
    timeline: '3-5 ngày',
    text: 'Một trang giới thiệu rõ dịch vụ, có CTA gọi/Zalo/form, responsive và metadata cơ bản.',
    includes: ['1 trang giới thiệu', 'CTA liên hệ rõ', 'Tối ưu mobile', 'SEO nền cơ bản'],
  },
  {
    name: 'Tăng trưởng',
    price: '5.900.000đ',
    label: 'Khuyên chọn',
    featured: true,
    fit: 'Cửa hàng, spa, lớp học, tư vấn hoặc dịch vụ địa phương cần khách hỏi giá/đặt lịch.',
    timeline: '7-10 ngày',
    text: 'Website dịch vụ có proof, bảng giá, Local SEO, schema, tracking event, form conversion và Search Console.',
    includes: ['3-5 section bán hàng', 'Bảng giá/gói dịch vụ', 'Local SEO + schema', 'Tracking chuyển đổi'],
  },
  {
    name: 'Theo yêu cầu',
    price: 'Từ 12.000.000đ',
    label: 'Neo giá trị',
    fit: 'Doanh nghiệp cần nhiều trang, quy trình riêng, đăng bài, sản phẩm, đặt lịch hoặc hệ thống nội bộ.',
    timeline: 'Theo phạm vi',
    text: 'Xây theo luồng vận hành thật: nhiều trang, blog SEO, quản lý sản phẩm, đặt lịch, dashboard hoặc tích hợp riêng.',
    includes: ['Nhiều trang/chức năng', 'Blog hoặc sản phẩm', 'Dashboard/tích hợp', 'Bàn giao theo milestone'],
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

const simpleTechProof = [
  ['Tải nhanh trên điện thoại', 'Giao diện được ưu tiên cho màn hình nhỏ, nơi khách thường mở link từ Zalo, Facebook và Google.'],
  ['Dễ chia sẻ lên mạng xã hội', 'Có tiêu đề, mô tả và ảnh preview để khi gửi link nhìn chuyên nghiệp hơn.'],
  ['Sẵn sàng đo lường', 'Các nút liên hệ quan trọng được gắn tracking để biết khách đến từ đâu và bấm gì.'],
  ['Dễ được Google hiểu', 'Có sitemap, robots, metadata, schema và nội dung dịch vụ/khu vực rõ ràng.'],
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

const localSeoClusters = [
  ['Theo khu vực', 'Bình Thạnh, Thủ Đức, Gò Vấp, Quận 1, TP.HCM'],
  ['Theo ngành', 'spa, lớp học, tư vấn, sửa chữa, studio, shop đặc sản'],
  ['Theo ý định tìm kiếm', 'thiết kế website giá rõ, landing page chạy quảng cáo, web bán hàng nhỏ'],
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
          alt="Không gian làm việc thiết kế website chuyển đổi"
          fill
          priority
          className="hero-image"
          sizes="100vw"
        />
        <div className="hero-overlay" />
        <div className="hero-content redesign-hero-content">
          <p className="eyebrow">Website có mẫu thật, SEO nền và đo chuyển đổi</p>
          <h1>Thiết kế website/landing page cho shop nhỏ và dịch vụ cần khách liên hệ rõ ràng.</h1>
          <p>
            YenTH Shop dựng website theo mục tiêu kinh doanh: có mẫu để xem trước, nội dung dễ hiểu,
            CTA đúng chỗ, form lọc nhu cầu và tracking để biết khách bấm vào đâu.
          </p>
          <ul className="hero-outcomes" aria-label="Kết quả website cần đạt">
            {heroOutcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="hero-actions">
            <Link href="/lien-he" className="btn btn-primary" data-track="hero_cta_click" data-track-category="conversion">
              Nhận tư vấn miễn phí
            </Link>
            <Link href="#kho-mau" className="btn btn-secondary" data-track="hero_template_click">
              Xem mẫu website
            </Link>
          </div>
          <p className="cta-trust-note">Không cần chốt gói ngay. Gửi nhu cầu trước, nhận hướng triển khai trong 24h.</p>
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
        <Link href="/bang-gia">Xem bảng giá minh bạch</Link>
      </section>

      <section id="kho-mau" className="redesign-section template-priority">
        <div className="redesign-heading">
          <p className="eyebrow">Kho mẫu nổi bật</p>
          <h2>Xem nhanh mẫu phù hợp trước khi trao đổi chi phí.</h2>
          <p>
            Khách không cần tưởng tượng từ mô tả dài. Mỗi nhóm mẫu đi kèm mục tiêu chuyển đổi, nội dung cần có
            và CTA phù hợp với hành vi mua hàng trên Google, Facebook, Zalo.
          </p>
        </div>
        <div className="template-priority-grid">
          {templateShowcase.map((item) => (
            <article key={item.title}>
              <Link href={item.href} className="template-priority-image">
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 820px) 100vw, 33vw" />
              </Link>
              <div>
                <h3>{item.title}</h3>
                <div className="template-priority-tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <Link href={item.href}>Xem demo</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <NeedPicker />

      <section id="proof" className="redesign-section proof-lab">
        <div className="redesign-heading">
          <p className="eyebrow">Proof thực tế</p>
          <h2>Preview thật, vấn đề thật và kết quả kỳ vọng rõ ràng.</h2>
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
                <strong>{item.result}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="redesign-section case-study-lab">
        <div className="redesign-heading">
          <p className="eyebrow">Case study định hướng</p>
          <h2>Mỗi website nên bắt đầu từ một vấn đề kinh doanh cụ thể.</h2>
          <p>
            Nếu chưa có dự án thật để công khai, các tình huống dưới đây giúp bạn hình dung cách YenTH Shop
            biến nhu cầu phổ biến thành cấu trúc trang, CTA và nội dung bàn giao.
          </p>
        </div>
        <div className="case-study-grid">
          {caseStudies.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <dl>
                <div>
                  <dt>Vấn đề</dt>
                  <dd>{item.problem}</dd>
                </div>
                <div>
                  <dt>Giải pháp</dt>
                  <dd>{item.solution}</dd>
                </div>
                <div>
                  <dt>Kết quả kỳ vọng</dt>
                  <dd>{item.outcome}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="redesign-section before-after-lab">
        <div className="redesign-heading">
          <p className="eyebrow">Trước / sau</p>
          <h2>Biến những điểm nghẽn bán hàng thường gặp thành luồng website rõ ràng.</h2>
        </div>
        <div className="before-after-grid">
          {beforeAfterScenarios.map((item) => (
            <article key={item.before}>
              <div>
                <span>Trước</span>
                <p>{item.before}</p>
              </div>
              <div>
                <span>Sau</span>
                <p>{item.after}</p>
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

      <section className="redesign-section tech-proof-lab">
        <div className="redesign-heading">
          <p className="eyebrow">Kỹ thuật nói bằng lợi ích</p>
          <h2>Những phần kỹ thuật được chuyển thành điều khách hàng thật sự cảm nhận được.</h2>
        </div>
        <div className="tech-proof-grid">
          {simpleTechProof.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
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
        <div className="local-cluster-grid">
          {localSeoClusters.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="goi-gia" className="redesign-section price-lab">
        <div className="redesign-heading">
          <p className="eyebrow">Bảng giá minh bạch</p>
          <h2>Biết trước khoảng đầu tư, phạm vi bàn giao và gói nào hợp với giai đoạn hiện tại.</h2>
          <p>
            Giá được chia theo mục tiêu sử dụng để bạn dễ so sánh: cần hiện diện nhanh, cần tạo lead đều hơn,
            hay cần xây hệ thống riêng có nhiều trang và chức năng.
          </p>
        </div>
        <div className="price-lab-grid">
          {packages.map((item) => (
            <article className={item.featured ? 'featured' : ''} key={item.name}>
              <span>{item.label}</span>
              <h3>{item.name}</h3>
              <strong>{item.price}</strong>
              <p>{item.text}</p>
              <div className="price-fit">
                <b>Phù hợp:</b>
                <small>{item.fit}</small>
              </div>
              <ul>
                {item.includes.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="price-meta">
                <b>Thời gian:</b>
                <small>{item.timeline}</small>
              </div>
              <Link href="#lien-he" data-track="pricing_cta_click" data-track-category="conversion" data-track-label={item.name}>
                Trao đổi gói này
              </Link>
            </article>
          ))}
        </div>
        <div className="price-assurance">
          <strong>Không chốt gói khi chưa hiểu nhu cầu.</strong>
          <span>Buổi tư vấn đầu tiên dùng để xác định loại website, nội dung cần có, CTA chính và phạm vi chi phí phù hợp.</span>
          <Link href="/bang-gia">Xem trang bảng giá đầy đủ</Link>
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

      <section className="redesign-section buyer-faq-lab">
        <div className="redesign-heading">
          <p className="eyebrow">Câu hỏi trước khi làm web</p>
          <h2>Trả lời sớm những điều khách thường phân vân trước khi liên hệ.</h2>
        </div>
        <div className="buyer-faq-list">
          {buyerFaqs.map(([question, answer]) => (
            <article key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
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
          <ul className="contact-trust-list">
            <li>Không cần chuẩn bị nội dung hoàn chỉnh trước khi hỏi.</li>
            <li>Tư vấn loại web và gói phù hợp trước, báo giá sau khi rõ phạm vi.</li>
            <li>Ưu tiên trả lời bằng hướng triển khai cụ thể, không chỉ gửi bảng giá.</li>
          </ul>
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
          <Link href="/lien-he" data-track="bottom_dock_form_click" data-track-category="conversion">
            Gửi nhu cầu
          </Link>
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
