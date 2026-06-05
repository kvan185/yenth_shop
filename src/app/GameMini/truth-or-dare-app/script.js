const truthQuestions = [
  "Bạn đã từng nói dối bạn thân chưa?",
  "Điều xấu hổ nhất bạn từng làm là gì?",
  "Bạn từng thích thầm ai lâu nhất?",
  "Nếu được quay lại quá khứ, bạn muốn sửa điều gì?",
  "Bạn sợ điều gì nhất?",
  "Bạn đã từng giả vờ hiểu bài chưa?",
  "Tin nhắn gần đây nhất của bạn là gửi cho ai?",
  "Bạn từng ghen tị với ai chưa?",
  "Một bí mật nhỏ của bạn là gì?",
  "Bạn thấy mình giống nhân vật phim nào nhất?"
];

const dareQuestions = [
  "Hát một đoạn bài hát bất kỳ trong 15 giây.",
  "Nhắn cho một người bạn: 'Tôi có chuyện muốn nói...'",
  "Tạo dáng hài hước trong 10 giây.",
  "Nói một câu thả thính thật sến.",
  "Bắt chước giọng một nhân vật nổi tiếng.",
  "Đọc ngược tên của bạn 3 lần.",
  "Kể một câu chuyện cười.",
  "Nhảy một động tác bất kỳ trong 10 giây.",
  "Đổi ảnh đại diện trong 5 phút.",
  "Nói lời khen người bên cạnh."
];

let currentMode = "truth";

const truthBtn = document.getElementById("truthBtn");
const dareBtn = document.getElementById("dareBtn");
const randomBtn = document.getElementById("randomBtn");
const mixBtn = document.getElementById("mixBtn");
const copyBtn = document.getElementById("copyBtn");
const typeLabel = document.getElementById("typeLabel");
const question = document.getElementById("question");
const notice = document.getElementById("notice");

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function updateMode(mode) {
  currentMode = mode;
  truthBtn.classList.toggle("active", mode === "truth");
  dareBtn.classList.toggle("active", mode === "dare");
  showQuestion();
}

function showQuestion() {
  notice.textContent = "";

  if (currentMode === "truth") {
    typeLabel.textContent = "TRUTH";
    question.textContent = randomItem(truthQuestions);
  } else {
    typeLabel.textContent = "DARE";
    question.textContent = randomItem(dareQuestions);
  }
}

truthBtn.addEventListener("click", () => updateMode("truth"));
dareBtn.addEventListener("click", () => updateMode("dare"));
randomBtn.addEventListener("click", showQuestion);

mixBtn.addEventListener("click", () => {
  const mode = Math.random() > 0.5 ? "truth" : "dare";
  updateMode(mode);
});

copyBtn.addEventListener("click", async () => {
  const text = `${typeLabel.textContent}: ${question.textContent}`;

  try {
    await navigator.clipboard.writeText(text);
    notice.textContent = "Đã copy câu hỏi!";
  } catch {
    notice.textContent = "Không thể copy trên trình duyệt này.";
  }
});
