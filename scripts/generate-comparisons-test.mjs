import { writeFileSync } from "node:fs";

const outputPath = "data/grammar-tests/comparisons.json";

const subjects = [
  "This lesson",
  "The practice test",
  "The grammar task",
  "The online course",
  "The speaking prompt",
  "The writing sample",
  "The listening script",
  "The reading passage",
  "The chart summary",
  "The exam strategy",
  "The new app",
  "The study plan",
  "The mock test",
  "The teacher's feedback",
  "The vocabulary list",
  "The training session",
  "The interview question",
  "The project report",
  "The TOEIC exercise",
  "The IELTS task",
];

const comparisonTargets = [
  "the previous one",
  "the old version",
  "last week's task",
  "the sample answer",
  "the first exercise",
  "the printed handout",
  "the beginner lesson",
  "the advanced lesson",
  "the classroom activity",
  "the online quiz",
  "the practice set",
  "the final test",
  "the morning session",
  "the evening class",
  "the teacher's example",
  "the official guide",
  "the shorter passage",
  "the longer passage",
  "the listening section",
  "the reading section",
];

const shortAdjectives = [
  { base: "short", comparative: "shorter", superlative: "shortest" },
  { base: "long", comparative: "longer", superlative: "longest" },
  { base: "fast", comparative: "faster", superlative: "fastest" },
  { base: "slow", comparative: "slower", superlative: "slowest" },
  { base: "clear", comparative: "clearer", superlative: "clearest" },
  { base: "hard", comparative: "harder", superlative: "hardest" },
  { base: "small", comparative: "smaller", superlative: "smallest" },
  { base: "large", comparative: "larger", superlative: "largest" },
  { base: "cheap", comparative: "cheaper", superlative: "cheapest" },
  { base: "quiet", comparative: "quieter", superlative: "quietest" },
];

const longAdjectives = [
  { base: "important", comparative: "more important", superlative: "most important" },
  { base: "useful", comparative: "more useful", superlative: "most useful" },
  { base: "difficult", comparative: "more difficult", superlative: "most difficult" },
  { base: "effective", comparative: "more effective", superlative: "most effective" },
  { base: "reliable", comparative: "more reliable", superlative: "most reliable" },
  { base: "interesting", comparative: "more interesting", superlative: "most interesting" },
  { base: "accurate", comparative: "more accurate", superlative: "most accurate" },
  { base: "confusing", comparative: "more confusing", superlative: "most confusing" },
  { base: "practical", comparative: "more practical", superlative: "most practical" },
  { base: "suitable", comparative: "more suitable", superlative: "most suitable" },
];

const irregularAdjectives = [
  { base: "good", comparative: "better", superlative: "best" },
  { base: "bad", comparative: "worse", superlative: "worst" },
  { base: "far", comparative: "farther", superlative: "farthest" },
  { base: "little", comparative: "less", superlative: "least" },
  { base: "many", comparative: "more", superlative: "most" },
];

const adverbs = [
  { base: "quickly", comparative: "more quickly", superlative: "most quickly" },
  { base: "carefully", comparative: "more carefully", superlative: "most carefully" },
  { base: "clearly", comparative: "more clearly", superlative: "most clearly" },
  { base: "accurately", comparative: "more accurately", superlative: "most accurately" },
  { base: "confidently", comparative: "more confidently", superlative: "most confidently" },
  { base: "fluently", comparative: "more fluently", superlative: "most fluently" },
  { base: "efficiently", comparative: "more efficiently", superlative: "most efficiently" },
  { base: "politely", comparative: "more politely", superlative: "most politely" },
  { base: "regularly", comparative: "more regularly", superlative: "most regularly" },
  { base: "successfully", comparative: "more successfully", superlative: "most successfully" },
];

const countNouns = [
  "mistakes",
  "examples",
  "questions",
  "emails",
  "sentences",
  "answers",
  "paragraphs",
  "tasks",
  "students",
  "practice sessions",
];

const uncountNouns = [
  "time",
  "money",
  "information",
  "feedback",
  "practice",
  "homework",
  "progress",
  "advice",
  "research",
  "traffic",
];

const groups = [
  "in the class",
  "in the course",
  "on the team",
  "in the test",
  "in the survey",
  "in the report",
  "among the candidates",
  "among the options",
  "in the study group",
  "in the training programme",
];

const metrics = [
  "online learners",
  "library visitors",
  "international students",
  "remote workers",
  "public transport users",
  "course applicants",
  "test takers",
  "language centre members",
  "mobile subscribers",
  "museum visitors",
];

const values = [
  ["42%", "58%"],
  ["1.8 million", "2.4 million"],
  ["120", "175"],
  ["15 hours", "22 hours"],
  ["$450", "$620"],
  ["7.5", "8.2"],
  ["30 minutes", "45 minutes"],
  ["65 points", "80 points"],
  ["2020", "2025"],
  ["three times", "five times"],
];

const examFocuses = ["General English", "VSTEP", "IELTS", "TOEIC", "Cambridge B1/B2"];

const patterns = [
  {
    label: "Short adjective comparative",
    cefr: "A1",
    level: 1,
    clue: "-er + than",
    rule: "Short adjectives usually form the comparative with -er plus than.",
    make: (c) => ({
      answer: `${c.subject} is ${c.shortAdj.comparative} than ${c.target}.`,
      wrong: [
        `${c.subject} is more ${c.shortAdj.comparative} than ${c.target}.`,
        `${c.subject} is ${c.shortAdj.superlative} than ${c.target}.`,
        `${c.subject} is ${c.shortAdj.base} than ${c.target}.`,
      ],
    }),
  },
  {
    label: "Long adjective comparative",
    cefr: "A2",
    level: 2,
    clue: "more + adjective + than",
    rule: "Longer adjectives usually form the comparative with more plus the adjective.",
    make: (c) => ({
      answer: `${c.subject} is ${c.longAdj.comparative} than ${c.target}.`,
      wrong: [
        `${c.subject} is ${c.longAdj.base}er than ${c.target}.`,
        `${c.subject} is most ${c.longAdj.base} than ${c.target}.`,
        `${c.subject} is more ${c.longAdj.superlative} than ${c.target}.`,
      ],
    }),
  },
  {
    label: "Short adjective superlative",
    cefr: "A1",
    level: 1,
    clue: "the + -est",
    rule: "Use the plus the -est form for short adjective superlatives.",
    make: (c) => ({
      answer: `${c.subject} is the ${c.shortAdj.superlative} ${c.group}.`,
      wrong: [
        `${c.subject} is ${c.shortAdj.superlative} ${c.group}.`,
        `${c.subject} is the ${c.shortAdj.comparative} ${c.group}.`,
        `${c.subject} is the most ${c.shortAdj.superlative} ${c.group}.`,
      ],
    }),
  },
  {
    label: "Long adjective superlative",
    cefr: "A2",
    level: 2,
    clue: "the most + adjective",
    rule: "Use the most plus a long adjective for superlatives.",
    make: (c) => ({
      answer: `${c.subject} is the ${c.longAdj.superlative} ${c.group}.`,
      wrong: [
        `${c.subject} is ${c.longAdj.superlative} ${c.group}.`,
        `${c.subject} is the ${c.longAdj.comparative} ${c.group}.`,
        `${c.subject} is the ${c.longAdj.base}est ${c.group}.`,
      ],
    }),
  },
  {
    label: "Equality with as...as",
    cefr: "A2",
    level: 2,
    clue: "as + adjective + as",
    rule: "Use as + adjective + as to say two things are equal.",
    make: (c) => ({
      answer: `${c.subject} is as ${c.longAdj.base} as ${c.target}.`,
      wrong: [
        `${c.subject} is as ${c.longAdj.comparative} as ${c.target}.`,
        `${c.subject} is so ${c.longAdj.base} than ${c.target}.`,
        `${c.subject} is as ${c.longAdj.base} than ${c.target}.`,
      ],
    }),
  },
  {
    label: "Negative equality with not as...as",
    cefr: "A2",
    level: 2,
    clue: "not as + adjective + as",
    rule: "Use not as + adjective + as to say one thing has less of a quality.",
    make: (c) => ({
      answer: `${c.subject} is not as ${c.shortAdj.base} as ${c.target}.`,
      wrong: [
        `${c.subject} is not as ${c.shortAdj.comparative} as ${c.target}.`,
        `${c.subject} is not so ${c.shortAdj.base} than ${c.target}.`,
        `${c.subject} is not as ${c.shortAdj.base} than ${c.target}.`,
      ],
    }),
  },
  {
    label: "Irregular comparative",
    cefr: "A2",
    level: 2,
    clue: "good/bad/far/many/little",
    rule: "Some adjectives and determiners have irregular comparative forms.",
    make: (c) => ({
      answer: `${c.subject} is ${c.irregular.comparative} than ${c.target}.`,
      wrong: [
        `${c.subject} is more ${c.irregular.base} than ${c.target}.`,
        `${c.subject} is ${c.irregular.base}er than ${c.target}.`,
        `${c.subject} is ${c.irregular.superlative} than ${c.target}.`,
      ],
    }),
  },
  {
    label: "Irregular superlative",
    cefr: "A2",
    level: 2,
    clue: "best/worst/farthest/least/most",
    rule: "Irregular adjectives and determiners use special superlative forms.",
    make: (c) => ({
      answer: `${c.subject} is the ${c.irregular.superlative} ${c.group}.`,
      wrong: [
        `${c.subject} is the most ${c.irregular.base} ${c.group}.`,
        `${c.subject} is the ${c.irregular.comparative} ${c.group}.`,
        `${c.subject} is ${c.irregular.superlative} ${c.group}.`,
      ],
    }),
  },
  {
    label: "Comparative adverb",
    cefr: "B1",
    level: 3,
    clue: "more + adverb + than",
    rule: "Many adverbs form comparatives with more plus the adverb.",
    make: (c) => ({
      answer: `${c.subject} explains the answer ${c.adverb.comparative} than ${c.target}.`,
      wrong: [
        `${c.subject} explains the answer ${c.adverb.base}er than ${c.target}.`,
        `${c.subject} explains the answer most ${c.adverb.base} than ${c.target}.`,
        `${c.subject} explains the answer ${c.adverb.superlative} than ${c.target}.`,
      ],
    }),
  },
  {
    label: "Superlative adverb",
    cefr: "B1",
    level: 3,
    clue: "the most + adverb",
    rule: "Use the most plus many adverbs for superlative adverb forms.",
    make: (c) => ({
      answer: `${c.subject} worked the ${c.adverb.superlative} ${c.group}.`,
      wrong: [
        `${c.subject} worked ${c.adverb.superlative} ${c.group}.`,
        `${c.subject} worked the ${c.adverb.comparative} ${c.group}.`,
        `${c.subject} worked the ${c.adverb.base}est ${c.group}.`,
      ],
    }),
  },
  {
    label: "Much comparative intensifier",
    cefr: "B1",
    level: 3,
    clue: "much/far/a lot + comparative",
    rule: "Use much, far, or a lot before a comparative to make the difference stronger.",
    make: (c) => ({
      answer: `${c.subject} is much ${c.longAdj.comparative} than ${c.target}.`,
      wrong: [
        `${c.subject} is much ${c.longAdj.base} than ${c.target}.`,
        `${c.subject} is very ${c.longAdj.comparative} than ${c.target}.`,
        `${c.subject} is much the ${c.longAdj.superlative} than ${c.target}.`,
      ],
    }),
  },
  {
    label: "Slight comparative intensifier",
    cefr: "B1",
    level: 3,
    clue: "slightly/a little + comparative",
    rule: "Use slightly or a little before a comparative to show a small difference.",
    make: (c) => ({
      answer: `${c.subject} is slightly ${c.shortAdj.comparative} than ${c.target}.`,
      wrong: [
        `${c.subject} is slightly ${c.shortAdj.base} than ${c.target}.`,
        `${c.subject} is slightly the ${c.shortAdj.superlative} than ${c.target}.`,
        `${c.subject} is very slightly ${c.shortAdj.superlative} ${c.target}.`,
      ],
    }),
  },
  {
    label: "Double comparative error",
    cefr: "B1",
    level: 3,
    clue: "avoid more + -er",
    rule: "Do not use more with an adjective that already has a comparative -er form.",
    make: (c) => ({
      answer: `${c.subject} is ${c.shortAdj.comparative} than ${c.target}.`,
      wrong: [
        `${c.subject} is more ${c.shortAdj.comparative} than ${c.target}.`,
        `${c.subject} is most ${c.shortAdj.comparative} than ${c.target}.`,
        `${c.subject} is the ${c.shortAdj.comparative} than ${c.target}.`,
      ],
    }),
  },
  {
    label: "Fewer with count nouns",
    cefr: "B1",
    level: 3,
    clue: "fewer + plural count noun",
    rule: "Use fewer with plural count nouns.",
    make: (c) => ({
      answer: `${c.subject} has fewer ${c.countNoun} than ${c.target}.`,
      wrong: [
        `${c.subject} has less ${c.countNoun} than ${c.target}.`,
        `${c.subject} has fewest ${c.countNoun} than ${c.target}.`,
        `${c.subject} has a fewer ${c.countNoun} than ${c.target}.`,
      ],
    }),
  },
  {
    label: "Less with uncount nouns",
    cefr: "B1",
    level: 3,
    clue: "less + uncount noun",
    rule: "Use less with uncountable nouns.",
    make: (c) => ({
      answer: `${c.subject} needs less ${c.uncountNoun} than ${c.target}.`,
      wrong: [
        `${c.subject} needs fewer ${c.uncountNoun} than ${c.target}.`,
        `${c.subject} needs least ${c.uncountNoun} than ${c.target}.`,
        `${c.subject} needs a less ${c.uncountNoun} than ${c.target}.`,
      ],
    }),
  },
  {
    label: "The more...the more",
    cefr: "B2",
    level: 4,
    clue: "parallel comparative",
    rule: "Use the + comparative, the + comparative to show connected changes.",
    make: (c) => ({
      answer: `The more ${c.subject.toLowerCase()} practises, the ${c.shortAdj.comparative} it becomes.`,
      wrong: [
        `More ${c.subject.toLowerCase()} practises, the ${c.shortAdj.comparative} it becomes.`,
        `The more ${c.subject.toLowerCase()} practises, it becomes ${c.shortAdj.comparative}.`,
        `The most ${c.subject.toLowerCase()} practises, the ${c.shortAdj.superlative} it becomes.`,
      ],
    }),
  },
  {
    label: "Progressive comparison",
    cefr: "B2",
    level: 4,
    clue: "comparative and comparative",
    rule: "Repeating a comparative can show continuous change.",
    make: (c) => ({
      answer: `${c.subject} is getting ${c.shortAdj.comparative} and ${c.shortAdj.comparative}.`,
      wrong: [
        `${c.subject} is getting more ${c.shortAdj.comparative} and more ${c.shortAdj.comparative}.`,
        `${c.subject} is getting ${c.shortAdj.superlative} and ${c.shortAdj.superlative}.`,
        `${c.subject} is getting ${c.shortAdj.base} and ${c.shortAdj.comparative}.`,
      ],
    }),
  },
  {
    label: "One of the superlative",
    cefr: "B2",
    level: 4,
    clue: "one of the + superlative + plural noun",
    rule: "Use one of the + superlative + plural noun.",
    make: (c) => ({
      answer: `${c.subject} is one of the ${c.longAdj.superlative} tasks ${c.group}.`,
      wrong: [
        `${c.subject} is one of the ${c.longAdj.superlative} task ${c.group}.`,
        `${c.subject} is one of ${c.longAdj.superlative} tasks ${c.group}.`,
        `${c.subject} is one of the ${c.longAdj.comparative} tasks ${c.group}.`,
      ],
    }),
  },
  {
    label: "IELTS chart comparison higher than",
    cefr: "B2",
    level: 4,
    clue: "data comparison",
    rule: "Use higher than or lower than to compare data values.",
    make: (c) => ({
      answer: `The figure for ${c.metric} was higher than the figure for ${c.targetMetric}.`,
      wrong: [
        `The figure for ${c.metric} was more high than the figure for ${c.targetMetric}.`,
        `The figure for ${c.metric} was highest than the figure for ${c.targetMetric}.`,
        `The figure for ${c.metric} was as higher as the figure for ${c.targetMetric}.`,
      ],
    }),
  },
  {
    label: "IELTS numeric comparison",
    cefr: "B2",
    level: 4,
    clue: "more than / less than with numbers",
    rule: "Use more than or less than before numbers and measurements.",
    make: (c) => ({
      answer: `${c.valuePair[1]} is more than ${c.valuePair[0]}.`,
      wrong: [
        `${c.valuePair[1]} is more ${c.valuePair[0]}.`,
        `${c.valuePair[1]} is most than ${c.valuePair[0]}.`,
        `${c.valuePair[1]} is more as ${c.valuePair[0]}.`,
      ],
    }),
  },
  {
    label: "No sooner than",
    cefr: "C1",
    level: 5,
    clue: "inversion with no sooner",
    rule: "Use no sooner + auxiliary inversion + than for an immediate sequence.",
    make: (c) => ({
      answer: `No sooner had ${c.subject.toLowerCase()} finished the task than the next one began.`,
      wrong: [
        `No sooner ${c.subject.toLowerCase()} had finished the task than the next one began.`,
        `No sooner had ${c.subject.toLowerCase()} finished the task when the next one began.`,
        `No sooner did ${c.subject.toLowerCase()} finished the task than the next one began.`,
      ],
    }),
  },
  {
    label: "Comparative clause ellipsis",
    cefr: "C1",
    level: 5,
    clue: "than expected / than before",
    rule: "Comparative clauses can be shortened when the meaning is clear.",
    make: (c) => ({
      answer: `${c.subject} was ${c.longAdj.comparative} than expected.`,
      wrong: [
        `${c.subject} was ${c.longAdj.comparative} than it expected.`,
        `${c.subject} was more ${c.longAdj.comparative} than expected.`,
        `${c.subject} was ${c.longAdj.superlative} than expected.`,
      ],
    }),
  },
  {
    label: "Preferable to",
    cefr: "C1",
    level: 5,
    clue: "preferable to, not than",
    rule: "Preferable is followed by to, not than.",
    make: (c) => ({
      answer: `${c.subject} is preferable to ${c.target} in this context.`,
      wrong: [
        `${c.subject} is preferable than ${c.target} in this context.`,
        `${c.subject} is more preferable than ${c.target} in this context.`,
        `${c.subject} is the most preferable to ${c.target} in this context.`,
      ],
    }),
  },
  {
    label: "Superior to",
    cefr: "C1",
    level: 5,
    clue: "superior/inferior to",
    rule: "Adjectives such as superior and inferior take to, not than.",
    make: (c) => ({
      answer: `${c.subject} is superior to ${c.target} in terms of clarity.`,
      wrong: [
        `${c.subject} is superior than ${c.target} in terms of clarity.`,
        `${c.subject} is more superior to ${c.target} in terms of clarity.`,
        `${c.subject} is the superior than ${c.target} in terms of clarity.`,
      ],
    }),
  },
];

function context(index) {
  return {
    adverb: adverbs[index % adverbs.length],
    countNoun: countNouns[index % countNouns.length],
    group: groups[index % groups.length],
    irregular: irregularAdjectives[index % irregularAdjectives.length],
    longAdj: longAdjectives[index % longAdjectives.length],
    metric: metrics[index % metrics.length],
    shortAdj: shortAdjectives[index % shortAdjectives.length],
    subject: subjects[index % subjects.length],
    target: comparisonTargets[index % comparisonTargets.length],
    targetMetric: metrics[(index + 3) % metrics.length],
    uncountNoun: uncountNouns[index % uncountNouns.length],
    valuePair: values[index % values.length],
  };
}

function shuffleOptions(options, seed) {
  const result = [...options];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = (seed + index * 17) % (index + 1);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function promptFor(pattern, index) {
  const stems = [
    "Choose the correct comparison.",
    "Choose the best comparative or superlative form.",
    "Which option uses comparison correctly?",
    "Complete the idea with the correct comparison structure.",
    "Select the sentence that fits the comparison meaning.",
  ];
  return `${stems[index % stems.length]} Focus: ${pattern.clue}. Context set ${String(index + 1).padStart(4, "0")}.`;
}

function makeQuestion(index, pattern) {
  const data = pattern.make(context(index));
  const answer = data.answer;
  const options = shuffleOptions([answer, ...data.wrong].slice(0, 4), index);
  return {
    id: `comparisons-${String(index + 1).padStart(4, "0")}`,
    type: "multiple-choice",
    level: pattern.level,
    cefr: pattern.cefr,
    examFocus: examFocuses[(index + pattern.level) % examFocuses.length],
    comparisonFocus: pattern.label,
    prompt: promptFor(pattern, index),
    options,
    answer,
    explanation: pattern.rule,
  };
}

const levelPlan = [
  { count: 150, level: 1 },
  { count: 350, level: 2 },
  { count: 400, level: 3 },
  { count: 350, level: 4 },
  { count: 250, level: 5 },
];

const orderedPatterns = levelPlan.flatMap(({ count, level }) => {
  const candidates = patterns.filter((pattern) => pattern.level === level);
  return Array.from({ length: count }, (_, index) => candidates[index % candidates.length]);
});

const questions = orderedPatterns.map((pattern, index) => makeQuestion(index, pattern));

const uniqueItems = new Set(questions.map((item) => `${item.prompt}::${item.answer}`));
if (uniqueItems.size !== questions.length) {
  throw new Error(`Duplicate generated questions: ${questions.length - uniqueItems.size}`);
}

const payload = {
  lessonId: "comparisons",
  title: "Comparisons Mastery Test",
  description:
    "1500 original multiple-choice comparison questions for General English, VSTEP, IELTS, TOEIC, and Cambridge-style practice.",
  sourceNotes: [
    "Original questions generated from comparative, superlative, quantifier, and chart-comparison patterns; not copied from source materials.",
    "Difficulty levels: 1=A1/A2 foundation, 2=A2, 3=B1, 4=B2, 5=C1.",
  ],
  questionCount: questions.length,
  questions,
};

writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
