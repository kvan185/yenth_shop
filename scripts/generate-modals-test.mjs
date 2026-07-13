import { writeFileSync } from "node:fs";

const outputPath = "data/grammar-tests/modals.json";

const subjects = [
  "You",
  "We",
  "They",
  "The candidate",
  "The manager",
  "The students",
  "The visitor",
  "The team",
  "The researcher",
  "The company",
  "The teacher",
  "The client",
  "The applicant",
  "The speaker",
  "The report",
  "The system",
  "The employee",
  "The volunteer",
  "The committee",
  "The learner",
];

const verbs = [
  { base: "review", past: "reviewed", participle: "reviewed", object: "the notes" },
  { base: "submit", past: "submitted", participle: "submitted", object: "the application" },
  { base: "complete", past: "completed", participle: "completed", object: "the task" },
  { base: "attend", past: "attended", participle: "attended", object: "the meeting" },
  { base: "bring", past: "brought", participle: "brought", object: "an ID card" },
  { base: "check", past: "checked", participle: "checked", object: "the answer" },
  { base: "send", past: "sent", participle: "sent", object: "the email" },
  { base: "read", past: "read", participle: "read", object: "the instructions" },
  { base: "wear", past: "wore", participle: "worn", object: "a badge" },
  { base: "finish", past: "finished", participle: "finished", object: "the report" },
  { base: "explain", past: "explained", participle: "explained", object: "the result" },
  { base: "update", past: "updated", participle: "updated", object: "the schedule" },
  { base: "reserve", past: "reserved", participle: "reserved", object: "a seat" },
  { base: "join", past: "joined", participle: "joined", object: "the workshop" },
  { base: "prepare", past: "prepared", participle: "prepared", object: "the presentation" },
  { base: "answer", past: "answered", participle: "answered", object: "the question" },
  { base: "use", past: "used", participle: "used", object: "the dictionary" },
  { base: "contact", past: "contacted", participle: "contacted", object: "the office" },
  { base: "change", past: "changed", participle: "changed", object: "the password" },
  { base: "practise", past: "practised", participle: "practised", object: "speaking English" },
];

const contexts = [
  "before the VSTEP class",
  "during the IELTS lesson",
  "for the TOEIC workshop",
  "before the Cambridge practice test",
  "at the language centre",
  "in the exam room",
  "during the online course",
  "before the final interview",
  "at the office",
  "for the weekly review",
  "during the speaking test",
  "before the writing task",
  "for the listening session",
  "at the reception desk",
  "during the training day",
  "before the deadline",
  "for the study group",
  "during the mock test",
  "at the conference",
  "for the project meeting",
  "before the placement test",
  "during the tutorial",
  "for the scholarship form",
  "at the library",
  "during the safety briefing",
  "before the course starts",
  "for the new syllabus",
  "during the grammar review",
  "at the customer desk",
  "for the team presentation",
];

const evidence = [
  "the lights are on",
  "the file is still open",
  "the deadline has passed",
  "the room is locked",
  "the weather forecast is uncertain",
  "the answer is not in the passage",
  "the manager has not replied",
  "the ticket is missing",
  "the figures do not match",
  "the phone is switched off",
  "the office is closed",
  "the instructions are unclear",
  "the timetable has changed",
  "the receipt is on the desk",
  "the results are not final",
];

const examFocuses = ["General English", "VSTEP", "IELTS", "TOEIC", "Cambridge B1/B2"];

const patterns = [
  {
    label: "Ability with can",
    cefr: "A1",
    level: 1,
    clue: "ability now",
    rule: "Use can plus the base verb to talk about present ability.",
    make: (c) => ({
      answer: `${c.subject} can ${c.verb.base} ${c.verb.object} ${c.context}.`,
      wrong: [
        `${c.subject} can to ${c.verb.base} ${c.verb.object} ${c.context}.`,
        `${c.subject} can ${c.verb.past} ${c.verb.object} ${c.context}.`,
        `${c.subject} can ${c.verb.base}s ${c.verb.object} ${c.context}.`,
      ],
    }),
  },
  {
    label: "Past ability with could",
    cefr: "A2",
    level: 2,
    clue: "past ability",
    rule: "Use could plus the base verb for general ability in the past.",
    make: (c) => ({
      answer: `${c.subject} could ${c.verb.base} ${c.verb.object} when the course began.`,
      wrong: [
        `${c.subject} could to ${c.verb.base} ${c.verb.object} when the course began.`,
        `${c.subject} can ${c.verb.past} ${c.verb.object} when the course began.`,
        `${c.subject} could ${c.verb.past} ${c.verb.object} when the course began.`,
      ],
    }),
  },
  {
    label: "Permission with may",
    cefr: "A1",
    level: 1,
    clue: "formal permission",
    rule: "Use may plus the base verb for formal permission.",
    make: (c) => ({
      answer: `${c.subject} may ${c.verb.base} ${c.verb.object} after registration.`,
      wrong: [
        `${c.subject} may to ${c.verb.base} ${c.verb.object} after registration.`,
        `${c.subject} may ${c.verb.past} ${c.verb.object} after registration.`,
        `${c.subject} may ${c.verb.base}s ${c.verb.object} after registration.`,
      ],
    }),
  },
  {
    label: "Prohibition with must not",
    cefr: "A2",
    level: 2,
    clue: "rule / prohibition",
    rule: "Use must not plus the base verb to say something is prohibited.",
    make: (c) => ({
      answer: `${c.subject} must not ${c.verb.base} ${c.verb.object} ${c.context}.`,
      wrong: [
        `${c.subject} must not to ${c.verb.base} ${c.verb.object} ${c.context}.`,
        `${c.subject} do not must ${c.verb.base} ${c.verb.object} ${c.context}.`,
        `${c.subject} must not ${c.verb.past} ${c.verb.object} ${c.context}.`,
      ],
    }),
  },
  {
    label: "Strong obligation with must",
    cefr: "A1",
    level: 1,
    clue: "strong obligation",
    rule: "Use must plus the base verb for a strong obligation or rule.",
    make: (c) => ({
      answer: `${c.subject} must ${c.verb.base} ${c.verb.object} before leaving.`,
      wrong: [
        `${c.subject} must to ${c.verb.base} ${c.verb.object} before leaving.`,
        `${c.subject} must ${c.verb.past} ${c.verb.object} before leaving.`,
        `${c.subject} must ${c.verb.base}s ${c.verb.object} before leaving.`,
      ],
    }),
  },
  {
    label: "External obligation with have to",
    cefr: "A2",
    level: 2,
    clue: "external rule",
    rule: "Use have to or has to for obligations from rules, schedules, or circumstances.",
    make: (c) => ({
      answer: `${c.subject} has to ${c.verb.base} ${c.verb.object} ${c.context}.`,
      wrong: [
        `${c.subject} has to ${c.verb.past} ${c.verb.object} ${c.context}.`,
        `${c.subject} have to ${c.verb.base} ${c.verb.object} ${c.context}.`,
        `${c.subject} has ${c.verb.base} ${c.verb.object} ${c.context}.`,
      ],
    }),
  },
  {
    label: "No necessity with do not have to",
    cefr: "B1",
    level: 3,
    clue: "not necessary",
    rule: "Do not have to means something is not necessary; it does not mean prohibited.",
    make: (c) => ({
      answer: `${c.subject} does not have to ${c.verb.base} ${c.verb.object} today.`,
      wrong: [
        `${c.subject} must not ${c.verb.base} ${c.verb.object} today.`,
        `${c.subject} does not have to ${c.verb.past} ${c.verb.object} today.`,
        `${c.subject} does not has to ${c.verb.base} ${c.verb.object} today.`,
      ],
    }),
  },
  {
    label: "Advice with should",
    cefr: "A1",
    level: 1,
    clue: "advice",
    rule: "Use should plus the base verb to give advice.",
    make: (c) => ({
      answer: `${c.subject} should ${c.verb.base} ${c.verb.object} ${c.context}.`,
      wrong: [
        `${c.subject} should to ${c.verb.base} ${c.verb.object} ${c.context}.`,
        `${c.subject} should ${c.verb.past} ${c.verb.object} ${c.context}.`,
        `${c.subject} should ${c.verb.base}s ${c.verb.object} ${c.context}.`,
      ],
    }),
  },
  {
    label: "Advice with ought to",
    cefr: "B1",
    level: 3,
    clue: "advice / expectation",
    rule: "Ought to is followed by the base verb and is similar to should.",
    make: (c) => ({
      answer: `${c.subject} ought to ${c.verb.base} ${c.verb.object} ${c.context}.`,
      wrong: [
        `${c.subject} ought ${c.verb.base} ${c.verb.object} ${c.context}.`,
        `${c.subject} ought to ${c.verb.past} ${c.verb.object} ${c.context}.`,
        `${c.subject} oughts to ${c.verb.base} ${c.verb.object} ${c.context}.`,
      ],
    }),
  },
  {
    label: "Polite request with could",
    cefr: "A1",
    level: 1,
    clue: "polite request",
    rule: "Could you plus the base verb is a polite way to make a request.",
    make: (c) => ({
      answer: `Could you ${c.verb.base} ${c.verb.object} ${c.context}?`,
      wrong: [
        `Could you to ${c.verb.base} ${c.verb.object} ${c.context}?`,
        `Could you ${c.verb.past} ${c.verb.object} ${c.context}?`,
        `Could you ${c.verb.base}s ${c.verb.object} ${c.context}?`,
      ],
    }),
  },
  {
    label: "Offer with would like",
    cefr: "A2",
    level: 2,
    clue: "offer",
    rule: "Would you like me to is a polite way to offer help.",
    make: (c) => ({
      answer: `Would you like me to ${c.verb.base} ${c.verb.object} ${c.context}?`,
      wrong: [
        `Would you like that I ${c.verb.base} ${c.verb.object} ${c.context}?`,
        `Would you like me ${c.verb.base} ${c.verb.object} ${c.context}?`,
        `Would you like me to ${c.verb.past} ${c.verb.object} ${c.context}?`,
      ],
    }),
  },
  {
    label: "Suggestion with could",
    cefr: "B1",
    level: 3,
    clue: "suggestion",
    rule: "Could can introduce a possible suggestion without sounding too forceful.",
    make: (c) => ({
      answer: `${c.subject} could ${c.verb.base} ${c.verb.object} if there is enough time.`,
      wrong: [
        `${c.subject} could to ${c.verb.base} ${c.verb.object} if there is enough time.`,
        `${c.subject} could ${c.verb.past} ${c.verb.object} if there is enough time.`,
        `${c.subject} could ${c.verb.base}s ${c.verb.object} if there is enough time.`,
      ],
    }),
  },
  {
    label: "Possibility with might",
    cefr: "B1",
    level: 3,
    clue: "uncertain possibility",
    rule: "Use might plus the base verb when something is possible but not certain.",
    make: (c) => ({
      answer: `${c.subject} might ${c.verb.base} ${c.verb.object} later.`,
      wrong: [
        `${c.subject} might to ${c.verb.base} ${c.verb.object} later.`,
        `${c.subject} might ${c.verb.past} ${c.verb.object} later.`,
        `${c.subject} might ${c.verb.base}s ${c.verb.object} later.`,
      ],
    }),
  },
  {
    label: "Deduction with must",
    cefr: "B1",
    level: 3,
    clue: "logical certainty",
    rule: "Use must plus the base verb for a logical conclusion about the present.",
    make: (c) => ({
      answer: `${c.subject} must be in the building because ${c.evidence}.`,
      wrong: [
        `${c.subject} must to be in the building because ${c.evidence}.`,
        `${c.subject} must being in the building because ${c.evidence}.`,
        `${c.subject} must is in the building because ${c.evidence}.`,
      ],
    }),
  },
  {
    label: "Impossibility with cannot",
    cefr: "B1",
    level: 3,
    clue: "impossible conclusion",
    rule: "Use cannot or can't plus the base verb to say something is logically impossible.",
    make: (c) => ({
      answer: `${c.subject} cannot be responsible because ${c.evidence}.`,
      wrong: [
        `${c.subject} cannot to be responsible because ${c.evidence}.`,
        `${c.subject} cannot being responsible because ${c.evidence}.`,
        `${c.subject} must not be responsible because ${c.evidence}.`,
      ],
    }),
  },
  {
    label: "Past deduction with must have",
    cefr: "B2",
    level: 4,
    clue: "logical conclusion about the past",
    rule: "Use must have plus the past participle for a strong conclusion about the past.",
    make: (c) => ({
      answer: `${c.subject} must have ${c.verb.participle} ${c.verb.object} because ${c.evidence}.`,
      wrong: [
        `${c.subject} must ${c.verb.participle} ${c.verb.object} because ${c.evidence}.`,
        `${c.subject} must have ${c.verb.base} ${c.verb.object} because ${c.evidence}.`,
        `${c.subject} must had ${c.verb.participle} ${c.verb.object} because ${c.evidence}.`,
      ],
    }),
  },
  {
    label: "Past criticism with should have",
    cefr: "B2",
    level: 4,
    clue: "past advice / regret",
    rule: "Use should have plus the past participle for criticism or regret about the past.",
    make: (c) => ({
      answer: `${c.subject} should have ${c.verb.participle} ${c.verb.object} earlier.`,
      wrong: [
        `${c.subject} should ${c.verb.participle} ${c.verb.object} earlier.`,
        `${c.subject} should have ${c.verb.base} ${c.verb.object} earlier.`,
        `${c.subject} should had ${c.verb.participle} ${c.verb.object} earlier.`,
      ],
    }),
  },
  {
    label: "Missed possibility with could have",
    cefr: "B2",
    level: 4,
    clue: "past possibility not used",
    rule: "Use could have plus the past participle for a past possibility that did not happen or was not used.",
    make: (c) => ({
      answer: `${c.subject} could have ${c.verb.participle} ${c.verb.object}, but there was no time.`,
      wrong: [
        `${c.subject} could ${c.verb.participle} ${c.verb.object}, but there was no time.`,
        `${c.subject} could have ${c.verb.base} ${c.verb.object}, but there was no time.`,
        `${c.subject} could had ${c.verb.participle} ${c.verb.object}, but there was no time.`,
      ],
    }),
  },
  {
    label: "Uncertain past possibility with may have",
    cefr: "B2",
    level: 4,
    clue: "uncertain past possibility",
    rule: "Use may have plus the past participle when a past event is possible but uncertain.",
    make: (c) => ({
      answer: `${c.subject} may have ${c.verb.participle} ${c.verb.object} before the meeting.`,
      wrong: [
        `${c.subject} may ${c.verb.participle} ${c.verb.object} before the meeting.`,
        `${c.subject} may have ${c.verb.base} ${c.verb.object} before the meeting.`,
        `${c.subject} may had ${c.verb.participle} ${c.verb.object} before the meeting.`,
      ],
    }),
  },
  {
    label: "Hypothetical with would",
    cefr: "B1",
    level: 3,
    clue: "imagined situation",
    rule: "Use would plus the base verb in hypothetical or conditional results.",
    make: (c) => ({
      answer: `${c.subject} would ${c.verb.base} ${c.verb.object} if the instructions were clearer.`,
      wrong: [
        `${c.subject} would to ${c.verb.base} ${c.verb.object} if the instructions were clearer.`,
        `${c.subject} would ${c.verb.past} ${c.verb.object} if the instructions were clearer.`,
        `${c.subject} would ${c.verb.base}s ${c.verb.object} if the instructions were clearer.`,
      ],
    }),
  },
  {
    label: "Academic hedging with may",
    cefr: "C1",
    level: 5,
    clue: "careful academic claim",
    rule: "May, might, and could can soften claims in academic or IELTS-style writing.",
    make: (c) => ({
      answer: `The results may suggest that further practice is needed.`,
      wrong: [
        `The results must suggest that further practice is needed.`,
        `The results should to suggest that further practice is needed.`,
        `The results may suggesting that further practice is needed.`,
      ],
    }),
  },
  {
    label: "Had better warning",
    cefr: "B2",
    level: 4,
    clue: "strong advice / warning",
    rule: "Had better is followed by the base verb and often gives strong advice or a warning.",
    make: (c) => ({
      answer: `${c.subject} had better ${c.verb.base} ${c.verb.object} before the deadline.`,
      wrong: [
        `${c.subject} had better to ${c.verb.base} ${c.verb.object} before the deadline.`,
        `${c.subject} had better ${c.verb.past} ${c.verb.object} before the deadline.`,
        `${c.subject} has better ${c.verb.base} ${c.verb.object} before the deadline.`,
      ],
    }),
  },
  {
    label: "Need not for lack of necessity",
    cefr: "C1",
    level: 5,
    clue: "formal lack of necessity",
    rule: "Need not plus the base verb is a formal way to say something is not necessary.",
    make: (c) => ({
      answer: `${c.subject} need not ${c.verb.base} ${c.verb.object} until Friday.`,
      wrong: [
        `${c.subject} need not to ${c.verb.base} ${c.verb.object} until Friday.`,
        `${c.subject} needs not ${c.verb.base} ${c.verb.object} until Friday.`,
        `${c.subject} need not ${c.verb.past} ${c.verb.object} until Friday.`,
      ],
    }),
  },
];

function context(index) {
  return {
    context: contexts[index % contexts.length],
    evidence: evidence[index % evidence.length],
    subject: subjects[index % subjects.length],
    verb: verbs[Math.floor(index / subjects.length) % verbs.length],
  };
}

function shuffleOptions(options, seed) {
  const result = [...options];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = (seed + index * 13) % (index + 1);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function promptFor(pattern, index) {
  const stems = [
    "Choose the correct modal sentence.",
    "Choose the best modal form.",
    "Which option uses the modal correctly?",
    "Complete the idea with the correct modal structure.",
    "Select the sentence that fits the modal meaning.",
  ];
  return `${stems[index % stems.length]} Meaning: ${pattern.clue}. Context set ${String(index + 1).padStart(4, "0")}.`;
}

function makeQuestion(index, pattern) {
  const data = pattern.make(context(index));
  const answer = data.answer;
  const options = shuffleOptions([answer, ...data.wrong].slice(0, 4), index);

  return {
    id: `modals-${String(index + 1).padStart(4, "0")}`,
    type: "multiple-choice",
    level: pattern.level,
    cefr: pattern.cefr,
    examFocus: examFocuses[(index + pattern.level) % examFocuses.length],
    modalFocus: pattern.label,
    prompt: promptFor(pattern, index),
    options,
    answer,
    explanation: pattern.rule,
  };
}

const levelPlan = [
  { count: 120, level: 1 },
  { count: 300, level: 2 },
  { count: 300, level: 3 },
  { count: 300, level: 4 },
  { count: 180, level: 5 },
];

const orderedPatterns = levelPlan.flatMap(({ count, level }) => {
  const candidates = patterns.filter((pattern) => pattern.level === level);
  return Array.from({ length: count }, (_, index) => candidates[index % candidates.length]);
});

const questions = orderedPatterns.map((pattern, index) => {
  return makeQuestion(index, pattern);
});

const uniqueItems = new Set(questions.map((item) => `${item.prompt}::${item.answer}`));
if (uniqueItems.size !== questions.length) {
  throw new Error(`Duplicate generated questions: ${questions.length - uniqueItems.size}`);
}

const payload = {
  lessonId: "modals",
  title: "Modal Verbs Mastery Test",
  description:
    "1200 original multiple-choice modal verb questions for General English, VSTEP, IELTS, TOEIC, and Cambridge-style practice.",
  sourceNotes: [
    "Original questions generated from modal meaning groups and exam-task patterns; not copied from source materials.",
    "Difficulty levels: 1=A1/A2 foundation, 2=A2, 3=B1, 4=B2, 5=C1.",
  ],
  questionCount: questions.length,
  questions,
};

writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
