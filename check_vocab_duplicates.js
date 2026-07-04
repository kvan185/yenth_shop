const fs = require("fs");
const path = require("path");

const inputPath = process.argv[2] || "data/c1_vocab_partial_template.json";
const resolvedInputPath = path.resolve(inputPath);
const outputPath =
  process.argv[3] ||
  path.join(
    path.dirname(resolvedInputPath),
    `${path.basename(resolvedInputPath, path.extname(resolvedInputPath))}_words.txt`,
  );

function normalizeWord(word) {
  return String(word || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function readVocabulary(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(raw);

  if (!Array.isArray(data)) {
    throw new Error("File JSON phải là một mảng các mục từ vựng.");
  }

  return data;
}

function main() {
  const vocabulary = readVocabulary(resolvedInputPath);
  const wordMap = new Map();
  const missingWordIndexes = [];

  vocabulary.forEach((item, index) => {
    const word = item && item["từ"];
    const normalizedWord = normalizeWord(word);

    if (!normalizedWord) {
      missingWordIndexes.push(index + 1);
      return;
    }

    if (!wordMap.has(normalizedWord)) {
      wordMap.set(normalizedWord, []);
    }

    wordMap.get(normalizedWord).push({
      index: index + 1,
      word: String(word).trim(),
      meaning: item["nghĩa"] || "",
      partOfSpeech: item["loại từ"] || "",
    });
  });

  const words = Array.from(wordMap.values()).map((entries) => entries[0].word);
  fs.writeFileSync(outputPath, `${words.join("\n")}\n`, "utf8");

  const duplicates = Array.from(wordMap.entries())
    .filter(([, entries]) => entries.length > 1)
    .sort(([a], [b]) => a.localeCompare(b));

  console.log(`Đã kiểm tra: ${vocabulary.length} mục`);
  console.log(`Số từ hợp lệ: ${words.length}`);
  console.log(`File danh sách từ vựng: ${outputPath}`);

  if (missingWordIndexes.length > 0) {
    console.log(`\nMục thiếu khóa "từ": ${missingWordIndexes.join(", ")}`);
  }

  if (duplicates.length === 0) {
    console.log("\nKhông phát hiện từ bị lặp.");
    return;
  }

  console.log(`\nPhát hiện ${duplicates.length} từ bị lặp:`);
  duplicates.forEach(([word, entries]) => {
    console.log(`\n- ${word}`);
    entries.forEach((entry) => {
      const details = [entry.partOfSpeech, entry.meaning].filter(Boolean).join(" | ");
      console.log(`  dòng/mục ${entry.index}: ${entry.word}${details ? ` (${details})` : ""}`);
    });
  });
}

try {
  main();
} catch (error) {
  console.error(`Lỗi: ${error.message}`);
  process.exit(1);
}
