import Link from 'next/link';

const demos = [
  { id: 'cau_sinh_vo_tan_game', name: 'Cầu sinh vô tận', type: 'Game canvas' },
  { id: 'web_co_tuong_2_nguoi', name: 'Cờ tướng 2 người', type: 'Board game' },
  { id: 'web_co_vay_2_nguoi', name: 'Cờ vây 2 người', type: 'Board game' },
  { id: 'web_chess_2_player', name: 'Cờ vua 2 người', type: 'Board game' },
  { id: 'web_co_ganh', name: 'Cờ gánh', type: 'Board game' },
  { id: 'web_ban_linh_thuong_gia', name: 'Bản lĩnh thương gia', type: 'Game mô phỏng' },
  { id: 'web_co_ca_ngua', name: 'Cờ cá ngựa', type: 'Board game' },
  { id: 'web_co_dam_checkers', name: 'Cờ đam checkers', type: 'Board game' },
  { id: 'web_co_thu_jungle_chess', name: 'Cờ thú jungle chess', type: 'Board game' },
  { id: 'web_co_ty_phu', name: 'Cờ tỷ phú', type: 'Board game' },
  { id: 'web_hive_co_con_trung', name: 'Hive cờ côn trùng', type: 'Board game' },
  { id: 'web_o_an_quan', name: 'Ô ăn quan', type: 'Board game' },
];

export default function GameMiniPage() {
  return (
    <main className="lab-page">
      <section className="lab-hero">
        <Link href="/" className="back-link">
          YenTH.shop
        </Link>
        <p className="eyebrow">Lab demo</p>
        <h1>Không gian thử nghiệm game, công cụ nhỏ và giao diện tương tác.</h1>
        <p>
          Khu này dùng để trưng bày năng lực làm UI tương tác, logic game, form/công cụ và trải nghiệm web động.
          Dịch vụ chính của YenTH Shop vẫn là thiết kế website tạo lead cho cá nhân, cửa hàng và doanh nghiệp nhỏ.
        </p>
        <div className="lab-actions">
          <Link href="/danh-muc">Xem mẫu website</Link>
          <Link href="/lien-he">Tư vấn làm web</Link>
        </div>
      </section>

      <section className="lab-grid">
        {demos.map((demo) => (
          <Link key={demo.id} href={`/GameMini/${demo.id}`}>
            <span>{demo.type}</span>
            <strong>{demo.name}</strong>
            <small>Mở demo</small>
          </Link>
        ))}
      </section>
    </main>
  );
}
