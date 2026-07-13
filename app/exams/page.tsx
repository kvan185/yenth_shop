import Link from "next/link";

export const metadata = {
  title: "Đánh giá năng lực | YENTH",
  description: "Bảng định hướng đánh giá năng lực trước và sau khi luyện tập tiếng Anh.",
};

const readinessSignals = [
  {
    code: "VOC",
    title: "Vốn từ",
    description: "Bạn có nhận ra nghĩa chính, loại từ và cách dùng trong câu không?",
    status: "Nền tảng",
  },
  {
    code: "GRA",
    title: "Cấu trúc",
    description: "Bạn có chọn đúng thì, modal, bị động, mệnh đề và so sánh không?",
    status: "Nền tảng",
  },
  {
    code: "ACC",
    title: "Độ chính xác",
    description: "Tỉ lệ đúng có ổn định khi câu hỏi đổi ngữ cảnh hoặc tăng độ khó không?",
    status: "Theo dõi",
  },
  {
    code: "SPD",
    title: "Tốc độ",
    description: "Bạn trả lời được trong thời gian hợp lý hay vẫn cần đoán nhiều?",
    status: "Theo dõi",
  },
  {
    code: "ERR",
    title: "Mẫu lỗi",
    description: "Lỗi sai lặp lại ở nhóm nào: nghĩa, dạng từ, ngữ pháp hay đọc câu?",
    status: "Phân tích",
  },
  {
    code: "RET",
    title: "Ghi nhớ",
    description: "Sau một ngày, các từ và cấu trúc đã đúng có còn nhớ được không?",
    status: "Ôn lại",
  },
];

const assessmentLoop = [
  "Chọn một kỹ năng nền tảng cần đo",
  "Làm bài ở khu Practice",
  "Ghi lại nhóm lỗi sai nổi bật",
  "Quay về Review để sửa lỗi",
  "Làm lại sau 24 giờ để kiểm tra ghi nhớ",
];

const reportCards = [
  {
    title: "Điểm mạnh",
    detail: "Phần làm đúng ổn định qua nhiều lượt kiểm tra.",
  },
  {
    title: "Điểm yếu",
    detail: "Nhóm câu sai nhiều hoặc cần nhiều thời gian để xử lý.",
  },
  {
    title: "Bước tiếp theo",
    detail: "Một hành động nhỏ nên làm ngay thay vì mở thêm quá nhiều bài.",
  },
];

export default function ExamsPage() {
  return (
    <main className="examsPage">
      <section className="examsHero">
        <div className="learnPathHeroCopy">
          <p className="homeEyebrow">Đánh giá năng lực</p>
          <h1>Đây là nơi đọc kết quả, không phải nơi làm bài.</h1>
          <p>
            `/practice` dùng để luyện tập. Trang này dùng để nhìn lại năng lực:
            mình đang mạnh ở đâu, yếu ở đâu, và nên quay lại ôn phần nào trước.
          </p>
          <div className="homeHeroActions">
            <Link className="primaryButton" href="/practice">
              Sang Practice
            </Link>
            <Link className="secondaryButton" href="/review/mistakes">
              Xem Review
            </Link>
          </div>
        </div>

        <aside className="examsPlanPanel" aria-label="Tóm tắt đánh giá">
          <span>Tóm tắt hiện tại</span>
          <h2>Cần dữ liệu từ Practice và Review</h2>
          <p>Khi có lịch sử làm bài, khu này nên hiển thị tỉ lệ đúng, nhóm lỗi và đề xuất ôn tiếp.</p>
          <div className="todayProgress" aria-label="Mức sẵn sàng đánh giá 35%">
            <span style={{ width: "35%" }} />
          </div>
          <div className="learnCurrentStats">
            <div>
              <strong>6</strong>
              <span>Tiêu chí</span>
            </div>
            <div>
              <strong>3</strong>
              <span>Báo cáo</span>
            </div>
            <div>
              <strong>24h</strong>
              <span>Ôn lại</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="examsSection">
        <div className="sectionHead">
          <span>Tiêu chí</span>
          <h2>Đánh giá theo 6 tín hiệu nền tảng</h2>
        </div>
        <div className="examTrackGrid">
          {readinessSignals.map((track) => (
            <article className="examTrackCard" key={track.code}>
              <span>{track.code}</span>
              <h3>{track.title}</h3>
              <p>{track.description}</p>
              <strong>{track.status}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="examsSection examsFlowSection">
        <div className="sectionHead">
          <span>Vòng lặp</span>
          <h2>Cách dùng đúng giữa Exams, Practice và Review</h2>
        </div>
        <ol className="learnFlowList">
          {assessmentLoop.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="examsSection">
        <div className="sectionHead">
          <span>Báo cáo</span>
          <h2>Trang này nên trả lời ba câu hỏi</h2>
        </div>
        <div className="reviewGrid">
          {reportCards.map((item) => (
            <article className="reviewCard" key={item.title}>
              <strong>{item.title}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
