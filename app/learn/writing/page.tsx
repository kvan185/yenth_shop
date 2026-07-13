import LearnSkillPage from "../../../components/LearnSkillPage";

export default function WritingPage() {
  return (
    <LearnSkillPage
      accent="Writing"
      title="Writing"
      description="Luyện viết theo quy trình: lập dàn ý, viết câu chắc, kiểm lỗi và nâng cấp từ vựng."
      nextHref="/grammar/tenses"
      nextLabel="Ôn ngữ pháp viết"
      lessons={[
        {
          title: "Outline first",
          detail: "Chốt luận điểm và ví dụ trước khi viết để tránh lạc đề.",
          href: "/learn/grammar",
        },
        {
          title: "Sentence control",
          detail: "Dùng thì, mệnh đề quan hệ và so sánh đúng trước khi viết câu dài.",
          href: "/grammar",
        },
        {
          title: "Upgrade vocabulary",
          detail: "Thay từ lặp bằng từ cùng nhóm nghĩa đã học trong vocabulary.",
          href: "/vocabulary",
        },
      ]}
    />
  );
}
