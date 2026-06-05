let cards = [];
let current = 0;
let flipped = false;

const wordEl = document.getElementById("word");
const meaningEl = document.getElementById("meaning");
const exampleEl = document.getElementById("example");
const categoryEl = document.getElementById("category");
const counterEl = document.getElementById("counter");

async function loadVocabulary() {
  try {
    const response = await fetch("vocabulary.json");
    cards = await response.json();
    renderCard();
  } catch (error) {
    wordEl.textContent = "Không tải được vocabulary.json";
    counterEl.textContent = "Hãy chạy bằng Live Server hoặc mở qua localhost.";
    console.error(error);
  }
}

function renderCard() {
  if (cards.length === 0) {
    wordEl.textContent = "Chưa có từ vựng";
    return;
  }

  const card = cards[current];

  wordEl.textContent = card.word;
  meaningEl.textContent = card.meaning;
  exampleEl.textContent = card.example || "";
  categoryEl.textContent = card.category || "Chưa phân loại";

  document.querySelector(".front").style.display = "block";
  document.querySelector(".back").style.display = "none";

  counterEl.textContent = `Thẻ ${current + 1} / ${cards.length}`;
  flipped = false;
}

function flipCard() {
  const front = document.querySelector(".front");
  const back = document.querySelector(".back");

  if (!flipped) {
    front.style.display = "none";
    back.style.display = "block";
  } else {
    front.style.display = "block";
    back.style.display = "none";
  }

  flipped = !flipped;
}

function nextCard() {
  current = (current + 1) % cards.length;
  renderCard();
}

function prevCard() {
  current = (current - 1 + cards.length) % cards.length;
  renderCard();
}

function randomCard() {
  current = Math.floor(Math.random() * cards.length);
  renderCard();
}

function addCard() {
  const word = document.getElementById("newWord").value.trim();
  const meaning = document.getElementById("newMeaning").value.trim();
  const example = document.getElementById("newExample").value.trim();
  const category = document.getElementById("newCategory").value.trim();

  if (!word || !meaning) {
    alert("Vui lòng nhập từ vựng và nghĩa!");
    return;
  }

  cards.push({
    word,
    meaning,
    example,
    category
  });

  document.getElementById("newWord").value = "";
  document.getElementById("newMeaning").value = "";
  document.getElementById("newExample").value = "";
  document.getElementById("newCategory").value = "";

  current = cards.length - 1;
  renderCard();

  alert("Đã thêm flashcard tạm thời!");
}

loadVocabulary();
