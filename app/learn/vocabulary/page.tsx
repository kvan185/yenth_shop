import RouteHub from "../../../components/RouteHub";
import { levelConfig } from "../../../lib/vocabulary";

export const metadata = {
  title: "Learn Vocabulary | Ôn từ vựng VSTEP",
  description: "Danh sách level từ vựng theo sitemap",
};

export default function VocabularyIndexPage() {
  return (
    <RouteHub
      eyebrow="Learn / Vocabulary"
      title="Học từ vựng"
      description="Chọn level để mở đúng bộ từ vựng đang có."
      cards={[
        ...levelConfig.map((level) => ({
          href: level.href,
          title: level.id,
          description: `Mở bài học ${level.id}`,
          meta: `${level.words} từ`,
        })),
        {
          href: "/dictionary",
          title: "Dictionary",
          description: "Tra từ trên toàn bộ data một màn hình.",
          meta: "Toàn data",
        },
      ]}
    />
  );
}
