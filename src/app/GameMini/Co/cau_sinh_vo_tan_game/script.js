const scenarios = [
  {
    title: "Màn 1: Tiếng gọi sau lưng",
    text: "Bạn đang đi trên cây cầu đá. Phía sau vang lên giọng mẹ bạn gọi tên. Luật đầu tiên hiện trên lan can: “Không được quay đầu khi người thân gọi.”",
    choices: [
      "Quay lại nhìn vì đó có thể là mẹ thật.",
      "Đứng yên và hỏi lớn: “Ai đó?”",
      "Bịt tai, nhìn thẳng về phía trước và tiếp tục bước.",
      "Chạy ngược lại để tìm nguồn âm thanh.",
      "Nhảy khỏi cầu để thoát khỏi giọng nói."
    ],
    correct: 2,
    death: "Bạn vừa quay đầu. Khuôn mặt sau lưng không có mắt, nhưng nó vẫn mỉm cười với bạn."
  },
  {
    title: "Màn 2: Người bán đèn lồng",
    text: "Một ông lão đưa bạn 5 chiếc đèn lồng. Ông nói chỉ một chiếc soi được đường sống. Luật trên mặt đất: “Đừng chọn ánh sáng ấm.”",
    choices: [
      "Chọn đèn lồng đỏ, ánh sáng rất ấm.",
      "Chọn đèn lồng vàng, nhìn an toàn nhất.",
      "Chọn đèn lồng trắng lạnh, ánh sáng yếu nhưng không ấm.",
      "Không chọn gì và đi trong bóng tối.",
      "Cướp cả 5 chiếc đèn rồi chạy."
    ],
    correct: 2,
    death: "Ánh sáng ấm không soi đường. Nó soi thứ đang bám trên vai bạn."
  },
  {
    title: "Màn 3: Bữa cơm lúc nửa đêm",
    text: "Một căn nhà xuất hiện giữa cầu. Trên bàn có 5 món ăn. Tờ giấy ghi: “Ăn thứ không có mùi, đừng cảm ơn chủ nhà.”",
    choices: [
      "Ăn bát canh thơm mùi hành.",
      "Ăn miếng thịt nướng nóng hổi.",
      "Ăn chén cơm trắng nguội không có mùi.",
      "Cúi đầu cảm ơn rồi mới ăn.",
      "Không ăn gì vì sợ độc."
    ],
    correct: 2,
    death: "Bạn đã phá luật. Chủ nhà kéo ghế ngồi xuống, nhưng ghế đối diện vốn trống rỗng."
  },
  {
    title: "Màn 4: Trạm soát vé",
    text: "Một cô gái mặc đồng phục yêu cầu bạn xuất trình vé. Bạn không có vé. Trên tường ghi: “Kẻ sống không mua vé bằng tiền.”",
    choices: [
      "Đưa tiền thật cho cô gái.",
      "Nói mình quên vé ở nhà.",
      "Đưa một sợi tóc của mình và im lặng.",
      "Đẩy cô gái ra rồi chạy qua cổng.",
      "Xin cô ấy tha mạng."
    ],
    correct: 2,
    death: "Cô gái nhận tiền rồi xé đôi bạn như xé một tấm vé giấy."
  },
  {
    title: "Màn 5: Cửa cuối cùng",
    text: "Năm cánh cửa hiện ra. Trên trần nhỏ máu thành chữ: “Cửa thật không muốn được chọn.”",
    choices: [
      "Chọn cửa đang phát sáng.",
      "Chọn cửa có tiếng người cầu cứu.",
      "Chọn cửa sạch sẽ nhất.",
      "Chọn cửa cũ kỹ đang tự khép lại như muốn tránh bạn.",
      "Chọn cửa có chữ LỐI RA."
    ],
    correct: 3,
    death: "Cánh cửa mở ra một cái miệng. Bạn không bước vào cửa. Bạn bị nuốt vào cổ họng của nó."
  }
];

let current = 0;

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const deathScreen = document.getElementById("death-screen");
const winScreen = document.getElementById("win-screen");

const startBtn = document.getElementById("start-btn");
const retryBtn = document.getElementById("retry-btn");
const againBtn = document.getElementById("again-btn");

const levelLabel = document.getElementById("level-label");
const titleEl = document.getElementById("scenario-title");
const textEl = document.getElementById("scenario-text");
const choicesEl = document.getElementById("choices");
const messageEl = document.getElementById("message");
const deathReason = document.getElementById("death-reason");

function showOnly(screen) {
  [startScreen, gameScreen, deathScreen, winScreen].forEach(s => s.classList.add("hidden"));
  screen.classList.remove("hidden");
}

function startGame() {
  current = 0;
  showOnly(gameScreen);
  renderScenario();
}

function renderScenario() {
  const s = scenarios[current];
  levelLabel.textContent = `Tầng ${current + 1}/${scenarios.length}`;
  titleEl.textContent = s.title;
  textEl.textContent = s.text;
  choicesEl.innerHTML = "";
  messageEl.classList.add("hidden");
  messageEl.textContent = "";

  s.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = `${index + 1}. ${choice}`;
    btn.onclick = () => choose(index, btn);
    choicesEl.appendChild(btn);
  });
}

function choose(index, clickedBtn) {
  const s = scenarios[current];
  const allButtons = document.querySelectorAll(".choice-btn");
  allButtons.forEach(btn => btn.disabled = true);

  if (index === s.correct) {
    clickedBtn.classList.add("correct");
    messageEl.classList.remove("hidden");
    messageEl.textContent = "Đúng. Bạn sống sót qua tình huống này... nhưng cây cầu vẫn chưa kết thúc.";

    setTimeout(() => {
      current++;
      if (current >= scenarios.length) {
        showOnly(winScreen);
      } else {
        renderScenario();
      }
    }, 1300);
  } else {
    clickedBtn.classList.add("wrong");
    allButtons[s.correct].classList.add("correct");

    setTimeout(() => {
      deathReason.textContent = s.death;
      showOnly(deathScreen);
    }, 1200);
  }
}

startBtn.addEventListener("click", startGame);
retryBtn.addEventListener("click", startGame);
againBtn.addEventListener("click", startGame);
