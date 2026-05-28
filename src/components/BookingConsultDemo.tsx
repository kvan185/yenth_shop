'use client';

import { useMemo, useState } from 'react';

const services = [
  { name: 'Tư vấn chiến lược', duration: '45 phút', price: '590.000đ' },
  { name: 'Khám phá nhu cầu', duration: '30 phút', price: 'Miễn phí' },
  { name: 'Audit hiện trạng', duration: '60 phút', price: '890.000đ' },
];

const slots = ['09:00', '10:30', '14:00', '15:30', '19:00'];
const experts = ['Minh Khoa - Strategy', 'Lan Anh - Marketing', 'Huy Nam - Operations'];

export function BookingConsultDemo() {
  const [service, setService] = useState(services[0]);
  const [slot, setSlot] = useState(slots[1]);
  const [expert, setExpert] = useState(experts[0]);

  const summary = useMemo(() => `${service.name} · ${service.duration} · ${slot}`, [service, slot]);

  return (
    <main className="bk-demo">
      <header className="bk-header">
        <a href="#top">ClarityCall</a>
        <nav aria-label="Điều hướng đặt lịch">
          <a href="#dich-vu">Dịch vụ</a>
          <a href="#lich-hen">Đặt lịch</a>
          <a href="#chuyen-gia">Chuyên gia</a>
          <a href="#faq">FAQ</a>
        </nav>
      </header>

      <section id="top" className="bk-hero">
        <div>
          <span>Tư vấn online và đặt lịch tự động</span>
          <h1>Trang đặt lịch giúp khách chọn đúng buổi tư vấn trong vài bước.</h1>
          <p>
            Mẫu này phù hợp chuyên gia, lớp học, phòng khám, tư vấn doanh nghiệp hoặc dịch vụ cần khách chọn gói,
            chọn giờ và gửi brief trước buổi hẹn.
          </p>
          <div className="bk-actions">
            <a href="#lich-hen">Đặt lịch ngay</a>
            <a href="#dich-vu">Xem dịch vụ</a>
          </div>
        </div>
        <aside>
          <strong>{slot}</strong>
          <span>Lịch hẹn tiếp theo</span>
          <p>{summary}</p>
        </aside>
      </section>

      <section className="bk-proof">
        {[
          ['24h', 'phản hồi xác nhận'],
          ['3 bước', 'chọn gói, chọn giờ, gửi brief'],
          ['Online', 'Google Meet hoặc Zoom'],
          ['CRM', 'ghi nhận lead sau khi gửi form'],
        ].map(([value, text]) => (
          <article key={value}>
            <strong>{value}</strong>
            <span>{text}</span>
          </article>
        ))}
      </section>

      <section id="dich-vu" className="bk-section">
        <div className="bk-section-head">
          <span>Dịch vụ tư vấn</span>
          <h2>Khách chọn trước nội dung cần trao đổi để buổi hẹn đi thẳng vào vấn đề.</h2>
        </div>
        <div className="bk-service-grid">
          {services.map((item) => (
            <button className={service.name === item.name ? 'active' : undefined} key={item.name} type="button" onClick={() => setService(item)}>
              <span>{item.duration}</span>
              <h3>{item.name}</h3>
              <strong>{item.price}</strong>
            </button>
          ))}
        </div>
      </section>

      <section id="lich-hen" className="bk-booking">
        <div>
          <span>Chọn lịch hẹn</span>
          <h2>Booking widget mô phỏng để khách tự chọn khung giờ.</h2>
          <p>Trong bản thật, phần này có thể nối Google Calendar, Cal.com, CRM hoặc hệ thống đặt lịch riêng.</p>
          <div className="bk-slot-grid">
            {slots.map((item) => (
              <button className={slot === item ? 'active' : undefined} key={item} type="button" onClick={() => setSlot(item)}>
                {item}
              </button>
            ))}
          </div>
          <label>
            Chọn chuyên gia
            <select value={expert} onChange={(event) => setExpert(event.target.value)}>
              {experts.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
        <form>
          <strong>Lịch hẹn của bạn</strong>
          <p>{summary}</p>
          <p>{expert}</p>
          <label>
            Họ tên
            <input placeholder="Nguyễn Văn A" />
          </label>
          <label>
            Số điện thoại
            <input placeholder="0375 266 538" />
          </label>
          <label>
            Brief ngắn
            <textarea placeholder="Bạn muốn được tư vấn điều gì?" />
          </label>
          <button type="button">Xác nhận lịch hẹn</button>
        </form>
      </section>

      <section id="chuyen-gia" className="bk-section bk-experts">
        <div className="bk-section-head">
          <span>Chuyên gia</span>
          <h2>Đưa người tư vấn lên trang giúp khách biết họ sẽ gặp ai.</h2>
        </div>
        <div className="bk-expert-grid">
          {experts.map((item) => (
            <article key={item}>
              <div>{item.slice(0, 1)}</div>
              <strong>{item}</strong>
              <p>Phù hợp các buổi tư vấn có tính cá nhân hóa cao.</p>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="bk-section bk-faq">
        <div className="bk-section-head">
          <span>FAQ</span>
          <h2>Câu hỏi thường gặp trước khi đặt lịch.</h2>
        </div>
        <div className="bk-faq-grid">
          {[
            ['Có thể đổi lịch không?', 'Có thể đổi lịch trước 12 giờ qua email hoặc Zalo.'],
            ['Buổi tư vấn diễn ra ở đâu?', 'Mặc định qua Google Meet, có thể đổi sang Zoom hoặc gọi điện.'],
            ['Có gửi tài liệu sau buổi hẹn không?', 'Có. Khách nhận recap và đề xuất bước tiếp theo sau buổi tư vấn.'],
          ].map(([question, answer]) => (
            <article key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
