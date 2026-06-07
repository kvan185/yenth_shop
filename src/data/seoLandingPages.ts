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
  {
    slug: 'thiet-ke-web-ban-yen',
    title: 'Thiết kế web bán yến cho cửa hàng và thương hiệu nhỏ',
    description:
      'Thiết kế web bán yến: giới thiệu sản phẩm, nguồn gốc, chứng nhận, chính sách, CTA Zalo/gọi nhanh và SEO nền cho cửa hàng yến.',
    eyebrow: 'Ngành hàng yến',
    h1: 'Thiết kế web bán yến giúp khách hiểu nguồn gốc, tin chất lượng và hỏi mua nhanh.',
    lead:
      'Website bán yến cần làm rõ sản phẩm, đối tượng sử dụng, chứng nhận, chính sách giao hàng, câu hỏi thường gặp và nút liên hệ đủ nổi bật để khách hỏi mua ngay.',
    primaryKeyword: 'thiết kế web bán yến',
    serviceType: ['Thiết kế web bán yến', 'Website bán hàng', 'SEO sản phẩm yến'],
    areaServed: ['TP. Hồ Chí Minh', 'Việt Nam', 'Online toàn quốc'],
    useCases: [
      {
        title: 'Cửa hàng yến cần kênh bán hàng tin cậy',
        text: 'Trang trình bày sản phẩm, combo, chứng nhận, hình ảnh thật và chính sách mua hàng rõ ràng.',
      },
      {
        title: 'Thương hiệu yến mới ra mắt',
        text: 'Landing page giúp kể câu chuyện thương hiệu, giải thích lợi ích và gom lead qua Zalo/form.',
      },
      {
        title: 'Cần SEO nhóm sản phẩm',
        text: 'Cấu trúc danh mục, nội dung sản phẩm và blog nền giúp Google hiểu ngành hàng yến tốt hơn.',
      },
    ],
    faqs: [
      {
        question: 'Web bán yến có cần giỏ hàng không?',
        answer:
          'Giai đoạn đầu có thể ưu tiên nút Zalo/gọi/form để tư vấn nhanh. Giỏ hàng phù hợp khi sản phẩm, tồn kho và thanh toán đã ổn định.',
      },
      {
        question: 'Nội dung web bán yến nên có gì?',
        answer:
          'Nên có nguồn gốc, đối tượng dùng, hướng dẫn sử dụng, chứng nhận, combo, chính sách giao hàng, FAQ và thông tin liên hệ rõ.',
      },
    ],
  },
  {
    slug: 'thiet-ke-web-spa',
    title: 'Thiết kế web spa có đặt lịch và Local SEO',
    description:
      'Thiết kế web spa cho dịch vụ làm đẹp: gói dịch vụ, bảng giá, hình ảnh, review, đặt lịch, CTA Zalo và Local SEO.',
    eyebrow: 'Spa & làm đẹp',
    h1: 'Thiết kế web spa giúp khách xem dịch vụ, tin tay nghề và đặt lịch nhanh.',
    lead:
      'Website spa nên ưu tiên dịch vụ chính, bảng giá, hình ảnh trước/sau nếu có, review, quy trình, FAQ và CTA đặt lịch rõ trên điện thoại.',
    primaryKeyword: 'thiết kế web spa',
    serviceType: ['Thiết kế web spa', 'Website đặt lịch', 'Local SEO spa'],
    areaServed: ['TP. Hồ Chí Minh', 'Bình Thạnh', 'Thủ Đức', 'Gò Vấp', 'Việt Nam'],
    useCases: [
      {
        title: 'Spa cần khách đặt lịch',
        text: 'Form và nút Zalo/gọi nhanh được đặt ở các section dịch vụ, bảng giá và cuối trang.',
      },
      {
        title: 'Dịch vụ cần tạo niềm tin',
        text: 'Bố cục có review, hình ảnh thật, quy trình, cam kết và câu hỏi thường gặp.',
      },
      {
        title: 'Muốn tìm khách quanh khu vực',
        text: 'Local SEO thể hiện khu vực phục vụ, NAP, schema và nội dung theo dịch vụ chính.',
      },
    ],
    faqs: [
      {
        question: 'Web spa có cần đặt lịch tự động không?',
        answer:
          'Nếu lịch hẹn nhiều, nên có form đặt lịch hoặc tích hợp lịch. Nếu mới bắt đầu, CTA Zalo/gọi nhanh có thể hiệu quả hơn.',
      },
      {
        question: 'Web spa nên có bảng giá không?',
        answer:
          'Nên có khoảng giá hoặc gói dịch vụ để khách tự lọc nhu cầu trước khi liên hệ.',
      },
    ],
  },
  {
    slug: 'thiet-ke-web-nha-khoa',
    title: 'Thiết kế web nha khoa rõ dịch vụ, bác sĩ và đặt lịch',
    description:
      'Thiết kế web nha khoa: giới thiệu dịch vụ, đội ngũ bác sĩ, bảng giá tham khảo, đặt lịch, FAQ và Local SEO.',
    eyebrow: 'Nha khoa',
    h1: 'Thiết kế web nha khoa giúp khách hiểu dịch vụ, tin chuyên môn và đặt lịch khám.',
    lead:
      'Website nha khoa cần trình bày dịch vụ rõ, đội ngũ/bác sĩ, quy trình, bảng giá tham khảo, câu hỏi thường gặp và CTA đặt lịch dễ thấy.',
    primaryKeyword: 'thiết kế web nha khoa',
    serviceType: ['Thiết kế web nha khoa', 'Website phòng khám', 'Local SEO nha khoa'],
    areaServed: ['TP. Hồ Chí Minh', 'Việt Nam'],
    useCases: [
      {
        title: 'Phòng khám cần tăng lịch hẹn',
        text: 'Landing page hoặc website nhiều trang giúp khách chọn dịch vụ và gửi thông tin trước khi đến khám.',
      },
      {
        title: 'Cần xây độ tin cậy',
        text: 'Nội dung có bác sĩ, thiết bị, quy trình, giấy phép/chứng nhận và review.',
      },
      {
        title: 'Cần SEO theo dịch vụ',
        text: 'Tách nội dung theo niềng răng, trồng răng, tẩy trắng, khám tổng quát hoặc khu vực phục vụ.',
      },
    ],
    faqs: [
      {
        question: 'Web nha khoa có nên tách từng dịch vụ không?',
        answer:
          'Nên tách nếu muốn SEO tốt hơn và giúp khách hiểu từng dịch vụ trước khi đặt lịch.',
      },
      {
        question: 'Có thể chỉ làm landing page trước không?',
        answer:
          'Có. Landing page phù hợp khi muốn thử một dịch vụ chính hoặc chiến dịch quảng cáo cụ thể.',
      },
    ],
  },
  {
    slug: 'thiet-ke-web-nha-hang',
    title: 'Thiết kế web nhà hàng có menu, đặt bàn và Local SEO',
    description:
      'Thiết kế web nhà hàng: menu, hình ảnh món ăn, đặt bàn, thông tin chi nhánh, Google Maps, CTA gọi nhanh và Local SEO.',
    eyebrow: 'Nhà hàng & F&B',
    h1: 'Thiết kế web nhà hàng giúp khách xem menu, tin không gian và đặt bàn nhanh.',
    lead:
      'Website nhà hàng nên đưa menu, món nổi bật, hình ảnh thật, địa chỉ, giờ mở cửa, bản đồ, đặt bàn và nút gọi nhanh lên thật dễ dùng trên điện thoại.',
    primaryKeyword: 'thiết kế web nhà hàng',
    serviceType: ['Thiết kế web nhà hàng', 'Website F&B', 'Local SEO nhà hàng'],
    areaServed: ['TP. Hồ Chí Minh', 'Việt Nam'],
    useCases: [
      {
        title: 'Nhà hàng cần khách đặt bàn',
        text: 'CTA gọi/đặt bàn đặt ở hero, menu, khu vực chi nhánh và cuối trang.',
      },
      {
        title: 'Cần trình bày menu rõ',
        text: 'Menu có nhóm món, giá, hình ảnh và món đề xuất để khách quyết định nhanh.',
      },
      {
        title: 'Cần tăng tìm kiếm địa phương',
        text: 'Nội dung có địa chỉ, giờ mở cửa, khu vực, Google Maps và schema LocalBusiness.',
      },
    ],
    faqs: [
      {
        question: 'Web nhà hàng có cần đặt món online không?',
        answer:
          'Không bắt buộc. Có thể bắt đầu với menu, gọi nhanh và đặt bàn, sau đó thêm đặt món khi quy trình vận hành sẵn sàng.',
      },
      {
        question: 'Có nên dùng ảnh thật không?',
        answer:
          'Rất nên. Nhà hàng là ngành quyết định nhiều bằng hình ảnh món ăn và không gian.',
      },
    ],
  },
  {
    slug: 'thiet-ke-web-giao-vien-khoa-hoc',
    title: 'Thiết kế web giáo viên và khóa học online',
    description:
      'Thiết kế web cho giáo viên, trung tâm nhỏ và khóa học online: giới thiệu lớp, lịch học, thi thử, form đăng ký và SEO nội dung.',
    eyebrow: 'Giáo dục',
    h1: 'Thiết kế web giáo viên giúp học viên hiểu khóa học, đăng ký và quay lại học tiếp.',
    lead:
      'Website giáo viên/khóa học nên có chương trình học, lịch khai giảng, học phí, kết quả học viên, form đăng ký và có thể mở rộng thi thử hoặc tài liệu.',
    primaryKeyword: 'thiết kế web giáo viên',
    serviceType: ['Thiết kế web giáo viên', 'Website khóa học', 'Web thi thử'],
    areaServed: ['TP. Hồ Chí Minh', 'Việt Nam', 'Online toàn quốc'],
    useCases: [
      {
        title: 'Giáo viên cần nhận đăng ký',
        text: 'Trang giới thiệu lớp, học phí, lịch học, đối tượng phù hợp và form đăng ký.',
      },
      {
        title: 'Khóa học cần nội dung SEO',
        text: 'Blog, bài hướng dẫn và trang khóa học giúp kéo thêm học viên từ Google.',
      },
      {
        title: 'Cần thi thử hoặc bài tập',
        text: 'Có thể mở rộng sang đề thi thử, chấm điểm, lịch sử làm bài hoặc dashboard học viên.',
      },
    ],
    faqs: [
      {
        question: 'Web giáo viên có cần đăng nhập không?',
        answer:
          'Nếu chỉ nhận đăng ký thì chưa cần. Đăng nhập phù hợp khi có bài học, thi thử, tài liệu hoặc theo dõi tiến độ.',
      },
      {
        question: 'Có thể làm web khóa học từng giai đoạn không?',
        answer:
          'Có. Nên bắt đầu bằng landing nhận đăng ký, sau đó mở rộng tính năng học tập khi có học viên thật.',
      },
    ],
  },
];

export function getSeoLandingPage(slug: string) {
  return seoLandingPages.find((page) => page.slug === slug);
}
