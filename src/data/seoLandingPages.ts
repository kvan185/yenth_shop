export type SeoLandingPage = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  primaryKeyword: string;
  serviceType: string[];
  areaServed: string[];
  useCases: Array<{
    title: string;
    text: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const seoLandingPages: SeoLandingPage[] = [
  {
    slug: 'thiet-ke-website-ban-hang',
    title: 'Thiết kế website bán hàng cho cửa hàng nhỏ',
    description:
      'Dịch vụ thiết kế website bán hàng cho cửa hàng nhỏ: giới thiệu sản phẩm, chính sách, nút Zalo/gọi nhanh, SEO nền tảng và form nhận lead.',
    eyebrow: 'Website bán hàng',
    h1: 'Thiết kế website bán hàng rõ sản phẩm, rõ chính sách và dễ hỏi mua.',
    lead:
      'YenTH Shop xây website bán hàng cho cửa hàng nhỏ cần trưng bày sản phẩm, tạo niềm tin, nhận tư vấn qua Zalo/điện thoại và có nền SEO đủ sạch để Google hiểu ngành hàng.',
    primaryKeyword: 'thiết kế website bán hàng',
    serviceType: ['Thiết kế website bán hàng', 'Website cửa hàng nhỏ', 'SEO sản phẩm nền tảng'],
    areaServed: ['TP. Hồ Chí Minh', 'Bình Thạnh', 'Thủ Đức', 'Gò Vấp', 'Việt Nam'],
    useCases: [
      {
        title: 'Cửa hàng cần hỏi mua qua Zalo',
        text: 'Trang sản phẩm, chính sách giao hàng, bảo hành và CTA Zalo/gọi nhanh được đặt đúng vị trí để giảm bước ra quyết định.',
      },
      {
        title: 'Shop chưa cần giỏ hàng phức tạp',
        text: 'Phù hợp giai đoạn đầu khi chủ shop cần website đáng tin, dễ cập nhật và đo được nguồn khách liên hệ.',
      },
      {
        title: 'Sản phẩm cần giải thích lợi ích',
        text: 'Bố cục giúp khách hiểu sản phẩm, đối tượng phù hợp, giá trị khác biệt và cách đặt hàng.',
      },
    ],
    faqs: [
      {
        question: 'Website bán hàng có cần giỏ hàng ngay không?',
        answer:
          'Không phải lúc nào cũng cần. Với cửa hàng nhỏ, giai đoạn đầu có thể ưu tiên trang sản phẩm rõ, CTA Zalo/gọi nhanh và form hỏi mua để ra lead nhanh hơn.',
      },
      {
        question: 'Website bán hàng có SEO được không?',
        answer:
          'Có. Website cần URL rõ, metadata, heading, nội dung danh mục/sản phẩm, sitemap, schema và blog hỗ trợ theo nhóm sản phẩm chính.',
      },
    ],
  },
  {
    slug: 'thiet-ke-landing-page',
    title: 'Thiết kế landing page dịch vụ tối ưu chuyển đổi',
    description:
      'Thiết kế landing page cho spa, lớp học, tư vấn, sửa chữa, studio và dịch vụ địa phương cần khách đặt lịch hoặc gửi thông tin.',
    eyebrow: 'Landing page dịch vụ',
    h1: 'Thiết kế landing page tập trung vào một mục tiêu: khách để lại thông tin.',
    lead:
      'Landing page tốt phải nói rõ dịch vụ, khu vực phục vụ, lý do nên tin, quy trình, mức giá tham khảo và CTA đủ cụ thể để khách hành động.',
    primaryKeyword: 'thiết kế landing page',
    serviceType: ['Thiết kế landing page', 'Landing page dịch vụ', 'Tối ưu chuyển đổi'],
    areaServed: ['TP. Hồ Chí Minh', 'Bình Thạnh', 'Thủ Đức', 'Gò Vấp', 'Việt Nam'],
    useCases: [
      {
        title: 'Dịch vụ cần đặt lịch',
        text: 'Spa, lớp học, tư vấn, studio hoặc sửa chữa cần form đặt lịch, CTA gọi nhanh và nội dung trả lời thắc mắc trước khi liên hệ.',
      },
      {
        title: 'Chạy quảng cáo',
        text: 'Trang được thiết kế để thông điệp, proof, form và tracking event khớp với chiến dịch quảng cáo.',
      },
      {
        title: 'Ra mắt dịch vụ mới',
        text: 'Dùng một trang gọn để kiểm tra nhu cầu thị trường trước khi đầu tư website nhiều trang.',
      },
    ],
    faqs: [
      {
        question: 'Landing page khác website nhiều trang ở đâu?',
        answer:
          'Landing page tập trung vào một offer và một hành động chính, còn website nhiều trang phù hợp khi cần nhiều nhóm dịch vụ, blog, case study và SEO dài hạn.',
      },
      {
        question: 'Landing page nên có những phần nào?',
        answer:
          'Nên có hero rõ offer, lợi ích, proof, quy trình, bảng giá hoặc khoảng giá, FAQ, form, CTA Zalo/gọi nhanh và tracking chuyển đổi.',
      },
    ],
  },
  {
    slug: 'thiet-ke-web-doanh-nghiep-nho',
    title: 'Thiết kế web cho doanh nghiệp nhỏ cần lead thật',
    description:
      'Thiết kế web cho doanh nghiệp nhỏ: giới thiệu dịch vụ, case study, Local SEO, tracking chuyển đổi, form tư vấn và quy trình bàn giao rõ ràng.',
    eyebrow: 'Doanh nghiệp nhỏ',
    h1: 'Thiết kế web cho doanh nghiệp nhỏ cần đủ tin, đủ rõ và đo được lead.',
    lead:
      'Một website doanh nghiệp nhỏ không nên chỉ là profile online. Trang cần giúp khách hiểu bạn làm gì, đã làm được gì, liên hệ ra sao và vì sao nên chọn bạn.',
    primaryKeyword: 'thiết kế web doanh nghiệp nhỏ',
    serviceType: ['Thiết kế web doanh nghiệp nhỏ', 'Website giới thiệu công ty', 'Local SEO'],
    areaServed: ['TP. Hồ Chí Minh', 'Bình Thạnh', 'Thủ Đức', 'Gò Vấp', 'Việt Nam'],
    useCases: [
      {
        title: 'Cần hồ sơ năng lực online',
        text: 'Trang giới thiệu dịch vụ, quy trình, đội ngũ, case study và thông tin liên hệ nhất quán.',
      },
      {
        title: 'Cần tìm khách từ Google',
        text: 'Cấu trúc SEO theo dịch vụ, khu vực, câu hỏi thường gặp và nội dung hỗ trợ quyết định mua.',
      },
      {
        title: 'Cần đo nguồn lead',
        text: 'Gắn tracking cho form, Zalo, phone, email và các CTA quan trọng để biết kênh nào hiệu quả.',
      },
    ],
    faqs: [
      {
        question: 'Doanh nghiệp nhỏ nên làm website mấy trang?',
        answer:
          'Tối thiểu nên có trang chủ, dịch vụ, bảng giá hoặc quy trình, case study/blog và liên hệ. Nếu muốn SEO tốt hơn, nên tách trang theo từng dịch vụ chính.',
      },
      {
        question: 'Website doanh nghiệp nhỏ có cần blog không?',
        answer:
          'Có nếu muốn tăng cơ hội xuất hiện trên Google. Blog nên trả lời câu hỏi thật của khách, không viết tin tức chung chung.',
      },
    ],
  },
  {
    slug: 'thiet-ke-web-tai-tp-ho-chi-minh',
    title: 'Thiết kế web tại TP. Hồ Chí Minh cho dịch vụ nhỏ',
    description:
      'Dịch vụ thiết kế web tại TP. Hồ Chí Minh cho cửa hàng, freelancer và doanh nghiệp nhỏ cần website có Local SEO, CTA và tracking lead.',
    eyebrow: 'Local SEO TP.HCM',
    h1: 'Thiết kế web tại TP. Hồ Chí Minh cho dịch vụ cần khách liên hệ thật.',
    lead:
      'YenTH Shop tập trung vào website cho cá nhân, cửa hàng và doanh nghiệp nhỏ tại TP.HCM: rõ dịch vụ, rõ khu vực phục vụ, có NAP/schema và CTA dễ liên hệ.',
    primaryKeyword: 'thiết kế web tại TP Hồ Chí Minh',
    serviceType: ['Thiết kế web tại TP. Hồ Chí Minh', 'Local SEO', 'Website dịch vụ địa phương'],
    areaServed: ['TP. Hồ Chí Minh', 'Bình Thạnh', 'Thủ Đức', 'Gò Vấp', 'Quận 1'],
    useCases: [
      {
        title: 'Dịch vụ phục vụ theo khu vực',
        text: 'Nội dung thể hiện rõ khu vực, thông tin liên hệ, schema và các câu hỏi khách địa phương thường tìm.',
      },
      {
        title: 'Cửa hàng cần hiện diện tin cậy',
        text: 'Website giúp khách kiểm tra dịch vụ, sản phẩm, địa chỉ, hình ảnh và cách liên hệ trước khi ghé hoặc nhắn Zalo.',
      },
      {
        title: 'Freelancer/chuyên gia tại TP.HCM',
        text: 'Portfolio có câu chuyện cá nhân, dịch vụ, dự án tiêu biểu và form nhận brief.',
      },
    ],
    faqs: [
      {
        question: 'Local SEO cho website tại TP.HCM cần gì?',
        answer:
          'Cần NAP nhất quán, Google Business Profile, schema LocalBusiness/ProfessionalService, trang khu vực, nội dung dịch vụ và backlink/citation địa phương.',
      },
      {
        question: 'Có cần ghi địa chỉ cụ thể không?',
        answer:
          'Nếu có địa chỉ phục vụ khách, nên ghi nhất quán. Nếu làm online, vẫn nên mô tả khu vực phục vụ và cách liên hệ rõ ràng.',
      },
    ],
  },
];

export function getSeoLandingPage(slug: string) {
  return seoLandingPages.find((page) => page.slug === slug);
}
