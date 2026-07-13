import LearnSkillPage from "../../../components/LearnSkillPage";

export default function ListeningPage() {
  return (
    <LearnSkillPage
      accent="Listening"
      title="Listening"
      description="Luyện nghe theo từng vòng: đoán ý chính, bắt từ khóa, kiểm tra lại bằng transcript."
      nextHref="/vocabulary/a2"
      nextLabel="Ôn từ nghe A2"
      lessons={[
        {
          title: "Warm-up keywords",
          detail: "Ôn nhanh các từ dễ xuất hiện trong bài nghe trước khi vào audio.",
          href: "/vocabulary/a2",
        },
        {
          title: "Main idea check",
          detail: "Nghe một lượt để chọn chủ đề chính, không dừng ở từng từ lẻ.",
          href: "/practice/multiple-choice",
        },
        {
          title: "Transcript repair",
          detail: "Ghi lại cụm bị mất, so với đáp án và đưa từ sai vào review.",
          href: "/review/mistakes",
        },
      ]}
    />
  );
}
