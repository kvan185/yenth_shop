'use client';

import { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import { buildFortuneReading } from '@/lib/fortuneEngine';

const readingModes = [
  { id: 'overview', label: 'Tổng quan', title: 'Tổng quan', question: '3 tháng tới mình nên tập trung điều gì?' },
  { id: 'love', label: 'Tình duyên', title: 'Tình duyên', question: 'Tình duyên 3 tháng tới có chuyển biến không?' },
  { id: 'money', label: 'Tài lộc', title: 'Tài lộc', question: 'Tài lộc sắp tới nên mở hay nên giữ?' },
  { id: 'career', label: 'Sự nghiệp', title: 'Sự nghiệp', question: 'Công việc sắp tới có cơ hội nào đáng chú ý?' },
] as const;

const trustItems = ['Trả kết quả trong 10 giây', 'Không cần đăng ký', 'Có gợi ý hành động ngay'];

export default function Home() {
  const [name, setName] = useState('Khánh Vân');
  const [birthDate, setBirthDate] = useState('2004-05-18');
  const [birthHour, setBirthHour] = useState('09:00');
  const [activeMode, setActiveMode] = useState<(typeof readingModes)[number]['id']>('love');
  const [question, setQuestion] = useState<string>(readingModes[1].question);
  const [contact, setContact] = useState('');
  const [need, setNeed] = useState('Báo cáo tử vi 12 tháng');
  const [submitted, setSubmitted] = useState(true);
  const [showQuickSummary, setShowQuickSummary] = useState(false);
  const [leadStatus, setLeadStatus] = useState('');
  const [reportStatus, setReportStatus] = useState('');

  const reading = useMemo(
    () => buildFortuneReading({ name, birthDate, birthHour, purpose: activeMode }),
    [name, birthDate, birthHour, activeMode],
  );

  function chooseMode(mode: (typeof readingModes)[number]) {
    setActiveMode(mode.id);
    setQuestion(mode.question);
  }

  function submitReading(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setShowQuickSummary(true);
  }

  function goToFullResult() {
    setShowQuickSummary(false);
    document.getElementById('ket-qua-ca-nhan')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLeadStatus('Đang lưu yêu cầu...');
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, contact, need, birthDate }),
    });
    setLeadStatus(response.ok ? 'Đã lưu yêu cầu. Đội tư vấn có thể chăm lại qua Zalo.' : 'Chưa lưu được yêu cầu, vui lòng thử lại.');
  }

  async function unlockReport() {
    setReportStatus('Đang tạo mã thanh toán...');
    const response = await fetch('/api/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, birthDate, birthHour }),
    });
    const data = await response.json();
    setReportStatus(`Mã ${data.orderId}: ${data.price.toLocaleString('vi-VN')}đ, nội dung ${data.payment.content}.`);
  }

  const selectedInsight =
    activeMode === 'love' ? reading.love : activeMode === 'money' ? reading.money : activeMode === 'career' ? reading.career : reading.focus;

  return (
    <main className="fortune-app">
      <header className="topbar fortune-nav">
        <a className="brand" href="#xem-ngay" aria-label="YenTH Tử Vi">
          YenTH <span>Tử Vi</span>
        </a>
        <nav aria-label="Điều hướng chính">
          <a href="#xem-ngay">Xem ngay</a>
          <a href="#ket-qua-ca-nhan">Kết quả</a>
          <Link href="/cong-cu">Công cụ</Link>
          <a className="nav-cta" href="#lead">Nhận tư vấn</a>
        </nav>
      </header>

      <section className="oracle-screen" id="xem-ngay">
        <div className="oracle-shell">
          <div className="oracle-intro">
            <span className="section-kicker">Xem bói cá nhân miễn phí</span>
            <h1>Nhập ngày sinh, nhận bản đọc riêng cho bạn.</h1>
            <p>Trải nghiệm được thiết kế để người dùng thấy giá trị ngay: ít trường nhập, kết quả rõ điểm chính, và lời khuyên đủ để hành động.</p>
            <div className="mode-tabs" aria-label="Chọn chủ đề xem bói">
              {readingModes.map((mode) => (
                <button className={activeMode === mode.id ? 'active' : ''} key={mode.id} type="button" onClick={() => chooseMode(mode)}>
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          <aside className="oracle-preview" aria-label="Tóm tắt nhanh">
            <span>Đang xem</span>
            <strong>{readingModes.find((mode) => mode.id === activeMode)?.title}</strong>
            <p>{selectedInsight}</p>
          </aside>
        </div>

        <form className="oracle-form" onSubmit={submitReading}>
          <div className="field wide">
            <label htmlFor="name">Tên của bạn</label>
            <input id="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Ví dụ: Khánh Vân" />
          </div>
          <div className="field">
            <label htmlFor="birthDate">Ngày sinh</label>
            <input id="birthDate" type="date" value={birthDate} onChange={(event) => setBirthDate(event.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="birthHour">Giờ sinh</label>
            <input id="birthHour" type="time" value={birthHour} onChange={(event) => setBirthHour(event.target.value)} />
          </div>
          <div className="field question-field">
            <label htmlFor="question">Điều muốn hỏi</label>
            <input id="question" value={question} onChange={(event) => setQuestion(event.target.value)} />
          </div>
          <button className="button primary oracle-submit" type="submit">Luận giải ngay</button>
        </form>

        <div className="micro-trust" aria-label="Điểm mạnh trải nghiệm">
          {trustItems.map((item) => <span key={item}>{item}</span>)}
        </div>

        {showQuickSummary ? (
          <div className="summary-modal" role="dialog" aria-modal="true" aria-labelledby="summary-title">
            <button className="summary-backdrop" type="button" aria-label="Đóng tóm tắt" onClick={() => setShowQuickSummary(false)} />
            <div className="summary-box oracle-summary">
              <span className="section-kicker">Tóm tắt nhanh</span>
              <h2 id="summary-title">{name || 'Bạn'}: {reading.canChi}, mệnh {reading.napAm}</h2>
              <div className="summary-pills">
                <span>{reading.animal}</span>
                <span>{reading.zodiacSign}</span>
                <span>{reading.luckyColor}</span>
                <span>Số {reading.luckyNumber}</span>
              </div>
              <div className="summary-list">
                <p><b>Điểm chính:</b> {reading.focus}</p>
                <p><b>Chủ đề đang hỏi:</b> {selectedInsight}</p>
              </div>
              <div className="summary-actions">
                <button className="button ghost-dark" type="button" onClick={() => setShowQuickSummary(false)}>Sửa thông tin</button>
                <button className="button primary" type="button" onClick={goToFullResult}>Xem bản đầy đủ</button>
              </div>
            </div>
          </div>
        ) : null}

        <section className="reading-stage" id="ket-qua-ca-nhan" aria-live="polite">
          {submitted ? (
            <>
              <div className="result-hero">
                <div>
                  <span className="section-kicker">Kết quả cá nhân</span>
                  <h2>{name || 'Bạn'} thuộc {reading.canChi}, cung {reading.zodiacSign}</h2>
                  <p>{reading.lunarYearNote}</p>
                </div>
                <button className="button dark" type="button" onClick={unlockReport}>Mở báo cáo 12 tháng</button>
              </div>

              <div className="destiny-strip">
                {[
                  ['Con giáp', reading.animal],
                  ['Nạp âm', reading.napAm],
                  ['Ngũ hành', reading.yearElement],
                  ['Giờ sinh', reading.hourBranch],
                  ['Màu hợp', reading.luckyColor],
                  ['Số may mắn', String(reading.luckyNumber)],
                ].map(([label, value]) => (
                  <article key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </article>
                ))}
              </div>

              <div className="insight-cards">
                <article><span>Tình duyên</span><p>{reading.love}</p></article>
                <article><span>Tài lộc</span><p>{reading.money}</p></article>
                <article><span>Sự nghiệp</span><p>{reading.career}</p></article>
                <article><span>Sức khỏe</span><p>{reading.health}</p></article>
              </div>

              <div className="month-lane">
                <div>
                  <span className="section-kicker">4 tháng gần nhất</span>
                  <h3>Nhìn nhanh nhịp vận sắp tới</h3>
                </div>
                <div className="month-cards">
                  {reading.monthlyPreview.slice(0, 4).map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>

              <div className="unlock-box premium-box">
                <div>
                  <strong>Báo cáo chi tiết 12 tháng</strong>
                  <span>Mở toàn bộ tháng, ngày nên hành động, checklist tình duyên, tiền bạc và prompt AI viết bản dài.</span>
                  {reportStatus ? <em>{reportStatus}</em> : null}
                </div>
                <button className="button dark" type="button" onClick={unlockReport}>Tạo mã 48.000đ</button>
              </div>
            </>
          ) : null}
        </section>
      </section>

      <section className="experience-band">
        <div>
          <span className="section-kicker">Vì sao giữ chân được khách</span>
          <h2>Xem nhanh trước, mở sâu sau.</h2>
          <p>Khách cần thấy kết quả đúng mình trước khi để lại thông tin. Bố cục mới ưu tiên cảm giác được dẫn dắt, giảm hỏi lan man và đặt CTA đúng lúc.</p>
        </div>
        <div className="experience-grid">
          <article><strong>01</strong><span>Nhập ít, thấy kết quả ngay.</span></article>
          <article><strong>02</strong><span>Tóm tắt trước để tạo niềm tin.</span></article>
          <article><strong>03</strong><span>Nội dung chia khối để dễ quét mắt.</span></article>
          <article><strong>04</strong><span>Mở báo cáo sau khi đã có lý do rõ ràng.</span></article>
        </div>
      </section>

      <section className="lead" id="lead">
        <div>
          <span className="section-kicker">Chăm sóc sau khi xem</span>
          <h2>Nhận bản luận giải chi tiết</h2>
          <p>Để lại Zalo hoặc số điện thoại, hệ thống lưu yêu cầu để tư vấn viên gửi bản mở rộng phù hợp với nhu cầu.</p>
        </div>
        <form className="lead-form" onSubmit={submitLead}>
          <input value={contact} onChange={(event) => setContact(event.target.value)} placeholder="Số điện thoại hoặc Zalo" aria-label="Số điện thoại hoặc Zalo" />
          <select value={need} onChange={(event) => setNeed(event.target.value)} aria-label="Nhu cầu">
            <option>Báo cáo tử vi 12 tháng</option>
            <option>Xem tuổi hợp nhau</option>
            <option>Chọn ngày tốt</option>
            <option>Tư vấn phong thủy</option>
          </select>
          <button className="button primary" type="submit">Gửi yêu cầu</button>
          {leadStatus ? <p className="fineprint">{leadStatus}</p> : null}
        </form>
      </section>
    </main>
  );
}
