import { Mau2Hero, Mau2PostGrid, Mau2ProductGrid, Mau2Shell } from '@/components/Mau2Website';

export default function Mau2HomePage() {
  return (
    <Mau2Shell>
      <Mau2Hero />
      <section className="m2-strip">
        <span>100% tự nhiên</span>
        <span>Sơ chế thủ công</span>
        <span>Giao nhanh nội thành</span>
        <span>Form đặt hàng rõ ràng</span>
      </section>
      <section className="m2-section">
        <div className="m2-section-head">
          <span>Sản phẩm nổi bật</span>
          <h2>Trang chủ chỉ hiển thị những sản phẩm cần đẩy mạnh nhất.</h2>
        </div>
        <Mau2ProductGrid />
      </section>
      <section className="m2-section m2-soft">
        <div className="m2-section-head">
          <span>Bài viết mới</span>
          <h2>Nội dung ngắn giúp tăng độ tin cậy trước khi khách hỏi mua.</h2>
        </div>
        <Mau2PostGrid />
      </section>
    </Mau2Shell>
  );
}
