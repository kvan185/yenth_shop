import RouteHub from "../../components/RouteHub";

const cards = [
  {
    href: "/practice/flashcards",
    title: "Flashcards",
    description: "Khung ôn thẻ nhớ theo SRS sau này.",
    meta: "Coming next",
  },
  {
    href: "/practice/multiple-choice",
    title: "Multiple Choice",
    description: "Bài trắc nghiệm đang dùng từ data hiện có.",
    meta: "Đang dùng",
  },
  {
    href: "/grammar/tenses#test",
    title: "Grammar Test",
    description: "Vị trí kiểm tra ngữ pháp theo từng route chủ điểm.",
    meta: "Mới",
  },
  {
    href: "/practice/fill-blank",
    title: "Fill in Blank",
    description: "Khung điền từ cho bài luyện tập sau này.",
    meta: "Coming next",
  },
  {
    href: "/practice/matching",
    title: "Matching",
    description: "Khung ghép cặp từ - nghĩa.",
    meta: "Coming next",
  },
];

export default function PracticePage() {
  return (
    <RouteHub
      eyebrow="Practice"
      title="Khu vực luyện tập"
      description="Giữ route practice theo sitemap, nhưng chỉ route đang có dữ liệu thật mới được triển khai đầy đủ."
      cards={cards}
    />
  );
}
