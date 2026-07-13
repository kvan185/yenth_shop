import { writeFileSync } from "node:fs";

const outputPath = "data/grammar-tests/tenses.json";

const tenseBank = [
  {
    key: "present-simple",
    label: "Present Simple",
    cefr: "A1",
    difficulty: 1,
    clue: "every day",
    rule: "Use the present simple for habits, routines, facts, and schedules.",
    correct: ({ subject, base, third }) => `${subject} ${third} ${time("every day")}.`,
    wrong: ({ subject, base, third }) => [
      `${subject} ${base} ${time("every day")}.`,
      `${subject} is ${base} ${time("every day")}.`,
      `${subject} has ${base} ${time("every day")}.`,
    ],
  },
  {
    key: "present-simple-negative",
    label: "Present Simple Negative",
    cefr: "A1",
    difficulty: 1,
    clue: "usually",
    rule: "Use does not plus the base verb with he, she, and it.",
    correct: ({ subject, base, object }) => `${subject} does not ${base} ${object} usually.`,
    wrong: ({ subject, base, third, object }) => [
      `${subject} does not ${third} ${object} usually.`,
      `${subject} do not ${base} ${object} usually.`,
      `${subject} is not ${base} ${object} usually.`,
    ],
  },
  {
    key: "present-continuous",
    label: "Present Continuous",
    cefr: "A1",
    difficulty: 1,
    clue: "right now",
    rule: "Use am, is, or are plus -ing for actions happening now.",
    correct: ({ subject, be, ing, object }) => `${subject} ${be} ${ing} ${object} right now.`,
    wrong: ({ subject, base, third, object }) => [
      `${subject} ${base} ${object} right now.`,
      `${subject} ${third} ${object} right now.`,
      `${subject} has ${base} ${object} right now.`,
    ],
  },
  {
    key: "past-simple",
    label: "Past Simple",
    cefr: "A1",
    difficulty: 2,
    clue: "yesterday",
    rule: "Use the past simple for finished actions at a finished past time.",
    correct: ({ subject, past, object }) => `${subject} ${past} ${object} yesterday.`,
    wrong: ({ subject, base, third, object }) => [
      `${subject} ${base} ${object} yesterday.`,
      `${subject} has ${base} ${object} yesterday.`,
      `${subject} is ${base} ${object} yesterday.`,
    ],
  },
  {
    key: "past-continuous",
    label: "Past Continuous",
    cefr: "A2",
    difficulty: 2,
    clue: "at 8 p.m. last night",
    rule: "Use was or were plus -ing for an action in progress at a past time.",
    correct: ({ subject, pastBe, ing, object }) => `${subject} ${pastBe} ${ing} ${object} at 8 p.m. last night.`,
    wrong: ({ subject, past, base, object }) => [
      `${subject} ${past} ${object} at 8 p.m. last night.`,
      `${subject} has been ${ingFrom(base)} ${object} at 8 p.m. last night.`,
      `${subject} is ${ingFrom(base)} ${object} at 8 p.m. last night.`,
    ],
  },
  {
    key: "present-perfect",
    label: "Present Perfect",
    cefr: "A2",
    difficulty: 2,
    clue: "already",
    rule: "Use have or has plus the past participle for completed actions with present relevance.",
    correct: ({ subject, have, participle, object }) => `${subject} ${have} already ${participle} ${object}.`,
    wrong: ({ subject, past, base, object }) => [
      `${subject} already ${past} ${object}.`,
      `${subject} has already ${base} ${object}.`,
      `${subject} is already ${base} ${object}.`,
    ],
  },
  {
    key: "present-perfect-for-since",
    label: "Present Perfect with for/since",
    cefr: "B1",
    difficulty: 3,
    clue: "since 2021",
    rule: "Use the present perfect for states or repeated actions that started in the past and continue now.",
    correct: ({ subject, have, participle, object }) => `${subject} ${have} ${participle} ${object} since 2021.`,
    wrong: ({ subject, past, base, object }) => [
      `${subject} ${past} ${object} since 2021.`,
      `${subject} is ${base} ${object} since 2021.`,
      `${subject} has ${base} ${object} since 2021.`,
    ],
  },
  {
    key: "present-perfect-continuous",
    label: "Present Perfect Continuous",
    cefr: "B1",
    difficulty: 3,
    clue: "for two hours",
    rule: "Use have or has been plus -ing to emphasise an activity continuing up to now.",
    correct: ({ subject, have, ing, object }) => `${subject} ${have} been ${ing} ${object} for two hours.`,
    wrong: ({ subject, past, participle, ing, object }) => [
      `${subject} ${past} ${object} for two hours.`,
      `${subject} ${haveFromSubject(subject)} ${participle} ${object} for two hours.`,
      `${subject} is ${ing} ${object} for two hours.`,
    ],
  },
  {
    key: "past-perfect",
    label: "Past Perfect",
    cefr: "B1",
    difficulty: 3,
    clue: "before",
    rule: "Use had plus the past participle for an action completed before another past action.",
    correct: ({ subject, participle, object, secondPast }) => `${subject} had ${participle} ${object} before ${secondPast}.`,
    wrong: ({ subject, past, base, object, secondPast }) => [
      `${subject} ${past} ${object} before ${secondPast}.`,
      `${subject} has ${participleFallback(base)} ${object} before ${secondPast}.`,
      `${subject} was ${base} ${object} before ${secondPast}.`,
    ],
  },
  {
    key: "past-perfect-continuous",
    label: "Past Perfect Continuous",
    cefr: "B2",
    difficulty: 4,
    clue: "for three months before",
    rule: "Use had been plus -ing to emphasise duration before a past reference point.",
    correct: ({ subject, ing, object, secondPast }) => `${subject} had been ${ing} ${object} for three months before ${secondPast}.`,
    wrong: ({ subject, past, participle, ing, object, secondPast }) => [
      `${subject} ${past} ${object} for three months before ${secondPast}.`,
      `${subject} has been ${ing} ${object} for three months before ${secondPast}.`,
      `${subject} had ${participle} ${object} for three months before ${secondPast}.`,
    ],
  },
  {
    key: "future-simple",
    label: "Future Simple",
    cefr: "A2",
    difficulty: 2,
    clue: "tomorrow",
    rule: "Use will plus the base verb for predictions, promises, or decisions made now.",
    correct: ({ subject, base, object }) => `${subject} will ${base} ${object} tomorrow.`,
    wrong: ({ subject, past, third, object }) => [
      `${subject} ${third} ${object} tomorrow.`,
      `${subject} will ${past} ${object} tomorrow.`,
      `${subject} is ${third} ${object} tomorrow.`,
    ],
  },
  {
    key: "be-going-to",
    label: "Be going to",
    cefr: "A2",
    difficulty: 2,
    clue: "planned",
    rule: "Use be going to plus the base verb for intentions or plans.",
    correct: ({ subject, be, base, object }) => `${subject} ${be} going to ${base} ${object} next week.`,
    wrong: ({ subject, past, third, object }) => [
      `${subject} going to ${third} ${object} next week.`,
      `${subject} ${beFromSubject(subject)} going to ${past} ${object} next week.`,
      `${subject} will going to ${baseFromThird(third)} ${object} next week.`,
    ],
  },
  {
    key: "future-continuous",
    label: "Future Continuous",
    cefr: "B1",
    difficulty: 3,
    clue: "this time tomorrow",
    rule: "Use will be plus -ing for an action in progress at a future time.",
    correct: ({ subject, ing, object }) => `${subject} will be ${ing} ${object} this time tomorrow.`,
    wrong: ({ subject, base, past, ing, object }) => [
      `${subject} will ${base} ${object} this time tomorrow.`,
      `${subject} will have ${past} ${object} this time tomorrow.`,
      `${subject} is ${ing} ${object} this time tomorrow.`,
    ],
  },
  {
    key: "future-perfect",
    label: "Future Perfect",
    cefr: "B2",
    difficulty: 4,
    clue: "by Friday",
    rule: "Use will have plus the past participle for an action completed before a future deadline.",
    correct: ({ subject, participle, object }) => `${subject} will have ${participle} ${object} by Friday.`,
    wrong: ({ subject, base, past, object }) => [
      `${subject} will ${base} ${object} by Friday.`,
      `${subject} will be ${ingFrom(base)} ${object} by Friday.`,
      `${subject} has ${participleFallback(base)} ${object} by Friday.`,
    ],
  },
  {
    key: "future-perfect-continuous",
    label: "Future Perfect Continuous",
    cefr: "C1",
    difficulty: 5,
    clue: "by next June",
    rule: "Use will have been plus -ing to show duration up to a future point.",
    correct: ({ subject, ing, object }) => `By next June, ${subject.toLowerCase()} will have been ${ing} ${object} for five years.`,
    wrong: ({ subject, base, participle, object }) => [
      `By next June, ${subject.toLowerCase()} will ${base} ${object} for five years.`,
      `By next June, ${subject.toLowerCase()} will have ${participle} ${object} for five years.`,
      `By next June, ${subject.toLowerCase()} has been ${ingFrom(base)} ${object} for five years.`,
    ],
  },
  {
    key: "time-clause-future",
    label: "Future time clauses",
    cefr: "B2",
    difficulty: 4,
    clue: "after / when / until",
    rule: "Use present simple or present perfect, not will, in future time clauses.",
    correct: ({ subject, base, third, object }) => `We will discuss the results after ${subject.toLowerCase()} ${third} ${object}.`,
    wrong: ({ subject, base, object }) => [
      `We will discuss the results after ${subject.toLowerCase()} will ${base} ${object}.`,
      `We will discuss the results after ${subject.toLowerCase()} would ${base} ${object}.`,
      `We will discuss the results after ${subject.toLowerCase()} is ${base} ${object}.`,
    ],
  },
  {
    key: "mixed-past",
    label: "Past Simple vs Past Continuous",
    cefr: "B1",
    difficulty: 3,
    clue: "when",
    rule: "Use the past continuous for the background action and the past simple for the interrupting event.",
    correct: ({ subject, pastBe, ing, object, secondPast }) => `${subject} ${pastBe} ${ing} ${object} when ${secondPast}.`,
    wrong: ({ subject, past, base, object, secondPast }) => [
      `${subject} ${past} ${object} when ${secondPast}.`,
      `${subject} has ${participleFallback(base)} ${object} when ${secondPast}.`,
      `${subject} is ${ingFrom(base)} ${object} when ${secondPast}.`,
    ],
  },
  {
    key: "ielts-data-trend",
    label: "IELTS trend description",
    cefr: "B2",
    difficulty: 4,
    clue: "from 2010 to 2020",
    rule: "Use the past simple for completed historical data periods.",
    correct: ({ metric, trendPast }) => `The percentage of ${metric} ${trendPast} steadily from 2010 to 2020.`,
    wrong: ({ metric, trendBase }) => [
      `The percentage of ${metric} has ${trendBase} steadily from 2010 to 2020.`,
      `The percentage of ${metric} is ${trendBase} steadily from 2010 to 2020.`,
      `The percentage of ${metric} will ${trendBase} steadily from 2010 to 2020.`,
    ],
  },
  {
    key: "toeic-workplace",
    label: "TOEIC workplace tense",
    cefr: "B1",
    difficulty: 3,
    clue: "by the time / before the meeting",
    rule: "Use future perfect or present perfect forms for deadlines and workplace updates.",
    correct: ({ team, participle, object }) => `The ${team} will have ${participle} ${object} before the meeting begins.`,
    wrong: ({ team, base, past, object }) => [
      `The ${team} will ${base} ${object} before the meeting begins.`,
      `The ${team} has ${past} ${object} before the meeting begins.`,
      `The ${team} is ${base} ${object} before the meeting begins.`,
    ],
  },
];

const subjects = [
  { subject: "She", be: "is", pastBe: "was", have: "has" },
  { subject: "He", be: "is", pastBe: "was", have: "has" },
  { subject: "The manager", be: "is", pastBe: "was", have: "has" },
  { subject: "The student", be: "is", pastBe: "was", have: "has" },
  { subject: "My brother", be: "is", pastBe: "was", have: "has" },
  { subject: "The committee", be: "is", pastBe: "was", have: "has" },
  { subject: "The app", be: "is", pastBe: "was", have: "has" },
  { subject: "The company", be: "is", pastBe: "was", have: "has" },
  { subject: "They", be: "are", pastBe: "were", have: "have" },
  { subject: "We", be: "are", pastBe: "were", have: "have" },
  { subject: "The researchers", be: "are", pastBe: "were", have: "have" },
  { subject: "The volunteers", be: "are", pastBe: "were", have: "have" },
  { subject: "Many candidates", be: "are", pastBe: "were", have: "have" },
  { subject: "Our teachers", be: "are", pastBe: "were", have: "have" },
  { subject: "The sales team", be: "is", pastBe: "was", have: "has" },
  { subject: "The students", be: "are", pastBe: "were", have: "have" },
];

const verbs = [
  { base: "review", third: "reviews", past: "reviewed", participle: "reviewed", ing: "reviewing", object: "the lesson" },
  { base: "prepare", third: "prepares", past: "prepared", participle: "prepared", ing: "preparing", object: "the report" },
  { base: "submit", third: "submits", past: "submitted", participle: "submitted", ing: "submitting", object: "the application" },
  { base: "complete", third: "completes", past: "completed", participle: "completed", ing: "completing", object: "the project" },
  { base: "write", third: "writes", past: "wrote", participle: "written", ing: "writing", object: "an essay" },
  { base: "read", third: "reads", past: "read", participle: "read", ing: "reading", object: "the article" },
  { base: "study", third: "studies", past: "studied", participle: "studied", ing: "studying", object: "English grammar" },
  { base: "update", third: "updates", past: "updated", participle: "updated", ing: "updating", object: "the schedule" },
  { base: "analyse", third: "analyses", past: "analysed", participle: "analysed", ing: "analysing", object: "the chart" },
  { base: "attend", third: "attends", past: "attended", participle: "attended", ing: "attending", object: "the workshop" },
  { base: "organise", third: "organises", past: "organised", participle: "organised", ing: "organising", object: "the event" },
  { base: "check", third: "checks", past: "checked", participle: "checked", ing: "checking", object: "the answers" },
  { base: "design", third: "designs", past: "designed", participle: "designed", ing: "designing", object: "a new course" },
  { base: "solve", third: "solves", past: "solved", participle: "solved", ing: "solving", object: "the problem" },
  { base: "send", third: "sends", past: "sent", participle: "sent", ing: "sending", object: "the email" },
  { base: "make", third: "makes", past: "made", participle: "made", ing: "making", object: "a decision" },
  { base: "give", third: "gives", past: "gave", participle: "given", ing: "giving", object: "a presentation" },
  { base: "take", third: "takes", past: "took", participle: "taken", ing: "taking", object: "a practice test" },
  { base: "meet", third: "meets", past: "met", participle: "met", ing: "meeting", object: "the client" },
  { base: "learn", third: "learns", past: "learned", participle: "learned", ing: "learning", object: "new vocabulary" },
];

const secondEvents = [
  "the teacher arrived",
  "the meeting started",
  "the server stopped",
  "the deadline passed",
  "the examiner collected the papers",
  "the client called",
  "the rain began",
  "the train left",
  "the manager returned",
  "the class ended",
];

const metrics = [
  "online learners",
  "urban residents",
  "international students",
  "public transport users",
  "renewable energy users",
  "museum visitors",
  "remote workers",
  "library members",
  "mobile subscribers",
  "tourists",
];

const trends = [
  { trendBase: "rise", trendPast: "rose" },
  { trendBase: "fall", trendPast: "fell" },
  { trendBase: "increase", trendPast: "increased" },
  { trendBase: "decrease", trendPast: "decreased" },
  { trendBase: "grow", trendPast: "grew" },
];

const teams = ["marketing team", "finance team", "support team", "design team", "training team", "research team"];
const examFocuses = ["General English", "VSTEP", "IELTS", "TOEIC", "Cambridge B1/B2"];
const objectDetails = [
  "for the morning session",
  "for the entrance exam",
  "for the VSTEP class",
  "for the IELTS task",
  "for the TOEIC workshop",
  "for the client file",
  "for the school project",
  "for the research group",
  "for the online course",
  "for the final review",
  "for the training day",
  "for the study plan",
  "for the speaking club",
  "for the grammar clinic",
  "for the reading group",
  "for the writing portfolio",
  "for the listening lab",
  "for the business trip",
  "for the weekly report",
  "for the placement test",
  "for the scholarship form",
  "for the team briefing",
  "for the product launch",
  "for the campus event",
  "for the teacher meeting",
  "for the summer course",
  "for the evening class",
  "for the mock test",
  "for the travel plan",
  "for the sales update",
  "for the volunteer group",
  "for the library talk",
  "for the science fair",
  "for the debate team",
  "for the workshop handout",
  "for the revision folder",
  "for the exam booklet",
  "for the interview panel",
  "for the course website",
  "for the progress check",
  "for the holiday schedule",
  "for the new syllabus",
  "for the parent meeting",
  "for the language centre",
  "for the company newsletter",
  "for the admissions office",
  "for the project archive",
  "for the study group",
  "for the academic fair",
  "for the conference room",
  "for the weekly quiz",
  "for the unit test",
  "for the reading passage",
  "for the chart summary",
  "for the email reply",
  "for the presentation slide",
  "for the application portal",
  "for the speaking prompt",
  "for the writing task",
  "for the listening script",
  "for the grammar notebook",
  "for the student survey",
  "for the office notice",
  "for the training manual",
  "for the orientation day",
  "for the classroom display",
  "for the learning journal",
  "for the feedback form",
  "for the practice package",
  "for the vocabulary list",
  "for the review timetable",
  "for the interview practice",
  "for the club announcement",
  "for the assessment file",
  "for the online forum",
  "for the study checklist",
  "for the teacher guide",
  "for the learner dashboard",
  "for the exam strategy",
  "for the topic outline",
  "for the sample answer",
  "for the learning target",
  "for the revision calendar",
  "for the class newsletter",
  "for the course certificate",
  "for the mentor session",
  "for the afternoon seminar",
  "for the peer review",
  "for the language project",
  "for the unit summary",
  "for the practice bank",
  "for the answer sheet",
  "for the exam room",
  "for the tutoring session",
  "for the learning report",
  "for the skill checkpoint",
  "for the final portfolio",
];

function time(value) {
  return value;
}

function haveFromSubject(subject) {
  return ["They", "We", "The researchers", "The volunteers", "Many candidates", "Our teachers", "The students"].includes(subject)
    ? "have"
    : "has";
}

function beFromSubject(subject) {
  return ["They", "We", "The researchers", "The volunteers", "Many candidates", "Our teachers", "The students"].includes(subject)
    ? "are"
    : "is";
}

function ingFrom(base) {
  const found = verbs.find((item) => item.base === base);
  return found?.ing || `${base}ing`;
}

function participleFallback(base) {
  const found = verbs.find((item) => item.base === base);
  return found?.participle || `${base}ed`;
}

function baseFromThird(third) {
  const found = verbs.find((item) => item.third === third);
  return found?.base || third.replace(/s$/, "");
}

function shuffleOptions(options, seed) {
  const result = [...options];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = (seed + index * 7) % (index + 1);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function promptFor(pattern, context) {
  const opening = [
    "Choose the correct sentence.",
    "Choose the best answer.",
    "Which option uses the correct tense?",
    "Complete the idea with the correct tense.",
    "Select the sentence that fits the time clue.",
  ];

  return `${opening[context.index % opening.length]} Time clue: ${pattern.clue}. Context: ${context.objectDetail}.`;
}

function buildContext(index, pattern) {
  const subject = subjects[index % subjects.length];
  const verb = verbs[Math.floor(index / subjects.length) % verbs.length];
  const objectDetail = objectDetails[index % objectDetails.length];
  const secondPast = secondEvents[index % secondEvents.length];
  const metric = metrics[index % metrics.length];
  const trend = trends[index % trends.length];
  const team = teams[index % teams.length];
  return {
    ...subject,
    ...verb,
    object: `${verb.object} ${objectDetail}`,
    objectDetail,
    ...trend,
    index,
    metric,
    secondPast,
    team,
  };
}

function makeQuestion(index, pattern) {
  const context = buildContext(index, pattern);
  const answer = pattern.correct(context);
  const wrongOptions = pattern.wrong(context).filter((item) => item !== answer);
  const options = shuffleOptions([answer, ...wrongOptions].slice(0, 4), index);
  const examFocus = examFocuses[(index + pattern.difficulty) % examFocuses.length];
  return {
    id: `tenses-${String(index + 1).padStart(4, "0")}`,
    type: "multiple-choice",
    level: pattern.difficulty,
    cefr: pattern.cefr,
    examFocus,
    tenseFocus: pattern.label,
    prompt: promptFor(pattern, context),
    options,
    answer,
    explanation: pattern.rule,
  };
}

const questions = [];
for (let index = 0; index < 1000; index += 1) {
  const pattern = tenseBank[index % tenseBank.length];
  questions.push(makeQuestion(index, pattern));
}

const uniquePrompts = new Set(questions.map((item) => `${item.prompt}::${item.answer}`));
if (uniquePrompts.size !== questions.length) {
  throw new Error(`Duplicate generated questions: ${questions.length - uniquePrompts.size}`);
}

const payload = {
  lessonId: "tenses",
  title: "Tenses Mastery Test",
  description:
    "1000 original multiple-choice tense questions for General English, VSTEP, IELTS, TOEIC, and Cambridge-style practice.",
  sourceNotes: [
    "Original questions generated from tense rules and exam-task patterns; not copied from source materials.",
    "Difficulty levels: 1=A1/A2 foundation, 2=A2, 3=B1, 4=B2, 5=C1.",
  ],
  questionCount: questions.length,
  questions,
};

writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
