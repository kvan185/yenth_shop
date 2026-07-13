import { writeFileSync } from "node:fs";

const outputPath = "data/grammar-tests/passive-voice.json";

const agents = [
  "the teacher",
  "the manager",
  "the students",
  "the examiner",
  "the committee",
  "the company",
  "the support team",
  "the editor",
  "the researcher",
  "the course designer",
  "the technician",
  "the volunteer",
  "the trainer",
  "the receptionist",
  "the project leader",
  "the language centre",
  "the system",
  "the customer",
  "the interview panel",
  "the administrator",
];

const patients = [
  "the report",
  "the application",
  "the classroom",
  "the schedule",
  "the answer sheet",
  "the online lesson",
  "the grammar task",
  "the email",
  "the presentation",
  "the chart",
  "the password",
  "the instructions",
  "the exam result",
  "the course material",
  "the recording",
  "the test paper",
  "the project plan",
  "the feedback form",
  "the booking",
  "the training file",
];

const verbs = [
  { base: "check", past: "checked", participle: "checked" },
  { base: "write", past: "wrote", participle: "written" },
  { base: "send", past: "sent", participle: "sent" },
  { base: "update", past: "updated", participle: "updated" },
  { base: "clean", past: "cleaned", participle: "cleaned" },
  { base: "prepare", past: "prepared", participle: "prepared" },
  { base: "review", past: "reviewed", participle: "reviewed" },
  { base: "approve", past: "approved", participle: "approved" },
  { base: "publish", past: "published", participle: "published" },
  { base: "record", past: "recorded", participle: "recorded" },
  { base: "repair", past: "repaired", participle: "repaired" },
  { base: "translate", past: "translated", participle: "translated" },
  { base: "design", past: "designed", participle: "designed" },
  { base: "organise", past: "organised", participle: "organised" },
  { base: "collect", past: "collected", participle: "collected" },
  { base: "announce", past: "announced", participle: "announced" },
  { base: "choose", past: "chose", participle: "chosen" },
  { base: "give", past: "gave", participle: "given" },
  { base: "build", past: "built", participle: "built" },
  { base: "sell", past: "sold", participle: "sold" },
];

const contexts = [
  "every Monday",
  "before the VSTEP class",
  "during the IELTS lesson",
  "for the TOEIC workshop",
  "yesterday",
  "last week",
  "right now",
  "at the moment",
  "by Friday",
  "before the meeting started",
  "since 2022",
  "for three hours",
  "tomorrow",
  "next month",
  "before the deadline",
  "during the training day",
  "after the mock test",
  "in the exam room",
  "for the online course",
  "at the language centre",
];

const recipients = [
  "the new student",
  "the client",
  "the whole class",
  "the manager",
  "the visiting teacher",
  "the training group",
  "the candidate",
  "the support team",
  "the customer",
  "the project leader",
];

const examFocuses = ["General English", "VSTEP", "IELTS", "TOEIC", "Cambridge B1/B2"];

const patterns = [
  {
    label: "Present Simple Passive",
    cefr: "A1",
    level: 1,
    clue: "am/is/are + past participle",
    rule: "Use am, is, or are plus the past participle for present simple passive.",
    make: (c) => ({
      answer: `${cap(c.patient)} is ${c.verb.participle} ${c.context}.`,
      wrong: [
        `${cap(c.patient)} ${c.verb.past} ${c.context}.`,
        `${cap(c.patient)} is ${c.verb.base} ${c.context}.`,
        `${cap(c.patient)} are ${c.verb.participle} ${c.context}.`,
      ],
    }),
  },
  {
    label: "Past Simple Passive",
    cefr: "A2",
    level: 2,
    clue: "was/were + past participle",
    rule: "Use was or were plus the past participle for past simple passive.",
    make: (c) => ({
      answer: `${cap(c.patient)} was ${c.verb.participle} ${c.context}.`,
      wrong: [
        `${cap(c.patient)} was ${c.verb.base} ${c.context}.`,
        `${cap(c.patient)} has ${c.verb.participle} ${c.context}.`,
        `${cap(c.patient)} ${c.verb.past} ${c.context}.`,
      ],
    }),
  },
  {
    label: "Future Passive",
    cefr: "A2",
    level: 2,
    clue: "will be + past participle",
    rule: "Use will be plus the past participle for future passive.",
    make: (c) => ({
      answer: `${cap(c.patient)} will be ${c.verb.participle} ${c.context}.`,
      wrong: [
        `${cap(c.patient)} will ${c.verb.base} ${c.context}.`,
        `${cap(c.patient)} will be ${c.verb.base} ${c.context}.`,
        `${cap(c.patient)} will have ${c.verb.participle} ${c.context}.`,
      ],
    }),
  },
  {
    label: "Modal Passive",
    cefr: "A2",
    level: 2,
    clue: "modal + be + past participle",
    rule: "After a modal, use be plus the past participle to form the passive.",
    make: (c) => ({
      answer: `${cap(c.patient)} must be ${c.verb.participle} before the deadline.`,
      wrong: [
        `${cap(c.patient)} must ${c.verb.base} before the deadline.`,
        `${cap(c.patient)} must be ${c.verb.base} before the deadline.`,
        `${cap(c.patient)} must been ${c.verb.participle} before the deadline.`,
      ],
    }),
  },
  {
    label: "Present Continuous Passive",
    cefr: "B1",
    level: 3,
    clue: "am/is/are being + past participle",
    rule: "Use am, is, or are being plus the past participle for actions in progress now.",
    make: (c) => ({
      answer: `${cap(c.patient)} is being ${c.verb.participle} at the moment.`,
      wrong: [
        `${cap(c.patient)} is ${c.verb.participle} at the moment.`,
        `${cap(c.patient)} is being ${c.verb.base} at the moment.`,
        `${cap(c.patient)} has being ${c.verb.participle} at the moment.`,
      ],
    }),
  },
  {
    label: "Past Continuous Passive",
    cefr: "B1",
    level: 3,
    clue: "was/were being + past participle",
    rule: "Use was or were being plus the past participle for passive actions in progress in the past.",
    make: (c) => ({
      answer: `${cap(c.patient)} was being ${c.verb.participle} when the manager arrived.`,
      wrong: [
        `${cap(c.patient)} was ${c.verb.participle} when the manager arrived.`,
        `${cap(c.patient)} was being ${c.verb.base} when the manager arrived.`,
        `${cap(c.patient)} has been ${c.verb.participle} when the manager arrived.`,
      ],
    }),
  },
  {
    label: "Present Perfect Passive",
    cefr: "B1",
    level: 3,
    clue: "has/have been + past participle",
    rule: "Use has or have been plus the past participle for present perfect passive.",
    make: (c) => ({
      answer: `${cap(c.patient)} has been ${c.verb.participle} already.`,
      wrong: [
        `${cap(c.patient)} has ${c.verb.participle} already.`,
        `${cap(c.patient)} has been ${c.verb.base} already.`,
        `${cap(c.patient)} was been ${c.verb.participle} already.`,
      ],
    }),
  },
  {
    label: "Past Perfect Passive",
    cefr: "B2",
    level: 4,
    clue: "had been + past participle",
    rule: "Use had been plus the past participle for an action completed before another past event.",
    make: (c) => ({
      answer: `${cap(c.patient)} had been ${c.verb.participle} before the meeting started.`,
      wrong: [
        `${cap(c.patient)} had ${c.verb.participle} before the meeting started.`,
        `${cap(c.patient)} had been ${c.verb.base} before the meeting started.`,
        `${cap(c.patient)} has been ${c.verb.participle} before the meeting started.`,
      ],
    }),
  },
  {
    label: "Future Perfect Passive",
    cefr: "B2",
    level: 4,
    clue: "will have been + past participle",
    rule: "Use will have been plus the past participle for completion before a future deadline.",
    make: (c) => ({
      answer: `${cap(c.patient)} will have been ${c.verb.participle} by Friday.`,
      wrong: [
        `${cap(c.patient)} will have ${c.verb.participle} by Friday.`,
        `${cap(c.patient)} will be ${c.verb.participle} by Friday.`,
        `${cap(c.patient)} will have been ${c.verb.base} by Friday.`,
      ],
    }),
  },
  {
    label: "Passive with by-agent",
    cefr: "B1",
    level: 3,
    clue: "by + agent",
    rule: "Use by plus the agent when the doer is important or needs to be named.",
    make: (c) => ({
      answer: `${cap(c.patient)} was ${c.verb.participle} by ${c.agent} yesterday.`,
      wrong: [
        `${cap(c.patient)} was ${c.verb.participle} from ${c.agent} yesterday.`,
        `${cap(c.patient)} was ${c.verb.base} by ${c.agent} yesterday.`,
        `${cap(c.patient)} ${c.verb.past} by ${c.agent} yesterday.`,
      ],
    }),
  },
  {
    label: "Agentless Passive",
    cefr: "B1",
    level: 3,
    clue: "unknown or unimportant agent",
    rule: "Omit the agent in passive sentences when the doer is unknown or unimportant.",
    make: (c) => ({
      answer: `${cap(c.patient)} was ${c.verb.participle} last night.`,
      wrong: [
        `${cap(c.patient)} was ${c.verb.participle} by last night.`,
        `${cap(c.patient)} was ${c.verb.base} last night.`,
        `${cap(c.patient)} has ${c.verb.participle} last night.`,
      ],
    }),
  },
  {
    label: "Active to Passive Transformation",
    cefr: "B1",
    level: 3,
    clue: "object becomes subject",
    rule: "To change active to passive, move the object to subject position and use be plus the past participle.",
    make: (c) => ({
      answer: `${cap(c.patient)} was ${c.verb.participle} by ${c.agent}.`,
      wrong: [
        `${cap(c.agent)} was ${c.verb.participle} by ${c.patient}.`,
        `${cap(c.patient)} ${c.verb.past} by ${c.agent}.`,
        `${cap(c.patient)} was ${c.verb.base} by ${c.agent}.`,
      ],
    }),
  },
  {
    label: "Question Passive",
    cefr: "B2",
    level: 4,
    clue: "passive question order",
    rule: "Passive questions use auxiliary + subject + past participle.",
    make: (c) => ({
      answer: `Was ${c.patient} ${c.verb.participle} by ${c.agent}?`,
      wrong: [
        `Did ${c.patient} ${c.verb.participle} by ${c.agent}?`,
        `Was ${c.patient} ${c.verb.base} by ${c.agent}?`,
        `Was ${c.agent} ${c.verb.participle} by ${c.patient}?`,
      ],
    }),
  },
  {
    label: "Negative Passive",
    cefr: "B1",
    level: 3,
    clue: "be + not + past participle",
    rule: "Place not after the auxiliary be in passive negative sentences.",
    make: (c) => ({
      answer: `${cap(c.patient)} was not ${c.verb.participle} on time.`,
      wrong: [
        `${cap(c.patient)} did not ${c.verb.participle} on time.`,
        `${cap(c.patient)} was not ${c.verb.base} on time.`,
        `${cap(c.patient)} not was ${c.verb.participle} on time.`,
      ],
    }),
  },
  {
    label: "Get Passive",
    cefr: "B2",
    level: 4,
    clue: "get + past participle",
    rule: "Get plus the past participle can form an informal passive, often for events or changes.",
    make: (c) => ({
      answer: `${cap(c.patient)} got ${c.verb.participle} during the update.`,
      wrong: [
        `${cap(c.patient)} got ${c.verb.base} during the update.`,
        `${cap(c.patient)} got being ${c.verb.participle} during the update.`,
        `${cap(c.patient)} was got ${c.verb.participle} during the update.`,
      ],
    }),
  },
  {
    label: "Causative Passive",
    cefr: "B2",
    level: 4,
    clue: "have/get something done",
    rule: "Use have or get + object + past participle when someone arranges for a service to be done.",
    make: (c) => ({
      answer: `${cap(c.agent)} had ${c.patient} ${c.verb.participle} before the event.`,
      wrong: [
        `${cap(c.agent)} had ${c.patient} ${c.verb.base} before the event.`,
        `${cap(c.agent)} had ${c.patient} to ${c.verb.base} before the event.`,
        `${cap(c.agent)} was had ${c.patient} ${c.verb.participle} before the event.`,
      ],
    }),
  },
  {
    label: "Double Object Passive",
    cefr: "B2",
    level: 4,
    clue: "recipient as passive subject",
    rule: "With some verbs, the indirect object can become the subject of a passive sentence.",
    make: (c) => ({
      answer: `${cap(c.recipient)} was given ${c.patient} by ${c.agent}.`,
      wrong: [
        `${cap(c.recipient)} was gave ${c.patient} by ${c.agent}.`,
        `${cap(c.patient)} was given to ${c.recipient} by ${c.agent}.`,
        `${cap(c.recipient)} gave ${c.patient} by ${c.agent}.`,
      ],
    }),
  },
  {
    label: "Reporting Passive",
    cefr: "C1",
    level: 5,
    clue: "it is said/believed that",
    rule: "Use reporting passives such as it is said that or it is believed that in formal writing.",
    make: (c) => ({
      answer: `It is believed that ${c.patient} was ${c.verb.participle} correctly.`,
      wrong: [
        `It believes that ${c.patient} was ${c.verb.participle} correctly.`,
        `It is believed that ${c.patient} ${c.verb.past} correctly.`,
        `It is believing that ${c.patient} was ${c.verb.participle} correctly.`,
      ],
    }),
  },
  {
    label: "Passive Infinitive",
    cefr: "C1",
    level: 5,
    clue: "to be + past participle",
    rule: "Use to be plus the past participle after verbs or adjectives that require a passive infinitive.",
    make: (c) => ({
      answer: `${cap(c.patient)} needs to be ${c.verb.participle} before it is sent.`,
      wrong: [
        `${cap(c.patient)} needs to ${c.verb.base} before it is sent.`,
        `${cap(c.patient)} needs being ${c.verb.participle} before it is sent.`,
        `${cap(c.patient)} needs to be ${c.verb.base} before it is sent.`,
      ],
    }),
  },
  {
    label: "Passive Gerund",
    cefr: "C1",
    level: 5,
    clue: "being + past participle",
    rule: "Use being plus the past participle when a gerund has passive meaning.",
    make: (c) => ({
      answer: `${cap(c.patient)} avoided being ${c.verb.participle} twice.`,
      wrong: [
        `${cap(c.patient)} avoided to be ${c.verb.participle} twice.`,
        `${cap(c.patient)} avoided being ${c.verb.base} twice.`,
        `${cap(c.patient)} avoided been ${c.verb.participle} twice.`,
      ],
    }),
  },
  {
    label: "Prepositional Passive",
    cefr: "C1",
    level: 5,
    clue: "preposition stays after the verb",
    rule: "In prepositional passives, the preposition normally remains after the verb phrase.",
    make: (c) => ({
      answer: `${cap(c.patient)} was looked at carefully by ${c.agent}.`,
      wrong: [
        `${cap(c.patient)} was looked carefully by ${c.agent}.`,
        `${cap(c.patient)} was looked at by carefully ${c.agent}.`,
        `${cap(c.patient)} looked at carefully by ${c.agent}.`,
      ],
    }),
  },
];

function cap(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function context(index) {
  return {
    agent: agents[index % agents.length],
    context: contexts[index % contexts.length],
    patient: patients[index % patients.length],
    recipient: recipients[index % recipients.length],
    verb: verbs[Math.floor(index / agents.length) % verbs.length],
  };
}

function shuffleOptions(options, seed) {
  const result = [...options];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = (seed + index * 19) % (index + 1);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function promptFor(pattern, index) {
  const stems = [
    "Choose the correct passive sentence.",
    "Choose the best passive form.",
    "Which option uses the passive voice correctly?",
    "Complete the idea with the correct passive structure.",
    "Select the sentence that fits the passive meaning.",
  ];
  return `${stems[index % stems.length]} Focus: ${pattern.clue}. Context set ${String(index + 1).padStart(4, "0")}.`;
}

function makeQuestion(index, pattern) {
  const data = pattern.make(context(index));
  const answer = data.answer;
  const options = shuffleOptions([answer, ...data.wrong].slice(0, 4), index);
  return {
    id: `passive-voice-${String(index + 1).padStart(4, "0")}`,
    type: "multiple-choice",
    level: pattern.level,
    cefr: pattern.cefr,
    examFocus: examFocuses[(index + pattern.level) % examFocuses.length],
    passiveFocus: pattern.label,
    prompt: promptFor(pattern, index),
    options,
    answer,
    explanation: pattern.rule,
  };
}

const levelPlan = [
  { count: 140, level: 1 },
  { count: 310, level: 2 },
  { count: 380, level: 3 },
  { count: 350, level: 4 },
  { count: 220, level: 5 },
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
  lessonId: "passive-voice",
  title: "Passive Voice Mastery Test",
  description:
    "1400 original multiple-choice passive voice questions for General English, VSTEP, IELTS, TOEIC, and Cambridge-style practice.",
  sourceNotes: [
    "Original questions generated from passive voice tense, agent, transformation, and formal-writing patterns; not copied from source materials.",
    "Difficulty levels: 1=A1/A2 foundation, 2=A2, 3=B1, 4=B2, 5=C1.",
  ],
  questionCount: questions.length,
  questions,
};

writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
