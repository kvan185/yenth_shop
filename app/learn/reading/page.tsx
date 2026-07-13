import LearnSkillPage from "../../../components/LearnSkillPage";

export default function ReadingPage() {
  return (
    <LearnSkillPage
      accent="Reading"
      title="Reading"
      description="Đọc theo mục tiêu: quét ý chính, tìm thông tin, rồi gom từ mới vào bộ ôn."
      nextHref="/grammar/sentence-structure"
      nextLabel="Ôn cấu trúc câu"
      lessons={[
        {
          title: "Scan the question",
          detail: "Đọc câu hỏi trước để biết cần tìm tên riêng, số liệu hay ý kiến.",
          href: "/grammar/sentence-structure",
        },
        {
          title: "Vocabulary in context",
          detail: "Gặp từ mới thì đoán bằng câu xung quanh trước khi tra nghĩa.",
          href: "/dictionary",
        },
        {
          title: "Mistake review",
          detail: "Lưu lại câu suy luận sai và quay lại nhóm lỗi sau phiên học.",
          href: "/review/mistakes",
        },
      ]}
    />
  );
}
