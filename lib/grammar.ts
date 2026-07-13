export type GrammarTopicId =
  | "tenses"
  | "sentence-structure"
  | "modals"
  | "relative-clauses"
  | "passive-voice"
  | "comparisons";

export type GrammarExample = {
  note?: string;
  text: string;
  translation?: string;
};

export type GrammarLearnBlock = {
  examples: GrammarExample[];
  points: string[];
  title: string;
};

export type TenseItem = {
  example: string;
  formula: string;
  name: string;
  signal: string;
  use: string;
};

export type GrammarLesson = {
  description: string;
  href: string;
  id: GrammarTopicId;
  label: string;
  learnBlocks: GrammarLearnBlock[];
  shortLabel: string;
  testDataFile: string;
  tenseItems?: TenseItem[];
};

const tenses: TenseItem[] = [
  {
    example: "I study English every day.",
    formula: "S + V(s/es)",
    name: "Present Simple",
    signal: "always, usually, every day",
    use: "Thói quen, sự thật, lịch trình cố định.",
  },
  {
    example: "She is studying now.",
    formula: "S + am/is/are + V-ing",
    name: "Present Continuous",
    signal: "now, at the moment, currently",
    use: "Hành động đang xảy ra hoặc kế hoạch gần.",
  },
  {
    example: "He has finished his homework.",
    formula: "S + have/has + V3",
    name: "Present Perfect",
    signal: "already, yet, just, since, for",
    use: "Hành động đã xảy ra và còn liên quan hiện tại.",
  },
  {
    example: "They have been working for two hours.",
    formula: "S + have/has been + V-ing",
    name: "Present Perfect Continuous",
    signal: "for, since, all morning",
    use: "Nhấn mạnh quá trình kéo dài đến hiện tại.",
  },
  {
    example: "We visited Hue last summer.",
    formula: "S + V2/ed",
    name: "Past Simple",
    signal: "yesterday, last, ago, in 2020",
    use: "Hành động đã kết thúc trong quá khứ.",
  },
  {
    example: "I was reading when you called.",
    formula: "S + was/were + V-ing",
    name: "Past Continuous",
    signal: "while, when, at 8 p.m. yesterday",
    use: "Hành động đang diễn ra tại một thời điểm quá khứ.",
  },
  {
    example: "She had left before I arrived.",
    formula: "S + had + V3",
    name: "Past Perfect",
    signal: "before, after, by the time",
    use: "Hành động xảy ra trước một mốc quá khứ khác.",
  },
  {
    example: "He had been waiting for an hour before the bus came.",
    formula: "S + had been + V-ing",
    name: "Past Perfect Continuous",
    signal: "for, since, before",
    use: "Nhấn mạnh quá trình trước một mốc quá khứ.",
  },
  {
    example: "I will call you tonight.",
    formula: "S + will + V",
    name: "Future Simple",
    signal: "tomorrow, tonight, next week",
    use: "Quyết định tức thời, dự đoán, lời hứa.",
  },
  {
    example: "This time tomorrow, I will be flying to Hanoi.",
    formula: "S + will be + V-ing",
    name: "Future Continuous",
    signal: "this time tomorrow, at 9 a.m. tomorrow",
    use: "Hành động sẽ đang diễn ra tại một thời điểm tương lai.",
  },
  {
    example: "By next month, we will have completed the course.",
    formula: "S + will have + V3",
    name: "Future Perfect",
    signal: "by, by the time, before",
    use: "Hành động sẽ hoàn tất trước một mốc tương lai.",
  },
  {
    example: "By June, she will have been teaching for ten years.",
    formula: "S + will have been + V-ing",
    name: "Future Perfect Continuous",
    signal: "for, since, by",
    use: "Nhấn mạnh quá trình kéo dài đến một mốc tương lai.",
  },
];

export const grammarLessons: GrammarLesson[] = [
  {
    description: "Route học riêng về 12 thì tiếng Anh với công thức, dấu hiệu và ví dụ mẫu.",
    href: "/grammar/tenses",
    id: "tenses",
    label: "12 thì tiếng Anh",
    shortLabel: "Thì",
    tenseItems: tenses,
    testDataFile: "data/grammar-tests/tenses.json",
    learnBlocks: [
      {
        title: "Cách học 12 thì",
        points: [
          "Nhìn dấu hiệu thời gian trước, sau đó xác định mốc hiện tại, quá khứ hoặc tương lai.",
          "Tách thì đơn, tiếp diễn, hoàn thành và hoàn thành tiếp diễn theo mục đích diễn đạt.",
          "Khi làm bài, kiểm tra chủ ngữ để chia động từ đúng số ít/số nhiều.",
        ],
        examples: [
          {
            text: "I have lived here for five years.",
            translation: "Tôi đã sống ở đây được năm năm.",
            note: "For five years cho thấy hành động bắt đầu trong quá khứ và còn kéo dài đến hiện tại.",
          },
        ],
      },
    ],
  },
  {
    description: "Học trật tự câu, thành phần câu và các mẫu câu nền tảng.",
    href: "/grammar/sentence-structure",
    id: "sentence-structure",
    label: "Cấu trúc câu",
    shortLabel: "Cấu trúc",
    testDataFile: "data/grammar-tests/sentence-structure.json",
    learnBlocks: [
      {
        title: "Mẫu câu cơ bản",
        points: [
          "S + V: câu có chủ ngữ và động từ chính.",
          "S + V + O: câu có tân ngữ đứng sau động từ.",
          "S + linking verb + complement: dùng với be, seem, become, feel.",
        ],
        examples: [
          { text: "She smiled.", translation: "Cô ấy mỉm cười." },
          { text: "The teacher explained the rule.", translation: "Giáo viên giải thích quy tắc." },
          { text: "This exercise is useful.", translation: "Bài tập này hữu ích." },
        ],
      },
      {
        title: "Lỗi hay gặp",
        points: [
          "Không đảo vị trí tân ngữ lên trước động từ trong câu khẳng định thường.",
          "Không bỏ động từ chính trong câu tiếng Anh.",
          "Trạng từ thường đứng sau tân ngữ hoặc trước động từ chính tùy loại trạng từ.",
        ],
        examples: [
          {
            text: "The student answered the question carefully.",
            translation: "Học sinh trả lời câu hỏi một cách cẩn thận.",
          },
        ],
      },
    ],
  },
  {
    description: "Học modal verbs như can, could, should, must, may, might.",
    href: "/grammar/modals",
    id: "modals",
    label: "Modal verbs",
    shortLabel: "Modal",
    testDataFile: "data/grammar-tests/modals.json",
    learnBlocks: [
      {
        title: "Nghĩa chính của modal",
        points: [
          "Can/could: khả năng, xin phép, đề nghị lịch sự.",
          "Should: lời khuyên hoặc điều nên làm.",
          "Must/have to: sự bắt buộc; must thường mạnh hơn và mang tính cá nhân/quy định rõ.",
          "May/might: khả năng xảy ra nhưng chưa chắc chắn.",
        ],
        examples: [
          { text: "You should review your notes.", translation: "Bạn nên ôn lại ghi chú." },
          { text: "Visitors must wear a helmet.", translation: "Khách tham quan phải đội mũ bảo hộ." },
          { text: "It might rain tonight.", translation: "Tối nay có thể mưa." },
        ],
      },
    ],
  },
  {
    description: "Học who, which, that, where, whose và cách rút gọn mệnh đề quan hệ.",
    href: "/grammar/relative-clauses",
    id: "relative-clauses",
    label: "Mệnh đề quan hệ",
    shortLabel: "Quan hệ",
    testDataFile: "data/grammar-tests/relative-clauses.json",
    learnBlocks: [
      {
        title: "Đại từ quan hệ",
        points: [
          "Who dùng cho người, thường làm chủ ngữ hoặc tân ngữ.",
          "Which dùng cho vật hoặc sự việc.",
          "That có thể thay who/which trong mệnh đề xác định.",
          "Where dùng cho nơi chốn; whose chỉ sự sở hữu.",
        ],
        examples: [
          { text: "The student who won the prize is in my class.", translation: "Học sinh giành giải đang học lớp tôi." },
          { text: "This is the book that helped me write better.", translation: "Đây là cuốn sách giúp tôi viết tốt hơn." },
          { text: "That is the cafe where we first met.", translation: "Đó là quán cà phê nơi chúng tôi gặp nhau lần đầu." },
        ],
      },
    ],
  },
  {
    description: "Học cách chuyển câu chủ động sang bị động theo thì.",
    href: "/grammar/passive-voice",
    id: "passive-voice",
    label: "Câu bị động",
    shortLabel: "Bị động",
    testDataFile: "data/grammar-tests/passive-voice.json",
    learnBlocks: [
      {
        title: "Công thức nền tảng",
        points: [
          "Object của câu chủ động trở thành subject của câu bị động.",
          "Dùng be theo đúng thì + past participle.",
          "By + agent chỉ dùng khi người thực hiện quan trọng hoặc cần làm rõ.",
        ],
        examples: [
          { text: "Minh wrote the report. -> The report was written by Minh.", translation: "Minh viết báo cáo. -> Báo cáo được viết bởi Minh." },
          { text: "They check all answers. -> All answers are checked.", translation: "Họ kiểm tra tất cả đáp án. -> Tất cả đáp án được kiểm tra." },
          { text: "Someone has repaired the computer. -> The computer has been repaired.", translation: "Ai đó đã sửa máy tính. -> Máy tính đã được sửa." },
        ],
      },
    ],
  },
  {
    description: "Học so sánh hơn, so sánh nhất và so sánh ngang bằng.",
    href: "/grammar/comparisons",
    id: "comparisons",
    label: "So sánh",
    shortLabel: "So sánh",
    testDataFile: "data/grammar-tests/comparisons.json",
    learnBlocks: [
      {
        title: "Ba mẫu so sánh chính",
        points: [
          "So sánh ngang bằng: as + adjective/adverb + as.",
          "So sánh hơn tính từ ngắn: adjective-er + than.",
          "So sánh hơn tính từ dài: more + adjective + than.",
          "So sánh nhất: the + adjective-est hoặc the most + adjective.",
        ],
        examples: [
          { text: "This lesson is as useful as the previous one.", translation: "Bài này hữu ích như bài trước." },
          { text: "This test is easier than that test.", translation: "Bài kiểm tra này dễ hơn bài kia." },
          { text: "Grammar is more important than it looks.", translation: "Ngữ pháp quan trọng hơn vẻ ngoài của nó." },
          { text: "This is the most difficult question.", translation: "Đây là câu hỏi khó nhất." },
        ],
      },
    ],
  },
];

export function getGrammarLesson(topicId: string) {
  return grammarLessons.find((lesson) => lesson.id === topicId) || null;
}
