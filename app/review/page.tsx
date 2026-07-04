import RouteHub from "../../components/RouteHub";

const cards = [
  {
    href: "/review/today",
    title: "Today's Review",
    description: "Danh sách ôn tập trong ngày.",
    meta: "Coming next",
  },
  {
    href: "/review/weak-words",
    title: "Weak Words",
    description: "Nhóm từ người dùng hay sai.",
    meta: "Coming next",
  },
  {
    href: "/review/mistakes",
    title: "Mistakes",
    description: "Lưu lại toàn bộ câu đã làm sai.",
    meta: "Coming next",
  },
];

export default function ReviewPage() {
  return (
    <RouteHub
      eyebrow="Review"
      title="Khu vực ôn tập"
      description="Giữ đúng vị trí cho các cơ chế ôn sai và SRS sau này."
      cards={cards}
    />
  );
}
