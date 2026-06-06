import Link from "next/link";

const GAMES = [
  { id: "cau_sinh_vo_tan_game", name: "Cau Sinh Vo Tan" },
  { id: "web_co_tuong_2_nguoi", name: "Co Tuong 2 Nguoi" },
  { id: "web_co_vay_2_nguoi", name: "Co Vay 2 Nguoi" },
  { id: "web_chess_2_player", name: "Co Vua 2 Player" },
  { id: "web_co_ganh", name: "Co Ganh" },
  { id: "web_ban_linh_thuong_gia", name: "Ban Linh Thuong Gia" },
  { id: "web_co_ca_ngua", name: "Co Ca Ngua" },
  { id: "web_co_dam_checkers", name: "Co Dam Checkers" },
  { id: "web_co_thu_jungle_chess", name: "Co Thu Jungle Chess" },
  { id: "web_co_ty_phu", name: "Co Ty Phu" },
  { id: "web_hive_co_con_trung", name: "Co Con Trung Hive" },
  { id: "web_o_an_quan", name: "O An Quan" },
];

export default function GameMiniPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px 20px",
        background: "#101820",
        color: "#f8fafc",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <section style={{ maxWidth: 1120, margin: "0 auto" }}>
        <header style={{ marginBottom: 32 }}>
          <p style={{ margin: "0 0 8px", color: "#7dd3fc", fontWeight: 700 }}>
            GameMini
          </p>
          <h1 style={{ margin: 0, fontSize: 42, lineHeight: 1.1 }}>
            Chon game de choi
          </h1>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {GAMES.map((game) => (
            <Link
              key={game.id}
              href={`/GameMini/${game.id}`}
              style={{
                display: "block",
                minHeight: 110,
                padding: 20,
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 8,
                background: "#17212b",
                color: "#f8fafc",
                textDecoration: "none",
              }}
            >
              <strong style={{ display: "block", marginBottom: 12, fontSize: 18 }}>
                {game.name}
              </strong>
              <span style={{ color: "#a7b4c2" }}>Mo game</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
