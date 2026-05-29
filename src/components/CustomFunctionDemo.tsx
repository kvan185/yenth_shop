'use client';

import { useMemo, useState } from 'react';

const pipelines = [
  { name: 'Lead mới', count: 18, value: '42 triệu', color: 'new' },
  { name: 'Đang tư vấn', count: 9, value: '31 triệu', color: 'talking' },
  { name: 'Chờ cọc', count: 4, value: '24 triệu', color: 'won' },
];

const requests = [
  { name: 'An Phát Clinic', type: 'Đặt lịch', priority: 'Cao', status: 'Đang tư vấn' },
  { name: 'Lớp vẽ Mộc', type: 'Form 5 bước', priority: 'Vừa', status: 'Lead mới' },
  { name: 'Kho Hoa Tươi', type: 'Quản lý đơn', priority: 'Cao', status: 'Chờ cọc' },
  { name: 'Studio Nắng', type: 'CRM mini', priority: 'Thấp', status: 'Lead mới' },
];

const modules = [
  ['Dashboard vận hành', 'Theo dõi doanh thu, lead, lịch hẹn, đơn hàng hoặc trạng thái xử lý trên một màn hình gọn.'],
  ['Form nhiều bước', 'Thu brief có điều kiện, tự chia nhóm nhu cầu, gửi email/Zalo và lưu dữ liệu để đội tư vấn xử lý.'],
  ['Quản lý nội bộ', 'Danh sách khách, sản phẩm, dịch vụ, lịch sử trao đổi, phân quyền cơ bản và trạng thái công việc.'],
  ['Tích hợp hệ thống', 'Kết nối Google Sheet, Calendar, webhook, CRM, cổng thanh toán hoặc phần mềm đang dùng.'],
];

const milestones = [
  ['01', 'Vẽ luồng', 'Làm rõ ai dùng, nhập dữ liệu ở đâu, trạng thái nào cần theo dõi và báo cáo nào quan trọng.'],
  ['02', 'Dựng prototype', 'Tạo màn hình mẫu để bấm thử trước khi code sâu, tránh làm sai logic vận hành.'],
  ['03', 'Build module', 'Phát triển chức năng chính, responsive, validation form, quyền truy cập và tracking sự kiện.'],
  ['04', 'Bàn giao', 'Test dữ liệu mẫu, hướng dẫn thao tác, ghi chú cấu hình và kế hoạch nâng cấp tiếp theo.'],
];

const filters = ['Tất cả', 'Lead mới', 'Đang tư vấn', 'Chờ cọc'];

export function CustomFunctionDemo() {
  const [filter, setFilter] = useState(filters[0]);
  const [selectedModule, setSelectedModule] = useState(modules[0][0]);

  const filteredRequests = useMemo(
    () => (filter === 'Tất cả' ? requests : requests.filter((item) => item.status === filter)),
    [filter],
  );

  return (
    <main className="cf-page">
      <header className="cf-header">
        <a href="#top" className="cf-logo">OpsFlow</a>
        <nav aria-label="Điều hướng mẫu web chức năng riêng">
          <a href="#module">Module</a>
          <a href="#dashboard">Dashboard</a>
          <a href="#quy-trinh">Quy trình</a>
          <a href="#brief">Gửi brief</a>
        </nav>
      </header>

      <section id="top" className="cf-hero">
        <div className="cf-hero-copy">
          <span>Web chức năng riêng cho đội vận hành nhỏ</span>
          <h1>Biến quy trình rời rạc thành một dashboard dễ dùng, dễ đo và dễ mở rộng.</h1>
          <p>
            Mẫu này phù hợp khi bạn cần chức năng riêng như quản lý lead, đặt lịch, theo dõi đơn, form nhiều bước,
            phân quyền cơ bản hoặc tích hợp dữ liệu từ công cụ đang dùng.
          </p>
          <div className="cf-actions">
            <a href="#brief">Gửi yêu cầu chức năng</a>
            <a href="#dashboard">Xem dashboard mẫu</a>
          </div>
        </div>
        <aside className="cf-live-panel" aria-label="Bảng tổng quan mô phỏng">
          <div className="cf-panel-top">
            <strong>OpsFlow CRM</strong>
            <span>Live demo</span>
          </div>
          <div className="cf-kpi-grid">
            <div><strong>31</strong><span>lead tháng này</span></div>
            <div><strong>72%</strong><span>đã phản hồi</span></div>
            <div><strong>4.8h</strong><span>thời gian xử lý</span></div>
          </div>
          <div className="cf-mini-chart">
            {[54, 72, 46, 88, 64, 92, 76].map((height, index) => (
              <i key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
        </aside>
      </section>

      <section className="cf-strip">
        {['Logic theo quy trình thật', 'Dữ liệu có trạng thái', 'Có thể phân quyền', 'Sẵn sàng tích hợp API'].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>

      <section id="module" className="cf-section">
        <div className="cf-section-head">
          <span>Module riêng</span>
          <h2>Không bắt đầu từ màn hình đẹp, mà bắt đầu từ việc người dùng cần hoàn thành.</h2>
        </div>
        <div className="cf-module-grid">
          {modules.map(([title, text]) => (
            <button className={selectedModule === title ? 'active' : undefined} key={title} type="button" onClick={() => setSelectedModule(title)}>
              <strong>{title}</strong>
              <span>{text}</span>
            </button>
          ))}
        </div>
      </section>

      <section id="dashboard" className="cf-dashboard">
        <div className="cf-dashboard-copy">
          <span>Dashboard mẫu</span>
          <h2>Lọc lead theo trạng thái để đội tư vấn biết việc tiếp theo là gì.</h2>
          <p>Trong bản thật, bảng này có thể nối Google Sheet, database riêng, webhook form hoặc CRM hiện có.</p>
          <div className="cf-filter-group" aria-label="Lọc trạng thái lead">
            {filters.map((item) => (
              <button className={filter === item ? 'active' : undefined} key={item} type="button" onClick={() => setFilter(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="cf-board">
          <div className="cf-pipeline">
            {pipelines.map((item) => (
              <article className={item.color} key={item.name}>
                <span>{item.name}</span>
                <strong>{item.count}</strong>
                <small>{item.value}</small>
              </article>
            ))}
          </div>
          <div className="cf-table" aria-label="Danh sách lead mẫu">
            {filteredRequests.map((item) => (
              <article key={item.name}>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.type}</span>
                </div>
                <span>{item.priority}</span>
                <mark>{item.status}</mark>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="quy-trinh" className="cf-section cf-process">
        <div className="cf-section-head">
          <span>Quy trình triển khai</span>
          <h2>Chức năng riêng cần prototype sớm để logic rõ trước khi mở rộng.</h2>
        </div>
        <div className="cf-step-grid">
          {milestones.map(([number, title, text]) => (
            <article key={number}>
              <strong>{number}</strong>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="brief" className="cf-brief">
        <div>
          <span>Brief chức năng</span>
          <h2>Gửi mô tả luồng đang làm thủ công, mình sẽ đề xuất màn hình và module phù hợp.</h2>
          <p>Chỉ cần nêu dữ liệu đầu vào, ai xử lý, trạng thái cần theo dõi và kết quả bạn muốn nhận.</p>
        </div>
        <form>
          <label>
            Tên dự án
            <input placeholder="Ví dụ: CRM mini cho trung tâm tư vấn" />
          </label>
          <label>
            Chức năng cần ưu tiên
            <select defaultValue="dashboard">
              <option value="dashboard">Dashboard / báo cáo</option>
              <option value="form">Form nhiều bước</option>
              <option value="booking">Đặt lịch / phân ca</option>
              <option value="integration">Tích hợp hệ thống</option>
            </select>
          </label>
          <label>
            Mô tả luồng hiện tại
            <textarea placeholder="Đội bạn đang nhận dữ liệu và xử lý như thế nào?" />
          </label>
          <button type="button">Gửi brief chức năng</button>
        </form>
      </section>
    </main>
  );
}
