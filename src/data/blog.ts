export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  keywords: string[];
  sections: Array<{
    heading: string;
    body: string;
  }>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'thiet-ke-website-ban-hang-cho-cua-hang-nho',
    title: 'Thiết kế website bán hàng cho cửa hàng nhỏ cần chuẩn bị gì?',
    description:
      'Checklist nội dung, hình ảnh, danh mục sản phẩm và CTA cần có trước khi làm website bán hàng cho cửa hàng nhỏ.',
    date: '2026-05-28',
    readingTime: '4 phút đọc',
    keywords: ['thiết kế website bán hàng', 'website cửa hàng nhỏ', 'làm web bán hàng'],
    sections: [
      {
        heading: 'Bắt đầu từ nhóm sản phẩm bán chạy nhất',
        body: 'Một website bán hàng hiệu quả không cần đưa mọi thứ lên trước. Hãy chọn nhóm sản phẩm dễ ra đơn, có biên lợi nhuận tốt và khách thường hỏi nhiều nhất để làm nội dung rõ ràng.',
      },
      {
        heading: 'Trang sản phẩm cần trả lời đủ câu hỏi của khách',
        body: 'Mỗi sản phẩm nên có ảnh thật, giá hoặc khoảng giá, lợi ích chính, cách đặt hàng, chính sách giao hàng và nút liên hệ nhanh qua điện thoại hoặc Zalo.',
      },
      {
        heading: 'SEO nền tảng giúp khách tìm thấy cửa hàng',
        body: 'Tiêu đề trang, mô tả, URL, heading và sitemap cần được chuẩn hóa ngay từ đầu để Google hiểu website đang bán gì và phục vụ khu vực nào.',
      },
    ],
  },
  {
    slug: 'landing-page-dich-vu-dia-phuong-can-co-gi',
    title: 'Landing page dịch vụ địa phương cần có gì để khách để lại thông tin?',
    description:
      'Các phần quan trọng của landing page cho spa, tư vấn, sửa chữa, lớp học và dịch vụ địa phương cần khách đặt lịch.',
    date: '2026-05-28',
    readingTime: '3 phút đọc',
    keywords: ['thiết kế landing page', 'landing page dịch vụ', 'dịch vụ địa phương'],
    sections: [
      {
        heading: 'Nói rõ dịch vụ và khu vực ngay đầu trang',
        body: 'Khách cần biết bạn làm dịch vụ gì, phù hợp với ai và có phục vụ khu vực của họ không. Đây là phần nên xuất hiện trong H1 hoặc đoạn mô tả đầu trang.',
      },
      {
        heading: 'Niềm tin thị giác quyết định việc khách có kéo tiếp hay không',
        body: 'Ảnh thật, quy trình rõ, đánh giá khách hàng, cam kết phản hồi và thông tin liên hệ nhất quán giúp landing page đáng tin hơn.',
      },
      {
        heading: 'CTA phải cụ thể theo hành động khách muốn làm',
        body: 'Thay vì chỉ ghi “Liên hệ”, hãy dùng CTA như “Nhận tư vấn miễn phí”, “Đặt lịch trong hôm nay” hoặc “Gửi nhu cầu để nhận báo giá”.',
      },
    ],
  },
  {
    slug: 'local-seo-cho-website-dich-vu-tai-tp-ho-chi-minh',
    title: 'Local SEO cho website dịch vụ tại TP. Hồ Chí Minh: những phần không nên thiếu',
    description:
      'Cách thêm thông tin địa phương, NAP, schema, sitemap và nội dung khu vực để website dịch vụ dễ được Google hiểu hơn.',
    date: '2026-05-28',
    readingTime: '4 phút đọc',
    keywords: ['local SEO', 'SEO địa phương', 'website dịch vụ TP Hồ Chí Minh'],
    sections: [
      {
        heading: 'NAP phải xuất hiện rõ và nhất quán',
        body: 'Tên thương hiệu, số điện thoại, email, khu vực phục vụ và đường dẫn liên hệ nên thống nhất trên website, Google Business Profile và các kênh mạng xã hội.',
      },
      {
        heading: 'Schema giúp Google hiểu doanh nghiệp địa phương',
        body: 'LocalBusiness hoặc ProfessionalService schema có thể khai báo tên, URL, số điện thoại, địa chỉ, khu vực phục vụ, dịch vụ chính và liên kết mạng xã hội.',
      },
      {
        heading: 'Nội dung địa phương cần tự nhiên, không nhồi từ khóa',
        body: 'Hãy viết các trang hoặc bài blog trả lời câu hỏi thật của khách trong khu vực: chi phí, thời gian làm, quy trình, ví dụ dự án và cách liên hệ.',
      },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
