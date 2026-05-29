'use client';

import { useMemo, useState } from 'react';

const exams = [
  { name: 'Đề thi thử Toán 12', subject: 'Toán', time: '90 phút', questions: 50 },
  { name: 'Đề luyện tiếng Anh B1', subject: 'Anh văn', time: '60 phút', questions: 40 },
  { name: 'Kiểm tra tư duy logic', subject: 'Tư duy', time: '45 phút', questions: 30 },
];

const questions = [
  {
    text: 'Nếu một lớp có 32 học viên và 75% đã hoàn thành bài thi, còn bao nhiêu học viên chưa hoàn thành?',
    options: ['6 học viên', '8 học viên', '12 học viên', '24 học viên'],
    answer: '8 học viên',
  },
  {
    text: 'Một đề thi online nên có tính năng nào để giáo viên kiểm soát tiến độ?',
    options: ['Bảng xếp hạng', 'Tiến độ từng học viên', 'Ảnh bìa khóa học', 'Màu nền tùy ý'],
    answer: 'Tiến độ từng học viên',
  },
  {
    text: 'Kết quả thi thử hữu ích nhất khi có thêm dữ liệu nào?',
    options: ['Thời gian làm bài', 'Tên thiết bị', 'Màu nút bấm', 'Kích thước logo'],
    answer: 'Thời gian làm bài',
  },
];

const classroomStats = [
  ['128', 'học viên đang ôn'],
  ['42', 'bài nộp hôm nay'],
  ['7.8', 'điểm trung bình'],
];

const features = [
  ['Ngân hàng câu hỏi', 'Tạo câu hỏi trắc nghiệm, đáp án đúng, lời giải, phân loại theo môn và độ khó.'],
  ['Phòng thi thử', 'Học viên vào làm bài, thấy đồng hồ, tiến độ câu hỏi và trạng thái đã chọn đáp án.'],
  ['Chấm điểm tự động', 'Tính điểm ngay sau khi nộp, hiện câu đúng/sai và gợi ý phần cần ôn lại.'],
  ['Quản lý lớp học', 'Theo dõi lượt làm bài, điểm trung bình, học viên chưa nộp và lịch thi sắp tới.'],
];

const lessons = [
  ['01', 'Tạo đề', 'Giáo viên chọn môn, thời lượng, số câu và nhóm học viên được phép tham gia.'],
  ['02', 'Học viên làm bài', 'Giao diện tập trung vào câu hỏi, đáp án, đồng hồ và thao tác chuyển câu nhanh.'],
  ['03', 'Nộp bài', 'Hệ thống khóa bài, chấm điểm và lưu lịch sử để học viên xem lại.'],
  ['04', 'Xem báo cáo', 'Giáo viên nhìn điểm, thời gian, câu sai nhiều và danh sách cần nhắc học tiếp.'],
];

export function MockExamDemo() {
  const [selectedExam, setSelectedExam] = useState(exams[0]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({ 0: '8 học viên' });

  const score = useMemo(
    () => questions.filter((question, index) => answers[index] === question.answer).length,
    [answers],
  );

  const question = questions[currentQuestion];

  return (
    <main className="exam-page">
      <header className="exam-header">
        <a href="#top" className="exam-logo">EduTest</a>
        <nav aria-label="Điều hướng mẫu thi thử">
          <a href="#de-thi">Đề thi</a>
          <a href="#phong-thi">Phòng thi</a>
          <a href="#bao-cao">Báo cáo</a>
          <a href="#dang-ky">Đăng ký</a>
        </nav>
      </header>

      <section id="top" className="exam-hero">
        <div className="exam-hero-copy">
          <span>Web dạy học / thi thử online</span>
          <h1>Nền tảng thi thử giúp giáo viên giao đề, chấm điểm và theo dõi lớp trong một nơi.</h1>
          <p>
            Mẫu này phù hợp trung tâm ngoại ngữ, lớp luyện thi, giáo viên cá nhân hoặc khóa học online cần tạo đề,
            cho học viên làm bài và xem kết quả nhanh sau mỗi lượt thi.
          </p>
          <div className="exam-actions">
            <a href="#phong-thi">Làm thử một câu</a>
            <a href="#de-thi">Xem danh sách đề</a>
          </div>
        </div>
        <aside className="exam-card">
          <div className="exam-card-head">
            <strong>{selectedExam.name}</strong>
            <span>{selectedExam.subject}</span>
          </div>
          <div className="exam-timer">42:18</div>
          <div className="exam-progress" aria-label="Tiến độ làm bài">
            <i style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }} />
          </div>
          <p>
            Đã trả lời {Object.keys(answers).length}/{questions.length} câu trong bản demo. Kết quả đúng hiện tại: {score}/{questions.length}.
          </p>
        </aside>
      </section>

      <section className="exam-stats">
        {classroomStats.map(([value, label]) => (
          <article key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </section>

      <section id="de-thi" className="exam-section">
        <div className="exam-section-head">
          <span>Danh sách đề</span>
          <h2>Học viên chọn đúng đề, giáo viên kiểm soát thời lượng và số câu ngay từ đầu.</h2>
        </div>
        <div className="exam-list">
          {exams.map((exam) => (
            <button className={selectedExam.name === exam.name ? 'active' : undefined} key={exam.name} type="button" onClick={() => setSelectedExam(exam)}>
              <span>{exam.subject}</span>
              <strong>{exam.name}</strong>
              <small>{exam.time} · {exam.questions} câu</small>
            </button>
          ))}
        </div>
      </section>

      <section id="phong-thi" className="exam-room">
        <div className="exam-room-copy">
          <span>Phòng thi thử</span>
          <h2>Giao diện làm bài rõ ràng, đủ tập trung cho học viên trên cả điện thoại.</h2>
          <p>Trong bản thật có thể thêm chống nộp thiếu câu, giới hạn thời gian, trộn câu, trộn đáp án và lưu nháp.</p>
        </div>
        <div className="exam-question-panel">
          <div className="exam-question-top">
            <strong>Câu {currentQuestion + 1}</strong>
            <span>{selectedExam.time}</span>
          </div>
          <h3>{question.text}</h3>
          <div className="exam-options">
            {question.options.map((option) => (
              <button
                className={answers[currentQuestion] === option ? 'active' : undefined}
                key={option}
                type="button"
                onClick={() => setAnswers((current) => ({ ...current, [currentQuestion]: option }))}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="exam-question-actions">
            {questions.map((_, index) => (
              <button className={currentQuestion === index ? 'active' : undefined} key={index} type="button" onClick={() => setCurrentQuestion(index)}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="bao-cao" className="exam-section exam-report">
        <div className="exam-section-head">
          <span>Báo cáo lớp</span>
          <h2>Sau bài thi, giáo viên cần biết câu nào sai nhiều và học viên nào cần hỗ trợ.</h2>
        </div>
        <div className="exam-feature-grid">
          {features.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="exam-process">
        <div className="exam-section-head">
          <span>Luồng sử dụng</span>
          <h2>Mẫu thi thử được thiết kế theo đúng nhịp dạy, làm bài, nộp và xem báo cáo.</h2>
        </div>
        <div className="exam-step-grid">
          {lessons.map(([number, title, text]) => (
            <article key={number}>
              <strong>{number}</strong>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="dang-ky" className="exam-contact">
        <div>
          <span>Đăng ký tư vấn</span>
          <h2>Cần web dạy học có thi thử, lưu điểm và quản lý lớp?</h2>
          <p>Gửi nhu cầu môn học, số lượng học viên, kiểu đề và báo cáo cần xem để chốt cấu trúc phù hợp.</p>
        </div>
        <form>
          <label>
            Tên lớp / trung tâm
            <input placeholder="Ví dụ: Lớp luyện thi Minh Anh" />
          </label>
          <label>
            Loại đề thi
            <select defaultValue="trac-nghiem">
              <option value="trac-nghiem">Trắc nghiệm</option>
              <option value="tu-luan">Tự luận</option>
              <option value="ket-hop">Trắc nghiệm + tự luận</option>
            </select>
          </label>
          <label>
            Nhu cầu chính
            <textarea placeholder="Bạn muốn tạo đề, chấm điểm và quản lý học viên như thế nào?" />
          </label>
          <button type="button">Gửi nhu cầu thi thử</button>
        </form>
      </section>
    </main>
  );
}
