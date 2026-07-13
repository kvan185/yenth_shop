"use client";

import Link from "next/link";
import { useState } from "react";
import type { GrammarLesson } from "../../lib/grammar";

type GrammarLessonClientProps = {
  lesson: GrammarLesson;
};

export default function GrammarLessonClient({ lesson }: GrammarLessonClientProps) {
  const [openId, setOpenId] = useState("");
  const isTensesLesson = Boolean(lesson.tenseItems);

  function togglePanel(panelId: string) {
    setOpenId((current) => (current === panelId ? "" : panelId));
  }

  return (
    <main className={`grammarLessonPage ${isTensesLesson ? "tensesLessonPage" : ""}`}>
      <header className="grammarLessonHero">
        <div>
          <p className="homeEyebrow">Grammar / {lesson.shortLabel}</p>
          <h1>{lesson.label}</h1>
          <p>{lesson.description}</p>
          {isTensesLesson ? (
            <div className="tensesHeroStats" aria-label="Tổng quan 12 thì">
              <span>
                <strong>12</strong>
                thì
              </span>
              <span>
                <strong>3</strong>
                mốc thời gian
              </span>
              <span>
                <strong>4</strong>
                nhóm cấu trúc
              </span>
            </div>
          ) : null}
        </div>

        <aside className="grammarLessonNav" aria-label="Điều hướng bài học">
          <a href="#learn">Học</a>
          <a href="#test">Kiểm tra</a>
          <Link href="/grammar">Tất cả chủ điểm</Link>
        </aside>
      </header>

      <section className="grammarLessonSection" id="learn">
        <div className="sectionHead">
          <span>Phần 1</span>
          <h2>Chọn mục muốn học</h2>
        </div>

        {lesson.tenseItems ? (
          <div className="grammarAccordion" aria-label="12 thì tiếng Anh">
            {lesson.tenseItems.map((tense, index) => {
              const panelId = `tense-${index}`;
              const isOpen = openId === panelId;

              return (
                <article className={`grammarAccordionItem ${isOpen ? "open" : ""}`} key={tense.name}>
                  <button
                    aria-expanded={isOpen}
                    className="grammarAccordionTrigger"
                    type="button"
                    onClick={() => togglePanel(panelId)}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>
                      {tense.name}
                      <em>{tense.signal}</em>
                    </strong>
                    <small>{tense.formula}</small>
                  </button>

                  {isOpen ? (
                    <div className="grammarAccordionBody">
                      <p>{tense.use}</p>
                      <dl>
                        <div>
                          <dt>Dấu hiệu</dt>
                          <dd>{tense.signal}</dd>
                        </div>
                        <div>
                          <dt>Ví dụ</dt>
                          <dd>{tense.example}</dd>
                        </div>
                      </dl>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        ) : null}

        <div className="grammarAccordion" aria-label="Lý thuyết bổ sung">
          {lesson.learnBlocks.map((block, index) => {
            const panelId = `block-${index}`;
            const isOpen = openId === panelId;

            return (
              <article className={`grammarAccordionItem ${isOpen ? "open" : ""}`} key={block.title}>
                <button
                  aria-expanded={isOpen}
                  className="grammarAccordionTrigger"
                  type="button"
                  onClick={() => togglePanel(panelId)}
                >
                  <span>{lesson.tenseItems ? "Ghi chú" : String(index + 1).padStart(2, "0")}</span>
                  <strong>{block.title}</strong>
                  <small>{isOpen ? "Đang mở" : "Bấm để xem"}</small>
                </button>

                {isOpen ? (
                  <div className="grammarAccordionBody">
                    <ul>
                      {block.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    <div className="grammarExampleList">
                      {block.examples.map((example) => (
                        <div key={example.text}>
                          <strong>{example.text}</strong>
                          {example.translation ? <span>{example.translation}</span> : null}
                          {example.note ? <p>{example.note}</p> : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>

      <section className="grammarLessonSection grammarTestSection" id="test">
        <div className="sectionHead">
          <span>Phần 2</span>
          <h2>Kiểm tra</h2>
        </div>
        <div className="grammarTestPlaceholder">
          <strong>Chưa có dữ liệu kiểm tra.</strong>
          <p>
            Khi bạn viết file JSON, phần này sẽ đọc câu hỏi từ{" "}
            <code>{lesson.testDataFile}</code>.
          </p>
        </div>
      </section>
    </main>
  );
}
