export type QuizVocabularyItem = {
  [key: string]: string | undefined;
  "từ"?: string;
  "loại từ"?: string;
  "nghĩa"?: string;
  "ví dụ"?: string;
  "nghĩa ví dụ"?: string;
};

export type QuizQuestion<T extends QuizVocabularyItem> = {
  answer: T;
  options: T[];
};

const semanticSignals: Record<string, string[]> = {
  person: ["nguoi", "tre", "dan", "nhan", "gia dinh", "ban", "co ay", "anh ay", "nghe"],
  place: ["noi", "cho", "nha", "truong", "phong", "thanh pho", "quoc gia", "khu vuc"],
  action: ["lam", "tao", "di", "noi", "viet", "hoc", "giu", "dat", "tang", "giam"],
  feeling: ["vui", "buon", "lo", "so", "gian", "yeu", "thich", "cam thay"],
  quality: ["co the", "tot", "xau", "lon", "nho", "cao", "thap", "chinh xac", "can thiet"],
  time: ["thoi gian", "ngay", "thang", "nam", "som", "muon", "thuong xuyen"],
  money: ["tien", "gia", "chi phi", "giau", "ngheo", "kinh te", "luong"],
  education: ["hoc", "giao duc", "truong", "sinh vien", "giao vien", "bai", "ky thi"],
  work: ["cong viec", "lam viec", "nhan vien", "quan ly", "cong ty", "nghe"],
  health: ["suc khoe", "benh", "dau", "co the", "da", "y te"],
  communication: ["noi", "hoi", "tra loi", "thong tin", "tin", "giong", "ngon ngu"],
};

const commonMeaningTokens = new Set([
  "la",
  "mot",
  "cua",
  "co",
  "the",
  "duoc",
  "su",
  "ve",
  "cho",
  "trong",
  "bang",
  "nhung",
  "cac",
  "va",
  "hoac",
  "nguoi",
]);

export function shuffle<T>(items: T[]) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function normalizeForMatch(value: string | undefined) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9\s/,-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getMeaning(item: QuizVocabularyItem) {
  return item["nghĩa"] || "";
}

function getPartOfSpeech(item: QuizVocabularyItem) {
  return normalizeForMatch(item["loại từ"]);
}

function getPrimaryPartOfSpeech(item: QuizVocabularyItem) {
  return getPartOfSpeech(item).split(/[\/,\s-]+/).filter(Boolean)[0] || "";
}

function getPartOfSpeechTokens(item: QuizVocabularyItem) {
  return new Set(getPartOfSpeech(item).split(/[\/,\s-]+/).filter(Boolean));
}

function getMeaningTokens(item: QuizVocabularyItem) {
  return normalizeForMatch(getMeaning(item))
    .split(/[\s,/-]+/)
    .filter((token) => token.length > 1 && !commonMeaningTokens.has(token));
}

function getSemanticTags(item: QuizVocabularyItem) {
  const text = normalizeForMatch(
    [item["nghĩa"], item["nghĩa ví dụ"], item["ví dụ"], item["loại từ"]].join(" "),
  );

  return Object.entries(semanticSignals)
    .filter(([, signals]) => signals.some((signal) => text.includes(signal)))
    .map(([tag]) => tag);
}

function countSharedValues(first: Iterable<string>, second: Iterable<string>) {
  const secondValues = new Set(second);
  let count = 0;
  for (const value of first) {
    if (secondValues.has(value)) {
      count += 1;
    }
  }
  return count;
}

function scoreDistractor(answer: QuizVocabularyItem, candidate: QuizVocabularyItem) {
  const answerPrimaryPart = getPrimaryPartOfSpeech(answer);
  const candidatePrimaryPart = getPrimaryPartOfSpeech(candidate);
  const answerParts = getPartOfSpeechTokens(answer);
  const candidateParts = getPartOfSpeechTokens(candidate);
  const answerTokens = getMeaningTokens(answer);
  const candidateTokens = getMeaningTokens(candidate);
  const answerTags = getSemanticTags(answer);
  const candidateTags = getSemanticTags(candidate);
  const meaningLengthGap = Math.abs(getMeaning(answer).length - getMeaning(candidate).length);

  let score = 0;
  if (answerPrimaryPart && answerPrimaryPart === candidatePrimaryPart) {
    score += 70;
  } else if (countSharedValues(answerParts, candidateParts) > 0) {
    score += 35;
  }

  score += countSharedValues(answerTags, candidateTags) * 24;
  score += countSharedValues(answerTokens, candidateTokens) * 10;
  score += Math.max(0, 24 - meaningLengthGap);

  return score;
}

function selectDistractors<T extends QuizVocabularyItem>(answer: T, words: T[], count: number) {
  const answerMeaning = normalizeForMatch(getMeaning(answer));
  const candidates = words.filter((item) => item !== answer && normalizeForMatch(getMeaning(item)) !== answerMeaning);

  const rankedCandidates = candidates
    .map((item) => ({ item, score: scoreDistractor(answer, item) }))
    .sort((first, second) => second.score - first.score);

  const strongPool = rankedCandidates.slice(0, Math.max(count * 5, count));
  const selected = shuffle(strongPool).slice(0, count).map(({ item }) => item);

  if (selected.length >= count) {
    return selected;
  }

  const selectedMeanings = new Set(selected.map((item) => normalizeForMatch(getMeaning(item))));
  const fallback = shuffle(candidates).filter((item) => !selectedMeanings.has(normalizeForMatch(getMeaning(item))));
  return [...selected, ...fallback].slice(0, count);
}

export function createQuizQuestion<T extends QuizVocabularyItem>(words: T[]): QuizQuestion<T> | null {
  if (words.length < 4) {
    return null;
  }

  const answer = words[Math.floor(Math.random() * words.length)];
  const wrongOptions = selectDistractors(answer, words, 3);

  return {
    answer,
    options: shuffle([answer, ...wrongOptions]),
  };
}

export function createQuizQuestionForAnswer<T extends QuizVocabularyItem>(
  answer: T,
  words: T[],
): QuizQuestion<T> | null {
  if (words.length < 4) {
    return null;
  }

  const wrongOptions = selectDistractors(answer, words, 3);

  return {
    answer,
    options: shuffle([answer, ...wrongOptions]),
  };
}
