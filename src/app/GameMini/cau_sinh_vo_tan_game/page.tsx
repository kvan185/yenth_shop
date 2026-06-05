"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

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

export default function CauSinhVoTanGame() {
  const [screen, setScreen] = useState<"start" | "game" | "death" | "win">("start");
  const [current, setCurrent] = useState(0);
  const [message, setMessage] = useState("");
  const [deathReason, setDeathReason] = useState("");
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);

  const s = scenarios[current];

  const startGame = () => {
    setCurrent(0);
    setScreen("game");
    setMessage("");
    setSelectedChoice(null);
    setLocked(false);
  };

  const choose = (index: number) => {
    if (locked) return;
    setLocked(true);
    setSelectedChoice(index);

    if (index === s.correct) {
      setMessage("Đúng. Bạn sống sót qua tình huống này... nhưng cây cầu vẫn chưa kết thúc.");
      setTimeout(() => {
        if (current + 1 >= scenarios.length) {
          setScreen("win");
        } else {
          setCurrent((c) => c + 1);
          setMessage("");
          setSelectedChoice(null);
          setLocked(false);
        }
      }, 1300);
    } else {
      setTimeout(() => {
        setDeathReason(s.death);
        setScreen("death");
      }, 1200);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.fog}></div>

      <Link href="/GameMini" className="absolute top-4 left-4 z-10 bg-black/50 text-white px-4 py-2 rounded-full hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all">
        &larr; Về trang chủ
      </Link>

      <main className={styles.gameShell}>
        {screen === "start" && (
          <section className={styles.card}>
            <p className={styles.eyebrow}>Mini web game kinh dị sinh tồn</p>
            <h1 className={styles.h1}>Cầu Sinh Vô Tận</h1>
            <p className={styles.subtitle}>
              Bạn tỉnh dậy trên một cây cầu không có điểm kết thúc. Mỗi tình huống có 5 đáp án,
              chỉ một đáp án đúng. Chọn sai, bạn chết.
            </p>
            <button onClick={startGame} className={styles.primaryBtn}>Bắt đầu sinh tồn</button>
          </section>
        )}

        {screen === "game" && s && (
          <section className={styles.card}>
            <div className={styles.topbar}>
              <span>Tầng {current + 1}/{scenarios.length}</span>
              <span>Linh hồn: 1</span>
            </div>

            <h2 className={styles.h2}>{s.title}</h2>
            <p className={styles.scenarioText}>{s.text}</p>

            <div className={styles.choices}>
              {s.choices.map((choice, index) => {
                let btnClass = styles.choiceBtn;
                if (locked) {
                  if (index === s.correct) {
                    btnClass += ` ${styles.correct}`;
                  } else if (index === selectedChoice && index !== s.correct) {
                    btnClass += ` ${styles.wrong}`;
                  }
                }

                return (
                  <button
                    key={index}
                    disabled={locked}
                    onClick={() => choose(index)}
                    className={btnClass}
                  >
                    {index + 1}. {choice}
                  </button>
                );
              })}
            </div>

            {message && <div className={styles.message}>{message}</div>}
          </section>
        )}

        {screen === "death" && (
          <section className={`${styles.card} ${styles.danger}`}>
            <h1 className={styles.h1}>Bạn đã chết</h1>
            <p className={styles.scenarioText}>{deathReason}</p>
            <button onClick={startGame} className={styles.primaryBtn}>Chơi lại từ đầu</button>
          </section>
        )}

        {screen === "win" && (
          <section className={`${styles.card} ${styles.success}`}>
            <h1 className={styles.h1}>Bạn đã sống sót</h1>
            <p className={styles.scenarioText}>
              Cây cầu phía sau sụp xuống. Trước mặt bạn là bình minh lạnh ngắt.
              Nhưng dưới chân, một dòng chữ mới hiện ra: “Lần sau sẽ khó hơn.”
            </p>
            <button onClick={startGame} className={styles.primaryBtn}>Chơi lại</button>
          </section>
        )}
      </main>
    </div>
  );
}
