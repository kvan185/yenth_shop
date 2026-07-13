import RouteHub from "../../components/RouteHub";

const cards = [
  {
    href: "/review/today",
    title: "Today's Review",
    description: "Ôn nhanh từ sai chưa sửa, có dữ liệu mẫu khi chưa có lịch sử.",
    meta: "Đang dùng",
  },
  {
    href: "/review/weak-words",
    title: "Weak Words",
    description: "Nhóm từ từng sai và chưa được trả lời đúng lại.",
    meta: "Đang dùng",
  },
  {
    href: "/review/mistakes",
    title: "Mistakes",
    description: "Tổng hợp lịch sử từ đã chọn sai trong vocabulary.",
    meta: "Đang dùng",
  },
];

export default function ReviewPage() {
  return (
    <RouteHub
      eyebrow="Review"
      title="Khu vực ôn tập"
      description="Đọc tiến độ vocabulary trong trình duyệt để gom từ sai, từ yếu và phiên ôn hôm nay."
      cards={cards}
    />
  );
}
