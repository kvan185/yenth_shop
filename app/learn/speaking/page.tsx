import LearnSkillPage from "../../../components/LearnSkillPage";

export default function SpeakingPage() {
  return (
    <LearnSkillPage
      accent="Speaking"
      title="Speaking"
      description="Chuẩn bị ý, câu mở rộng và từ nối để trả lời mạch lạc hơn."
      nextHref="/practice/flashcards"
      nextLabel="Ôn cụm trả lời"
      lessons={[
        {
          title: "Answer frame",
          detail: "Tạo khung trả lời ngắn: ý chính, lý do, ví dụ, kết luận.",
          href: "/grammar/sentence-structure",
        },
        {
          title: "Useful vocabulary",
          detail: "Ôn các từ có thể dùng lại trong nhiều chủ đề nói.",
          href: "/practice/flashcards",
        },
        {
          title: "Self correction",
          detail: "Sau khi nói, ghi lại lỗi từ vựng hoặc cấu trúc để ôn lại.",
          href: "/review/weak-words",
        },
      ]}
    />
  );
}
