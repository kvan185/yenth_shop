Nếu mục tiêu của bạn là làm **một website học tiếng Anh lâu dài**, có thể phát triển thành app sau này, thì mình khuyên nên thiết kế theo hướng **Duolingo + Mochi + Anki + Quizlet**. Tức là học từng bài, luyện tập, ôn tập theo SRS và thống kê tiến độ.

## Sitemap tổng thể

```text
/
├── Dashboard
├── Learn
│   ├── Vocabulary
│   ├── Grammar
│   ├── Listening
│   ├── Reading
│   ├── Speaking
│   └── Writing
├── Practice
│   ├── Flashcards
│   ├── Multiple Choice
│   ├── Fill in Blank
│   ├── Matching
│   ├── Dictation
│   ├── Sentence Building
│   └── Shadowing
├── Review
│   ├── Today's Review
│   ├── Weak Words
│   ├── Mistakes
│   └── SRS Review
├── Dictionary
├── Collections
├── Exams
├── Progress
├── Leaderboard
├── Profile
└── Admin
```

---

# 1. Trang chủ

```
/
```

### Nội dung

* Chào người dùng
* Chuỗi học (Streak)
* Điểm EXP
* Hôm nay cần ôn bao nhiêu từ
* Tiến độ Level
* Continue Learning

Ví dụ

```
Good evening!

🔥 Streak: 15 days

Today's Goal
███████░░░ 70%

Need Review
32 words

Continue Learning
→ English 5000
```

---

# 2. Dashboard

```
/dashboard
```

Hiển thị

* Tổng số từ đã học
* Tổng số câu
* Listening time
* Speaking time
* Accuracy
* Calendar học

---

# 3. Học từ vựng

```
/learn/vocabulary
```

Danh sách khóa học

```
English 5000

A1
A2
B1
B2
C1

TOEIC

IELTS

Business

Travel

Food

Technology
```

---

# 4. Bài học từ vựng

```
/learn/vocabulary/:lessonId
```

Ví dụ

```
Lesson 12

apple

(noun)

quả táo

Example

I eat an apple every day.

Image

Audio

IPA

/ˈæpəl/
```

Có nút

```
Next

Previous

Mark Difficult

Favorite
```

---

# 5. Flashcard

```
/practice/flashcards
```

Hiệu ứng

```
Front

Apple

↓

Click

↓

Back

Quả táo

Example

Audio
```

Có

```
Again

Hard

Good

Easy
```

để tính SRS.

---

# 6. Trắc nghiệm

```
/practice/multiple-choice
```

Ví dụ

```
Apple nghĩa là gì?

○ Xe hơi

○ Quả táo

○ Cái bàn

○ Con mèo
```

---

# 7. Điền từ

```
/practice/fill-blank
```

```
I ____ an apple.

eat

eats

ate

eating
```

---

# 8. Ghép từ

```
/practice/matching
```

```
Apple      Quả táo

Chair      Ghế

Table      Bàn
```

Drag & Drop.

---

# 9. Dictation

```
/practice/dictation
```

Phát audio

```
"I eat breakfast."

↓

User gõ

I eat breakfast.
```

---

# 10. Sắp xếp câu

```
/practice/sentence-building
```

```
eat

I

apple

an

↓

I eat an apple.
```

---

# 11. Shadowing

```
/practice/shadowing
```

Audio phát

↓

Người dùng đọc lại

↓

AI chấm điểm phát âm.

---

# 12. Ôn tập

```
/review
```

Hiển thị

```
Today's Review

32 words

Start Review
```

---

# 13. Từ khó

```
/review/weak-words
```

Danh sách

```
apple

increase

improve

determine
```

---

# 14. Những câu sai

```
/review/mistakes
```

Lưu toàn bộ câu từng làm sai.

---

# 15. Dictionary

```
/dictionary
```

Search

```
apple
```

Hiển thị

```
IPA

Audio

Meaning

Example

Collocations

Synonyms

Antonyms

Phrasal verbs
```

---

# 16. Collections

```
/collections
```

Ví dụ

```
Animals

Food

Travel

Business

Movie

Programming

Love
```

---

# 17. Exams

```
/exams
```

```
TOEIC

IELTS

VSTEP

SAT

GRE
```

---

# 18. Progress

```
/progress
```

Biểu đồ

```
Words Learned

Accuracy

Listening

Speaking

Weekly EXP

Monthly EXP
```

---

# 19. Leaderboard

```
/leaderboard
```

```
Top EXP

Top Streak

Top Listening

Top Vocabulary
```

---

# 20. Profile

```
/profile
```

```
Avatar

Name

Level

EXP

Achievements

Settings
```

---

# 21. Achievement

```
/profile/achievements
```

Ví dụ

```
🔥 30 Day Streak

📚 1000 Words

🎧 20 Hours Listening

🏆 Perfect Quiz
```

---

# 22. Admin

```
/admin
```

Quản lý

* Vocabulary
* Lessons
* Grammar
* Users
* Statistics
* Exams
* Audio
* Images

---

# Cấu trúc khóa học

```
English 5000
    A1
        Lesson 1
        Lesson 2
        Lesson 3
    A2
    B1
```

Mỗi bài

```
20 từ

↓

Flashcard

↓

Quiz

↓

Fill Blank

↓

Matching

↓

Sentence

↓

Review
```

---

# Hệ thống dữ liệu nên có

```
Users

Lessons

Vocabulary

Grammar

Examples

Pronunciations

Images

Audio

Learning Progress

Review Schedule (SRS)

Quiz Results

Mistakes

Achievements

Daily Goals

Collections

Favorite Words
```

---

# Tính năng "ăn tiền" nên có

* ✅ Đăng nhập Google/GitHub.
* ✅ Đồng bộ tiến độ trên nhiều thiết bị.
* ✅ Hệ thống SRS (Spaced Repetition) để tự động nhắc ôn.
* ✅ AI giải thích nghĩa, ngữ pháp và sửa câu viết.
* ✅ AI chấm phát âm khi luyện Speaking.
* ✅ Tạo bài học từ video YouTube hoặc tài liệu do người dùng tải lên.
* ✅ Từ điển thông minh với ví dụ, collocations và cụm từ thông dụng.
* ✅ Thử thách hằng ngày (Daily Challenge) và hệ thống huy hiệu để tăng động lực học.

## Nếu phát triển bằng React + Node.js

Mình sẽ chia theo mô hình feature:

```text
src/
├── app/
├── pages/
│   ├── Dashboard/
│   ├── Learn/
│   ├── Practice/
│   ├── Review/
│   ├── Dictionary/
│   ├── Exams/
│   ├── Progress/
│   ├── Leaderboard/
│   ├── Profile/
│   └── Admin/
├── components/
├── features/
│   ├── vocabulary/
│   ├── grammar/
│   ├── flashcards/
│   ├── review/
│   ├── exams/
│   ├── progress/
│   └── auth/
├── services/
├── hooks/
├── utils/
└── assets/
```

Cấu trúc này đủ linh hoạt để mở rộng từ một website học cá nhân thành một nền tảng học tiếng Anh hoàn chỉnh với nhiều loại bài học, hệ thống ôn tập thông minh và theo dõi tiến độ người học.
