const state = {
  words: [],
  filteredWords: [],
  currentIndex: 0,
  seen: new Set(),
  scoreCorrect: 0,
  scoreTotal: 0,
  quizAnswer: null,
  answered: false,
};

const elements = {
  totalWords: document.querySelector("#totalWords"),
  seenWords: document.querySelector("#seenWords"),
  scoreCorrect: document.querySelector("#scoreCorrect"),
  scoreTotal: document.querySelector("#scoreTotal"),
  searchInput: document.querySelector("#searchInput"),
  shuffleButton: document.querySelector("#shuffleButton"),
  learnView: document.querySelector("#learnView"),
  quizView: document.querySelector("#quizView"),
  wordIndex: document.querySelector("#wordIndex"),
  wordText: document.querySelector("#wordText"),
  partOfSpeech: document.querySelector("#partOfSpeech"),
  meaningText: document.querySelector("#meaningText"),
  exampleText: document.querySelector("#exampleText"),
  exampleMeaningText: document.querySelector("#exampleMeaningText"),
  previousButton: document.querySelector("#previousButton"),
  nextButton: document.querySelector("#nextButton"),
  wordList: document.querySelector("#wordList"),
  quizWord: document.querySelector("#quizWord"),
  answerOptions: document.querySelector("#answerOptions"),
  feedbackText: document.querySelector("#feedbackText"),
  newQuestionButton: document.querySelector("#newQuestionButton"),
};

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function getWordText(item) {
  return item["từ"] || "";
}

function getMeaningText(item) {
  return item["nghĩa"] || "";
}

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const semanticSignals = {
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

function normalizeForMatch(value) {
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

function getPrimaryPartOfSpeech(item) {
  return normalizeForMatch(item["loại từ"]).split(/[\/,\s-]+/).filter(Boolean)[0] || "";
}

function getPartOfSpeechTokens(item) {
  return new Set(normalizeForMatch(item["loại từ"]).split(/[\/,\s-]+/).filter(Boolean));
}

function getMeaningTokens(item) {
  return normalizeForMatch(getMeaningText(item))
    .split(/[\s,/-]+/)
    .filter((token) => token.length > 1 && !commonMeaningTokens.has(token));
}

function getSemanticTags(item) {
  const text = normalizeForMatch(
    [item["nghĩa"], item["nghĩa ví dụ"], item["ví dụ"], item["loại từ"]].join(" "),
  );

  return Object.entries(semanticSignals)
    .filter(([, signals]) => signals.some((signal) => text.includes(signal)))
    .map(([tag]) => tag);
}

function countSharedValues(first, second) {
  const secondValues = new Set(second);
  let count = 0;
  for (const value of first) {
    if (secondValues.has(value)) {
      count += 1;
    }
  }
  return count;
}

function scoreDistractor(answer, candidate) {
  const answerPrimaryPart = getPrimaryPartOfSpeech(answer);
  const candidatePrimaryPart = getPrimaryPartOfSpeech(candidate);
  const meaningLengthGap = Math.abs(getMeaningText(answer).length - getMeaningText(candidate).length);

  let score = 0;
  if (answerPrimaryPart && answerPrimaryPart === candidatePrimaryPart) {
    score += 70;
  } else if (countSharedValues(getPartOfSpeechTokens(answer), getPartOfSpeechTokens(candidate)) > 0) {
    score += 35;
  }

  score += countSharedValues(getSemanticTags(answer), getSemanticTags(candidate)) * 24;
  score += countSharedValues(getMeaningTokens(answer), getMeaningTokens(candidate)) * 10;
  score += Math.max(0, 24 - meaningLengthGap);

  return score;
}

function selectDistractors(answer, words, count) {
  const answerMeaning = normalizeForMatch(getMeaningText(answer));
  const candidates = words.filter(
    (item) => item !== answer && normalizeForMatch(getMeaningText(item)) !== answerMeaning,
  );
  const rankedCandidates = candidates
    .map((item) => ({ item, score: scoreDistractor(answer, item) }))
    .sort((first, second) => second.score - first.score);
  const strongPool = rankedCandidates.slice(0, Math.max(count * 5, count));
  const selected = shuffle(strongPool).slice(0, count).map(({ item }) => item);

  if (selected.length >= count) {
    return selected;
  }

  const selectedMeanings = new Set(selected.map((item) => normalizeForMatch(getMeaningText(item))));
  const fallback = shuffle(candidates).filter(
    (item) => !selectedMeanings.has(normalizeForMatch(getMeaningText(item))),
  );
  return [...selected, ...fallback].slice(0, count);
}

function updateStats() {
  elements.totalWords.textContent = state.words.length;
  elements.seenWords.textContent = state.seen.size;
  elements.scoreCorrect.textContent = state.scoreCorrect;
  elements.scoreTotal.textContent = state.scoreTotal;
}

function getCurrentWord() {
  return state.filteredWords[state.currentIndex];
}

function renderWordList() {
  const maxItems = 80;
  const visibleWords = state.filteredWords.slice(0, maxItems);

  elements.wordList.innerHTML = "";
  visibleWords.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `word-chip${index === state.currentIndex ? " active" : ""}`;
    button.textContent = getWordText(item);
    button.title = `${getWordText(item)}: ${getMeaningText(item)}`;
    button.addEventListener("click", () => {
      state.currentIndex = index;
      renderLearnView();
    });
    elements.wordList.appendChild(button);
  });
}

function renderLearnView() {
  const item = getCurrentWord();

  if (!item) {
    elements.wordIndex.textContent = "Không có từ";
    elements.wordText.textContent = "Không tìm thấy";
    elements.partOfSpeech.textContent = "";
    elements.meaningText.textContent = "";
    elements.exampleText.textContent = "";
    elements.exampleMeaningText.textContent = "";
    elements.wordList.innerHTML = "";
    return;
  }

  state.seen.add(getWordText(item));
  elements.wordIndex.textContent = `Từ ${state.currentIndex + 1}/${state.filteredWords.length}`;
  elements.wordText.textContent = getWordText(item);
  elements.partOfSpeech.textContent = item["loại từ"] || "word";
  elements.meaningText.textContent = getMeaningText(item);
  elements.exampleText.textContent = item["ví dụ"] || "Chưa có ví dụ";
  elements.exampleMeaningText.textContent = item["nghĩa ví dụ"] || "Chưa có bản dịch";

  renderWordList();
  updateStats();
}

function moveWord(step) {
  if (state.filteredWords.length === 0) {
    return;
  }

  state.currentIndex =
    (state.currentIndex + step + state.filteredWords.length) % state.filteredWords.length;
  renderLearnView();
}

function applySearch() {
  const keyword = normalizeText(elements.searchInput.value);

  state.filteredWords = keyword
    ? state.words.filter((item) => {
        const haystack = [
          item["từ"],
          item["loại từ"],
          item["nghĩa"],
          item["ví dụ"],
          item["nghĩa ví dụ"],
        ]
          .map(normalizeText)
          .join(" ");
        return haystack.includes(keyword);
      })
    : [...state.words];

  state.currentIndex = 0;
  renderLearnView();
}

function createQuizQuestion() {
  if (state.words.length < 4) {
    elements.quizWord.textContent = "Cần ít nhất 4 từ";
    elements.answerOptions.innerHTML = "";
    return;
  }

  const answer = state.words[Math.floor(Math.random() * state.words.length)];
  const wrongOptions = selectDistractors(answer, state.words, 3);
  const options = shuffle([answer, ...wrongOptions]);

  state.quizAnswer = answer;
  state.answered = false;
  elements.quizWord.textContent = getWordText(answer);
  elements.feedbackText.textContent = "";
  elements.feedbackText.className = "feedback";
  elements.answerOptions.innerHTML = "";

  options.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.dataset.isCorrect = item === answer ? "true" : "false";
    button.innerHTML = `
      <span class="answer-letter">${String.fromCharCode(65 + index)}</span>
      <span>${getMeaningText(item)}</span>
    `;
    button.addEventListener("click", () => checkAnswer(button, item));
    elements.answerOptions.appendChild(button);
  });
}

function checkAnswer(button, selectedItem) {
  if (state.answered) {
    return;
  }

  state.answered = true;
  state.scoreTotal += 1;
  const isCorrect = selectedItem === state.quizAnswer;

  if (isCorrect) {
    state.scoreCorrect += 1;
    button.classList.add("correct");
    elements.feedbackText.textContent = "Đúng.";
    elements.feedbackText.className = "feedback correct";
  } else {
    button.classList.add("wrong");
    elements.feedbackText.textContent = `Sai. Đáp án đúng: ${getMeaningText(state.quizAnswer)}`;
    elements.feedbackText.className = "feedback wrong";
  }

  [...elements.answerOptions.children].forEach((child) => {
    if (child.dataset.isCorrect === "true") {
      child.classList.add("correct");
    }
  });

  updateStats();
}

function setMode(mode) {
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });

  elements.learnView.classList.toggle("active", mode === "learn");
  elements.quizView.classList.toggle("active", mode === "quiz");

  if (mode === "quiz") {
    createQuizQuestion();
  }
}

async function loadVocabulary() {
  const response = await fetch("b2_vocab_partial_template.json");
  if (!response.ok) {
    throw new Error("Không tải được dữ liệu từ vựng.");
  }

  const data = await response.json();
  state.words = data.filter((item) => getWordText(item) && getMeaningText(item));
  state.filteredWords = [...state.words];

  renderLearnView();
  createQuizQuestion();
}

document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

elements.previousButton.addEventListener("click", () => moveWord(-1));
elements.nextButton.addEventListener("click", () => moveWord(1));
elements.searchInput.addEventListener("input", applySearch);
elements.shuffleButton.addEventListener("click", () => {
  state.filteredWords = shuffle(state.filteredWords);
  state.currentIndex = 0;
  renderLearnView();
});
elements.newQuestionButton.addEventListener("click", createQuizQuestion);

loadVocabulary().catch((error) => {
  elements.wordText.textContent = "Lỗi tải dữ liệu";
  elements.meaningText.textContent = error.message;
});
