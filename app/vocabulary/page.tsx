import VocabularyIndexClient from "./VocabularyIndexClient";

export const metadata = {
  title: "Vocabulary | Ôn từ vựng VSTEP",
  description: "Chọn level từ vựng, làm quiz và ôn lại từ yếu theo lộ trình.",
};

export default function VocabularyIndexPage() {
  return <VocabularyIndexClient />;
}
