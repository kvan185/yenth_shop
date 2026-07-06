import Link from "next/link";

export const metadata = {
  title: "Exams | Luyện đề tiếng Anh",
  description: "Trung tâm luyện đề TOEIC, IELTS, VSTEP và các bài kiểm tra tiếng Anh.",
};

const examTracks = [
  {
    code: "VST",
    title: "VSTEP",
    description: "Luyện theo kỹ năng nghe, nói, đọc, viết và mục tiêu B1-B2.",
    status: "Sắp có",
  },
  {
    code: "TOE",
    title: "TOEIC",
    description: "Luyện nghe đọc, tăng tốc độ xử lý câu hỏi và từ vựng công việc.",
    status: "Sắp có",
  },
  {
    code: "IEL",
    title: "IELTS",
    description: "Luyện band theo kỹ năng, chú trọng reading, writing và speaking.",
    status: "Sắp có",
  },
  {
    code: "MIN",
    title: "Mini Test",
    description: "Bài kiểm tra ngắn 10-20 câu để giữ nhịp luyện mỗi ngày.",
    status: "Ưu tiên",
  },
  {
    code: "VOC",
    title: "Vocabulary Checkpoint",
    description: "Kiểm tra vốn từ trước khi vào đề đọc/nghe dài hơn.",
    status: "Đang dùng",
  },
  {
    code: "ERR",
    title: "Mistake Review",
    description: "Gom lỗi sai sau mỗi đề để biết phần nào cần quay lại ôn.",
    status: "Đang dùng",
  },
];

const examFlow = [
  "Chọn mục tiêu thi",
  "Làm mini test",
  "Xem điểm yếu",
  "Ôn lại từ/ngữ pháp",
  "Làm đề dài hơn",
];

export default function ExamsPage() {
  return (
    <main className="examsPage">
      <section className="examsHero">
        <div className="learnPathHeroCopy">
          <p className="homeEyebrow">Exams</p>
          <h1>Luyện đề theo mục tiêu, không làm bài một cách ngẫu nhiên.</h1>
          <p>
            Bắt đầu bằng mini test, phát hiện điểm yếu, quay lại ôn đúng phần cần sửa
            rồi mới chuyển sang đề dài.
          </p>
          <div className="homeHeroActions">
            <Link className="primaryButton" href="/practice/multiple-choice">
              Làm mini test
            </Link>
            <Link className="secondaryButton" href="/review/mistakes">
              Xem lỗi sai
            </Link>
          </div>
        </div>

        <aside className="examsPlanPanel" aria-label="Kế hoạch luyện đề">
          <span>Kế hoạch tuần này</span>
          <h2>Vocabulary Checkpoint</h2>
          <p>Hoàn thành bài kiểm tra từ vựng trước khi mở đề VSTEP hoặc TOEIC.</p>
          <div className="todayProgress" aria-label="Tiến độ luyện đề 42%">
            <span style={{ width: "42%" }} />
          </div>
          <div className="learnCurrentStats">
            <div>
              <strong>3</strong>
              <span>Mini test</span>
            </div>
            <div>
              <strong>18</strong>
              <span>Lỗi sai</span>
            </div>
            <div>
              <strong>42%</strong>
              <span>Tiến độ</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="examsSection">
        <div className="sectionHead">
          <span>Loại đề</span>
          <h2>Chọn mục tiêu luyện thi</h2>
        </div>
        <div className="examTrackGrid">
          {examTracks.map((track) => (
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
          <span>Quy trình</span>
          <h2>Luyện đề nên đi theo vòng lặp này</h2>
        </div>
        <ol className="learnFlowList">
          {examFlow.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="examsSection">
        <div className="sectionHead">
          <span>Đi nhanh</span>
          <h2>Chuẩn bị trước khi vào đề</h2>
        </div>
        <div className="reviewGrid">
          <Link className="reviewCard" href="/vocabulary">
            <strong>Ôn từ vựng</strong>
            <p>Nắm từ theo level trước khi làm bài đọc/nghe dài.</p>
          </Link>
          <Link className="reviewCard" href="/grammar">
            <strong>Ôn ngữ pháp</strong>
            <p>Quay lại các cấu trúc dễ sai trước khi làm đề.</p>
          </Link>
          <Link className="reviewCard" href="/practice/multiple-choice">
            <strong>Mini test</strong>
            <p>Làm bài ngắn để kiểm tra phản xạ và tốc độ.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
