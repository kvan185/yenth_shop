import Link from 'next/link';
import { buildTodayFortunes, pickAuspiciousDays, scoreCompatibility } from '@/lib/fortuneEngine';

export const metadata = {
  title: 'Công cụ tử vi miễn phí',
  description: 'Tử vi hôm nay, xem tuổi hợp nhau, chọn ngày tốt và funnel mở khóa báo cáo.',
};

export default function ToolsPage() {
  const today = buildTodayFortunes(2026);
  const days = pickAuspiciousDays(2026, 7, 'khai trương');
  const match = scoreCompatibility('2004-05-18', '2000-09-12');

  return (
    <main className="tool-page">
      <header className="simple-header">
        <Link href="/">YenTH Tử Vi</Link>
        <nav>
          <Link href="/admin">Admin</Link>
          <Link href="/">Trang chủ</Link>
        </nav>
      </header>
      <section className="tool-hero">
        <span className="section-kicker">Công cụ kéo traffic</span>
        <h1>Tử vi hôm nay, hợp tuổi và chọn ngày tốt</h1>
        <p>Các module này có thể tách thành landing page SEO riêng và dẫn người dùng về báo cáo premium.</p>
      </section>
      <section className="tool-grid">
        <article>
          <h2>Tử vi hôm nay 12 con giáp</h2>
          {today.slice(0, 6).map((item) => (
            <p key={item.branch}><b>{item.title}:</b> {item.summary} Số may mắn {item.luckyNumber}.</p>
          ))}
        </article>
        <article>
          <h2>Xem tuổi hợp nhau</h2>
          <strong>{match.score}/100</strong>
          <p>{match.label}</p>
          <p>{match.summary}</p>
        </article>
        <article>
          <h2>Ngày tốt khai trương</h2>
          {days.map((day) => (
            <p key={day.date}><b>{day.date}</b> - {day.score}/100. {day.note}</p>
          ))}
        </article>
      </section>
    </main>
  );
}
