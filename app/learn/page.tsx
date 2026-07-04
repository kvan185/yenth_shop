import RouteHub from "../../components/RouteHub";

const cards = [
  {
    href: "/learn/vocabulary",
    title: "Vocabulary",
    description: "Danh sách level và bài học từ vựng hiện có.",
    meta: "Đang dùng",
  },
  {
    href: "/learn/grammar",
    title: "Grammar",
    description: "Khung dành cho phần ngữ pháp sau này.",
    meta: "Coming next",
  },
  {
    href: "/learn/listening",
    title: "Listening",
    description: "Khung cho bài nghe, tách riêng sau này.",
    meta: "Coming next",
  },
  {
    href: "/learn/reading",
    title: "Reading",
    description: "Khung cho bài đọc và bài tập đọc hiểu.",
    meta: "Coming next",
  },
];

export default function LearnPage() {
  return (
    <RouteHub
      eyebrow="Learn"
      title="Khu vực học"
      description="Chuyển toàn bộ phần học hiện có vào đúng nhánh Learn của sitemap."
      cards={cards}
    />
  );
}
