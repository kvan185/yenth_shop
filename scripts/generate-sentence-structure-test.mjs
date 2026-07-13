import { writeFileSync } from "node:fs";

const outputPath = "data/grammar-tests/sentence-structure.json";

const subjects = [
  "The student",
  "My sister",
  "The teacher",
  "The manager",
  "The team",
  "The app",
  "The researcher",
  "The candidate",
  "The company",
  "The committee",
  "The guide",
  "The speaker",
  "The report",
  "The lesson",
  "The workshop",
  "The designer",
  "The volunteer",
  "The customer",
  "The editor",
  "The coach",
];

const pluralSubjects = [
  "The students",
  "My classmates",
  "The teachers",
  "The managers",
  "The teams",
  "The researchers",
  "The candidates",
  "The companies",
  "The visitors",
  "The speakers",
];

const verbs = [
  { base: "review", third: "reviews", past: "reviewed", object: "the lesson" },
  { base: "explain", third: "explains", past: "explained", object: "the rule" },
  { base: "write", third: "writes", past: "wrote", object: "the essay" },
  { base: "prepare", third: "prepares", past: "prepared", object: "the report" },
  { base: "submit", third: "submits", past: "submitted", object: "the form" },
  { base: "check", third: "checks", past: "checked", object: "the answers" },
  { base: "update", third: "updates", past: "updated", object: "the schedule" },
  { base: "read", third: "reads", past: "read", object: "the article" },
  { base: "analyse", third: "analyses", past: "analysed", object: "the chart" },
  { base: "solve", third: "solves", past: "solved", object: "the problem" },
  { base: "organise", third: "organises", past: "organised", object: "the event" },
  { base: "send", third: "sends", past: "sent", object: "the email" },
  { base: "lead", third: "leads", past: "led", object: "the discussion" },
  { base: "attend", third: "attends", past: "attended", object: "the meeting" },
  { base: "design", third: "designs", past: "designed", object: "the course" },
  { base: "compare", third: "compares", past: "compared", object: "the results" },
  { base: "translate", third: "translates", past: "translated", object: "the passage" },
  { base: "record", third: "records", past: "recorded", object: "the answer" },
  { base: "choose", third: "chooses", past: "chose", object: "the topic" },
  { base: "correct", third: "corrects", past: "corrected", object: "the mistake" },
];

const complements = [
  "useful",
  "clear",
  "important",
  "ready",
  "accurate",
  "complete",
  "confident",
  "successful",
  "popular",
  "available",
  "well organised",
  "easy to follow",
  "hard to ignore",
  "suitable for beginners",
  "helpful for exam practice",
];

const indirectObjects = [
  "the class",
  "the client",
  "her friend",
  "the teacher",
  "the team",
  "the visitor",
  "the new student",
  "the manager",
  "the group",
  "the examiner",
];

const directObjects = [
  "a clear answer",
  "a useful example",
  "a short report",
  "a new plan",
  "a practice test",
  "a detailed email",
  "a helpful note",
  "a better option",
  "a final copy",
  "a simple explanation",
];

const places = [
  "in the library",
  "at the language centre",
  "during the workshop",
  "after the mock test",
  "before the interview",
  "on the course website",
  "in the classroom",
  "at the office",
  "during the training session",
  "before the final exam",
  "after the listening task",
  "in the online forum",
  "at the study club",
  "during the morning lesson",
  "after the writing task",
  "before the team meeting",
  "in the exam room",
  "at the reception desk",
  "during the speaking test",
  "after the grammar review",
  "for the VSTEP class",
  "for the IELTS lesson",
  "for the TOEIC workshop",
  "for the Cambridge practice test",
  "for the weekly quiz",
];

const clauses = [
  "because the deadline was close",
  "although the topic was difficult",
  "when the teacher gave feedback",
  "while the class was waiting",
  "if the instructions are clear",
  "because the data was incomplete",
  "although the room was noisy",
  "when the meeting ended",
  "while the examiner was speaking",
  "if the plan changes",
];

const relativeClauses = [
  "who joined the course last month",
  "who needed extra practice",
  "which was published yesterday",
  "which explained the main idea",
  "that the teacher recommended",
  "that helped the group",
  "whose essay won the prize",
  "whose notes were very clear",
  "where we took the mock test",
  "where the workshop was held",
];

const adverbs = [
  "carefully",
  "clearly",
  "quickly",
  "regularly",
  "politely",
  "accurately",
  "confidently",
  "quietly",
  "successfully",
  "patiently",
];

const adjectives = [
  ["small", "blue", "digital"],
  ["useful", "new", "grammar"],
  ["clear", "short", "practice"],
  ["large", "old", "wooden"],
  ["helpful", "online", "learning"],
  ["interesting", "modern", "English"],
  ["simple", "daily", "review"],
  ["detailed", "written", "feedback"],
  ["important", "final", "exam"],
  ["friendly", "local", "study"],
];

const nouns = [
  "tool",
  "guide",
  "task",
  "desk",
  "platform",
  "article",
  "plan",
  "comment",
  "question",
  "group",
];

const examFocuses = ["General English", "VSTEP", "IELTS", "TOEIC", "Cambridge B1/B2"];

const patterns = [
  {
    label: "SVO word order",
    cefr: "A1",
    level: 1,
    rule: "A basic English statement usually follows subject + verb + object.",
    make: (c) => ({
      answer: `${c.subject} ${c.verb.third} ${c.verb.object} ${c.place}.`,
      wrong: [
        `${c.verb.third} ${c.subject} ${c.verb.object} ${c.place}.`,
        `${c.subject} ${c.verb.object} ${c.verb.third} ${c.place}.`,
        `${c.verb.object} ${c.subject} ${c.verb.third} ${c.place}.`,
      ],
    }),
  },
  {
    label: "SV pattern",
    cefr: "A1",
    level: 1,
    rule: "An intransitive verb can form a sentence with only a subject and verb.",
    make: (c) => ({
      answer: `${c.subject} arrived ${c.place}.`,
      wrong: [
        `${c.subject} arrived the report ${c.place}.`,
        `Arrived ${c.subject} ${c.place}.`,
        `${c.subject} was arrived ${c.place}.`,
      ],
    }),
  },
  {
    label: "SVC linking verb",
    cefr: "A1",
    level: 1,
    rule: "A linking verb such as be, seem, or become is followed by a complement.",
    make: (c) => ({
      answer: `${c.subject} is ${c.complement} ${c.place}.`,
      wrong: [
        `${c.subject} is ${c.verb.object} ${c.complement}.`,
        `${c.subject} ${c.complement} is ${c.place}.`,
        `${c.subject} does ${c.complement} ${c.place}.`,
      ],
    }),
  },
  {
    label: "SVOO indirect object",
    cefr: "A2",
    level: 2,
    rule: "Some verbs can take an indirect object before a direct object.",
    make: (c) => ({
      answer: `${c.subject} gave ${c.indirectObject} ${c.directObject} ${c.place}.`,
      wrong: [
        `${c.subject} gave ${c.directObject} ${c.indirectObject} ${c.place}.`,
        `${c.subject} gave to ${c.indirectObject} ${c.directObject} ${c.place}.`,
        `${c.subject} gave ${c.indirectObject} to ${c.directObject} ${c.place}.`,
      ],
    }),
  },
  {
    label: "Direct object plus prepositional complement",
    cefr: "A2",
    level: 2,
    rule: "Use direct object + to/for + recipient when the recipient is expressed as a prepositional phrase.",
    make: (c) => ({
      answer: `${c.subject} sent ${c.directObject} to ${c.indirectObject} ${c.place}.`,
      wrong: [
        `${c.subject} sent to ${c.indirectObject} ${c.directObject} ${c.place}.`,
        `${c.subject} sent ${c.indirectObject} to ${c.directObject} ${c.place}.`,
        `${c.subject} sent ${c.directObject} ${c.indirectObject} to ${c.place}.`,
      ],
    }),
  },
  {
    label: "SVOC object complement",
    cefr: "B1",
    level: 3,
    rule: "Object complements describe or rename the object after verbs such as make, find, or consider.",
    make: (c) => ({
      answer: `${c.subject} found ${c.directObject} ${c.complement} ${c.place}.`,
      wrong: [
        `${c.subject} found ${c.complement} ${c.directObject} ${c.place}.`,
        `${c.subject} found that ${c.directObject} ${c.place} ${c.complement}.`,
        `${c.subject} found ${c.directObject} was ${c.place} ${c.complement}.`,
      ],
    }),
  },
  {
    label: "Question word order",
    cefr: "A2",
    level: 2,
    rule: "Questions usually use auxiliary + subject + base verb.",
    make: (c) => ({
      answer: `Did ${lowerFirst(c.subject)} ${c.verb.base} ${c.verb.object} ${c.place}?`,
      wrong: [
        `Did ${lowerFirst(c.subject)} ${c.verb.past} ${c.verb.object} ${c.place}?`,
        `${c.subject} did ${c.verb.base} ${c.verb.object} ${c.place}?`,
        `Does ${lowerFirst(c.subject)} ${c.verb.past} ${c.verb.object} ${c.place}?`,
      ],
    }),
  },
  {
    label: "Negative word order",
    cefr: "A2",
    level: 2,
    rule: "Use does not plus the base verb with a singular third-person subject.",
    make: (c) => ({
      answer: `${c.subject} does not ${c.verb.base} ${c.verb.object} ${c.place}.`,
      wrong: [
        `${c.subject} does not ${c.verb.third} ${c.verb.object} ${c.place}.`,
        `${c.subject} do not ${c.verb.base} ${c.verb.object} ${c.place}.`,
        `${c.subject} not does ${c.verb.base} ${c.verb.object} ${c.place}.`,
      ],
    }),
  },
  {
    label: "Complete sentence vs fragment",
    cefr: "A2",
    level: 2,
    rule: "A complete sentence needs an independent clause with a subject and a finite verb.",
    make: (c) => ({
      answer: `${c.subject} ${c.verb.past} ${c.verb.object} ${c.place}.`,
      wrong: [
        `Because ${c.subject.toLowerCase()} ${c.verb.past} ${c.verb.object}.`,
        `After ${c.verb.past} ${c.verb.object} ${c.place}.`,
        `${c.verb.object} ${c.place}.`,
      ],
    }),
  },
  {
    label: "Compound sentence punctuation",
    cefr: "B1",
    level: 3,
    rule: "Join two independent clauses with a comma plus a coordinating conjunction or with a semicolon.",
    make: (c) => ({
      answer: `${c.subject} ${c.verb.past} ${c.verb.object}, and ${c.pluralSubject.toLowerCase()} checked the details.`,
      wrong: [
        `${c.subject} ${c.verb.past} ${c.verb.object}, ${c.pluralSubject.toLowerCase()} checked the details.`,
        `${c.subject} ${c.verb.past} ${c.verb.object} and checked the details ${c.pluralSubject.toLowerCase()}.`,
        `${c.subject} ${c.verb.past} ${c.verb.object}, and checking the details.`,
      ],
    }),
  },
  {
    label: "Complex sentence",
    cefr: "B1",
    level: 3,
    rule: "A dependent clause can be joined to an independent clause to make a complex sentence.",
    make: (c) => ({
      answer: `${capitalise(c.clause)}, ${c.subject.toLowerCase()} ${c.verb.past} ${c.verb.object}.`,
      wrong: [
        `${capitalise(c.clause)}. ${c.subject} ${c.verb.past} ${c.verb.object}.`,
        `${c.subject} ${c.verb.past} ${c.verb.object}, because.`,
        `${capitalise(c.clause)}, and ${c.verb.past} ${c.verb.object}.`,
      ],
    }),
  },
  {
    label: "Relative clause placement",
    cefr: "B1",
    level: 3,
    rule: "Place a relative clause next to the noun it describes.",
    make: (c) => ({
      answer: `${c.subject} helped the candidate ${c.relativeClause} ${c.place}.`,
      wrong: [
        `${c.subject} helped the candidate ${c.place} ${c.relativeClause}.`,
        `${c.subject} ${c.relativeClause} helped the candidate ${c.place}.`,
        `${c.relativeClause} ${c.subject} helped the candidate ${c.place}.`,
      ],
    }),
  },
  {
    label: "Adverb placement",
    cefr: "B1",
    level: 3,
    rule: "Adverbs of manner usually come after the object or after the verb if there is no object.",
    make: (c) => ({
      answer: `${c.subject} ${c.verb.past} ${c.verb.object} ${c.adverb}.`,
      wrong: [
        `${c.subject} ${c.adverb} ${c.verb.object} ${c.verb.past}.`,
        `${c.subject} ${c.verb.past} ${c.adverb} ${c.verb.object}.`,
        `${c.adverb} ${c.verb.object} ${c.subject} ${c.verb.past}.`,
      ],
    }),
  },
  {
    label: "Adjective order",
    cefr: "B1",
    level: 3,
    rule: "Adjectives normally follow a conventional order before the noun.",
    make: (c) => ({
      answer: `${c.subject} chose a ${c.adj[0]} ${c.adj[1]} ${c.adj[2]} ${c.noun}.`,
      wrong: [
        `${c.subject} chose a ${c.adj[2]} ${c.adj[1]} ${c.adj[0]} ${c.noun}.`,
        `${c.subject} chose a ${c.noun} ${c.adj[0]} ${c.adj[1]} ${c.adj[2]}.`,
        `${c.subject} chose a ${c.adj[1]} ${c.adj[2]} ${c.adj[0]} ${c.noun}.`,
      ],
    }),
  },
  {
    label: "Parallel structure",
    cefr: "B2",
    level: 4,
    rule: "Items in a list should use parallel grammatical forms.",
    make: (c) => ({
      answer: `${c.subject} likes reading articles, taking notes, and reviewing examples.`,
      wrong: [
        `${c.subject} likes reading articles, to take notes, and reviewing examples.`,
        `${c.subject} likes to read articles, taking notes, and examples reviewed.`,
        `${c.subject} likes articles, taking notes, and to review examples.`,
      ],
    }),
  },
  {
    label: "Cleft sentence",
    cefr: "B2",
    level: 4,
    rule: "An it-cleft uses it + be + focused phrase + that-clause.",
    make: (c) => ({
      answer: `It was ${c.verb.object} that ${c.subject.toLowerCase()} ${c.verb.past} ${c.place}.`,
      wrong: [
        `It was that ${c.verb.object} ${c.subject.toLowerCase()} ${c.verb.past} ${c.place}.`,
        `Was it ${c.verb.object} that ${c.subject.toLowerCase()} ${c.verb.past} ${c.place}.`,
        `It ${c.verb.object} was that ${c.subject.toLowerCase()} ${c.verb.past} ${c.place}.`,
      ],
    }),
  },
  {
    label: "There as introductory subject",
    cefr: "B1",
    level: 3,
    rule: "Use there is or there are to introduce new information.",
    make: (c) => ({
      answer: `There are several useful examples ${c.place}.`,
      wrong: [
        `There is several useful examples ${c.place}.`,
        `Are several useful examples there ${c.place}.`,
        `Several useful examples there are ${c.place}.`,
      ],
    }),
  },
  {
    label: "Inversion after negative adverbial",
    cefr: "C1",
    level: 5,
    rule: "After fronted negative adverbials, use auxiliary + subject inversion.",
    make: (c) => ({
      answer: `Rarely does ${lowerFirst(c.subject)} ${c.verb.base} ${c.verb.object} without checking the instructions.`,
      wrong: [
        `Rarely ${c.subject.toLowerCase()} ${c.verb.third} ${c.verb.object} without checking the instructions.`,
        `Rarely does ${lowerFirst(c.subject)} ${c.verb.third} ${c.verb.object} without checking the instructions.`,
        `Rarely ${c.verb.third} ${c.subject.toLowerCase()} ${c.verb.object} without checking the instructions.`,
      ],
    }),
  },
  {
    label: "Reduced clause",
    cefr: "B2",
    level: 4,
    rule: "A reduced participle clause can replace a full relative clause when the meaning is clear.",
    make: (c) => ({
      answer: `The notes written by ${lowerFirst(c.subject)} were clear and concise.`,
      wrong: [
        `The notes writing by ${lowerFirst(c.subject)} were clear and concise.`,
        `The notes were written by ${lowerFirst(c.subject)} were clear and concise.`,
        `The notes wrote by ${lowerFirst(c.subject)} were clear and concise.`,
      ],
    }),
  },
  {
    label: "Noun clause as subject",
    cefr: "C1",
    level: 5,
    rule: "A noun clause can function as the subject of a sentence.",
    make: (c) => ({
      answer: `What ${c.subject.toLowerCase()} needs most is consistent practice.`,
      wrong: [
        `What does ${c.subject.toLowerCase()} need most is consistent practice.`,
        `What ${c.subject.toLowerCase()} needs most are consistent practice.`,
        `That what ${c.subject.toLowerCase()} needs most is consistent practice.`,
      ],
    }),
  },
];

function lowerFirst(value) {
  return value.charAt(0).toLowerCase() + value.slice(1);
}

function capitalise(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function shuffleOptions(options, seed) {
  const result = options.map((option) => capitalise(option));
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = (seed + index * 11) % (index + 1);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function context(index) {
  return {
    adverb: adverbs[index % adverbs.length],
    adj: adjectives[index % adjectives.length],
    clause: clauses[index % clauses.length],
    complement: complements[index % complements.length],
    directObject: directObjects[index % directObjects.length],
    indirectObject: indirectObjects[index % indirectObjects.length],
    noun: nouns[index % nouns.length],
    place: places[index % places.length],
    pluralSubject: pluralSubjects[index % pluralSubjects.length],
    relativeClause: relativeClauses[index % relativeClauses.length],
    subject: subjects[index % subjects.length],
    verb: verbs[Math.floor(index / subjects.length) % verbs.length],
  };
}

function makeQuestion(index, pattern) {
  const data = pattern.make(context(index));
  const answer = data.answer;
  const options = shuffleOptions([answer, ...data.wrong].slice(0, 4), index);
  return {
    id: `sentence-structure-${String(index + 1).padStart(4, "0")}`,
    type: "multiple-choice",
    level: pattern.level,
    cefr: pattern.cefr,
    examFocus: examFocuses[(index + pattern.level) % examFocuses.length],
    structureFocus: pattern.label,
    prompt: `Choose the sentence with correct structure. Focus: ${pattern.label}. Context set ${String(index + 1).padStart(4, "0")}.`,
    options,
    answer,
    explanation: pattern.rule,
  };
}

const questions = Array.from({ length: 1000 }, (_, index) => {
  const pattern = patterns[index % patterns.length];
  return makeQuestion(index, pattern);
});

const uniqueItems = new Set(questions.map((item) => `${item.prompt}::${item.answer}`));
if (uniqueItems.size !== questions.length) {
  throw new Error(`Duplicate generated questions: ${questions.length - uniqueItems.size}`);
}

const payload = {
  lessonId: "sentence-structure",
  title: "Sentence Structure Mastery Test",
  description:
    "1000 original multiple-choice sentence-structure questions for General English, VSTEP, IELTS, TOEIC, and Cambridge-style practice.",
  sourceNotes: [
    "Original questions generated from sentence-pattern, word-order, clause, and exam Use-of-English patterns; not copied from source materials.",
    "Difficulty levels: 1=A1/A2 foundation, 2=A2, 3=B1, 4=B2, 5=C1.",
  ],
  questionCount: questions.length,
  questions,
};

writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
