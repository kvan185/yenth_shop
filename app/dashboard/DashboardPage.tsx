import Link from "next/link";
import { allVocabularyData, levelConfig } from "../../lib/vocabulary";
import RouteHub from "../../components/RouteHub";

const cards = [
  {
    href: "/vocabulary",
    title: "Learn",
    description: "Học từ vựng theo level, mở từng bài riêng.",
    meta: "Vocabulary",
  },
  {
    href: "/practice/multiple-choice",
    title: "Practice",
    description: "Làm trắc nghiệm theo kiểu quiz hiện có.",
    meta: "Multiple Choice",
  },
  {
    href: "/dictionary",
    title: "Dictionary",
    description: "Tra nhanh toàn bộ data A1 đến C1.",
    meta: "Search all data",
  },
  {
    href: "/review",
    title: "Review",
    description: "Khung ôn tập cho các tính năng SRS sau này.",
    meta: "Coming next",
  },
  {
    href: "/progress",
    title: "Progress",
    description: "Tổng quan tiến độ học và thống kê.",
    meta: "Coming next",
  },
  {
    href: "/collections",
    title: "Collections",
    description: "Bộ chủ đề theo nhóm từ vựng.",
    meta: "Coming next",
  },
];

export default function DashboardPage() {
  return (
    <RouteHub
      eyebrow="Dashboard"
      title="Học tiếng Anh theo sitemap"
      description="Điểm vào chính của ứng dụng. Mở học, luyện tập, tra cứu hoặc đi vào các khu vực đang phát triển."
      cards={cards}
      footer={
        <div className="dashboardStats">
          <div>
            <span>Tổng từ</span>
            <strong>{allVocabularyData.length}</strong>
          </div>
          <div>
            <span>Số level</span>
            <strong>{levelConfig.length}</strong>
          </div>
          <div>
            <span>Route chính</span>
            <strong>4</strong>
          </div>
          <Link className="secondaryButton dashboardLink" href="/vocabulary">
            Vào học từ vựng
          </Link>
        </div>
      }
    />
  );
}
