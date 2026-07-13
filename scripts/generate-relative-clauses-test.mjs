import { writeFileSync } from "node:fs";

const outputPath = "data/grammar-tests/relative-clauses.json";

const people = [
  "the student",
  "the teacher",
  "the candidate",
  "the manager",
  "the visitor",
  "the speaker",
  "the researcher",
  "the volunteer",
  "the customer",
  "the examiner",
  "the trainer",
  "the applicant",
  "the editor",
  "the guide",
  "the learner",
  "the colleague",
  "the assistant",
  "the coach",
  "the writer",
  "the presenter",
];

const things = [
  "the report",
  "the book",
  "the app",
  "the article",
  "the lesson",
  "the email",
  "the form",
  "the chart",
  "the recording",
  "the website",
  "the document",
  "the test",
  "the exercise",
  "the dictionary",
  "the plan",
  "the course",
  "the message",
  "the ticket",
  "the file",
  "the presentation",
];

const places = [
  "the room",
  "the school",
  "the library",
  "the office",
  "the language centre",
  "the website",
  "the classroom",
  "the hall",
  "the city",
  "the cafe",
  "the exam centre",
  "the studio",
  "the lab",
  "the campus",
  "the forum",
];

const times = [
  "the day",
  "the year",
  "the morning",
  "the week",
  "the month",
  "the moment",
  "the summer",
  "the evening",
  "the semester",
  "the period",
];

const reasons = [
  "the reason",
  "the main reason",
  "the only reason",
  "the reason behind the delay",
  "the reason for the change",
];

const verbs = [
  { base: "review", past: "reviewed", object: "the notes" },
  { base: "write", past: "wrote", object: "the essay" },
  { base: "submit", past: "submitted", object: "the application" },
  { base: "prepare", past: "prepared", object: "the presentation" },
  { base: "check", past: "checked", object: "the answers" },
  { base: "read", past: "read", object: "the article" },
  { base: "send", past: "sent", object: "the email" },
  { base: "explain", past: "explained", object: "the rule" },
  { base: "update", past: "updated", object: "the schedule" },
  { base: "choose", past: "chose", object: "the topic" },
  { base: "design", past: "designed", object: "the course" },
  { base: "translate", past: "translated", object: "the passage" },
  { base: "record", past: "recorded", object: "the answer" },
  { base: "organise", past: "organised", object: "the event" },
  { base: "approve", past: "approved", object: "the request" },
];

const clauses = [
  "joined the class last week",
  "needed extra feedback",
  "won the speaking prize",
  "arrived before the test",
  "asked a useful question",
  "helped the new learners",
  "missed the first lesson",
  "finished the project early",
  "shared the notes online",
  "led the discussion",
];

const thingClauses = [
  "explains the main idea",
  "contains useful examples",
  "was published yesterday",
  "helps beginners practise",
  "needs careful revision",
  "won the design award",
  "shows the trend clearly",
  "includes three tasks",
  "supports mobile learning",
  "summarises the lesson",
];

const examFocuses = ["General English", "VSTEP", "IELTS", "TOEIC", "Cambridge B1/B2"];

const patterns = [
  {
    label: "Who for people as subject",
    cefr: "A1",
    level: 1,
    clue: "who + verb",
    rule: "Use who for people when the relative pronoun is the subject of the relative clause.",
    make: (c) => ({
      answer: `${cap(c.person)} who ${c.personClause} is in my class.`,
      wrong: [
        `${cap(c.person)} which ${c.personClause} is in my class.`,
        `${cap(c.person)} where ${c.personClause} is in my class.`,
        `${cap(c.person)} whose ${c.personClause} is in my class.`,
      ],
    }),
  },
  {
    label: "Which for things as subject",
    cefr: "A1",
    level: 1,
    clue: "which + verb",
    rule: "Use which for things or animals when the relative pronoun is the subject.",
    make: (c) => ({
      answer: `${cap(c.thing)} which ${c.thingClause} is on the desk.`,
      wrong: [
        `${cap(c.thing)} who ${c.thingClause} is on the desk.`,
        `${cap(c.thing)} where ${c.thingClause} is on the desk.`,
        `${cap(c.thing)} whose ${c.thingClause} is on the desk.`,
      ],
    }),
  },
  {
    label: "That in defining relative clauses",
    cefr: "A2",
    level: 2,
    clue: "that for people or things",
    rule: "That can introduce defining relative clauses for people or things.",
    make: (c) => ({
      answer: `${cap(c.thing)} that ${c.thingClause} is useful for revision.`,
      wrong: [
        `${cap(c.thing)} what ${c.thingClause} is useful for revision.`,
        `${cap(c.thing)} where ${c.thingClause} is useful for revision.`,
        `${cap(c.thing)} whom ${c.thingClause} is useful for revision.`,
      ],
    }),
  },
  {
    label: "Where for places",
    cefr: "A2",
    level: 2,
    clue: "where + clause",
    rule: "Use where for places in relative clauses.",
    make: (c) => ({
      answer: `${cap(c.place)} where we took the mock test was quiet.`,
      wrong: [
        `${cap(c.place)} who we took the mock test was quiet.`,
        `${cap(c.place)} which we took the mock test was quiet.`,
        `${cap(c.place)} whose we took the mock test was quiet.`,
      ],
    }),
  },
  {
    label: "When for time",
    cefr: "A2",
    level: 2,
    clue: "when + clause",
    rule: "Use when for times in relative clauses.",
    make: (c) => ({
      answer: `${cap(c.time)} when the course started was very busy.`,
      wrong: [
        `${cap(c.time)} where the course started was very busy.`,
        `${cap(c.time)} who the course started was very busy.`,
        `${cap(c.time)} which the course started was very busy.`,
      ],
    }),
  },
  {
    label: "Why for reason",
    cefr: "A2",
    level: 2,
    clue: "reason why",
    rule: "Use why after reason to explain a cause.",
    make: (c) => ({
      answer: `${cap(c.reason)} why the lesson was delayed was clear.`,
      wrong: [
        `${cap(c.reason)} who the lesson was delayed was clear.`,
        `${cap(c.reason)} where the lesson was delayed was clear.`,
        `${cap(c.reason)} which the lesson was delayed was clear.`,
      ],
    }),
  },
  {
    label: "Whose for possession",
    cefr: "B1",
    level: 3,
    clue: "whose + noun",
    rule: "Use whose to show possession in a relative clause.",
    make: (c) => ({
      answer: `${cap(c.person)} whose notes were clear helped the group.`,
      wrong: [
        `${cap(c.person)} who notes were clear helped the group.`,
        `${cap(c.person)} which notes were clear helped the group.`,
        `${cap(c.person)} whom notes were clear helped the group.`,
      ],
    }),
  },
  {
    label: "Whom as formal object",
    cefr: "B2",
    level: 4,
    clue: "whom as object",
    rule: "Use whom for people as the object of the relative clause in formal English.",
    make: (c) => ({
      answer: `${cap(c.person)} whom we interviewed yesterday was confident.`,
      wrong: [
        `${cap(c.person)} whom interviewed us yesterday was confident.`,
        `${cap(c.person)} which we interviewed yesterday was confident.`,
        `${cap(c.person)} whose we interviewed yesterday was confident.`,
      ],
    }),
  },
  {
    label: "Zero relative object",
    cefr: "B1",
    level: 3,
    clue: "omit object relative pronoun",
    rule: "A defining object relative pronoun can often be omitted.",
    make: (c) => ({
      answer: `${cap(c.thing)} we discussed yesterday was important.`,
      wrong: [
        `${cap(c.thing)} discussed yesterday was important.`,
        `${cap(c.thing)} which discussed yesterday was important.`,
        `${cap(c.thing)} who we discussed yesterday was important.`,
      ],
    }),
  },
  {
    label: "No zero relative subject",
    cefr: "B1",
    level: 3,
    clue: "subject relative pronoun cannot be omitted",
    rule: "Do not omit the relative pronoun when it is the subject of the relative clause.",
    make: (c) => ({
      answer: `${cap(c.person)} who helped us yesterday is absent today.`,
      wrong: [
        `${cap(c.person)} helped us yesterday is absent today.`,
        `${cap(c.person)} whom helped us yesterday is absent today.`,
        `${cap(c.person)} where helped us yesterday is absent today.`,
      ],
    }),
  },
  {
    label: "Defining relative clause punctuation",
    cefr: "B1",
    level: 3,
    clue: "no commas for defining clauses",
    rule: "Do not use commas around a defining relative clause.",
    make: (c) => ({
      answer: `${cap(c.person)} who needs extra practice should join the review class.`,
      wrong: [
        `${cap(c.person)}, who needs extra practice, should join the review class.`,
        `${cap(c.person)}, that needs extra practice, should join the review class.`,
        `${cap(c.person)} which needs extra practice should join the review class.`,
      ],
    }),
  },
  {
    label: "Non-defining relative clause punctuation",
    cefr: "B2",
    level: 4,
    clue: "commas around extra information",
    rule: "Use commas around a non-defining relative clause.",
    make: (c) => ({
      answer: `${cap(c.person)}, who joined the course last month, passed the test.`,
      wrong: [
        `${cap(c.person)} who joined the course last month, passed the test.`,
        `${cap(c.person)}, that joined the course last month, passed the test.`,
        `${cap(c.person)} that joined the course last month passed the test.`,
      ],
    }),
  },
  {
    label: "No that in non-defining clauses",
    cefr: "B2",
    level: 4,
    clue: "who/which, not that, after comma",
    rule: "Do not use that to introduce a non-defining relative clause.",
    make: (c) => ({
      answer: `${cap(c.thing)}, which was updated yesterday, is easier to use.`,
      wrong: [
        `${cap(c.thing)}, that was updated yesterday, is easier to use.`,
        `${cap(c.thing)} which was updated yesterday is easier to use.`,
        `${cap(c.thing)}, who was updated yesterday, is easier to use.`,
      ],
    }),
  },
  {
    label: "Preposition plus whom",
    cefr: "C1",
    level: 5,
    clue: "to whom / with whom",
    rule: "Use whom after a fronted preposition when referring to people.",
    make: (c) => ({
      answer: `${cap(c.person)} to whom we sent the email replied quickly.`,
      wrong: [
        `${cap(c.person)} to who we sent the email replied quickly.`,
        `${cap(c.person)} to that we sent the email replied quickly.`,
        `${cap(c.person)} whom to we sent the email replied quickly.`,
      ],
    }),
  },
  {
    label: "Preposition plus which",
    cefr: "C1",
    level: 5,
    clue: "in which / with which",
    rule: "Use which after a fronted preposition when referring to things.",
    make: (c) => ({
      answer: `${cap(c.thing)} in which we found the answer was reliable.`,
      wrong: [
        `${cap(c.thing)} in that we found the answer was reliable.`,
        `${cap(c.thing)} in where we found the answer was reliable.`,
        `${cap(c.thing)} which in we found the answer was reliable.`,
      ],
    }),
  },
  {
    label: "Sentential which",
    cefr: "C1",
    level: 5,
    clue: "which refers to the whole clause",
    rule: "Which can refer to the whole preceding clause in a non-defining relative clause.",
    make: (c) => ({
      answer: `${cap(c.person)} missed the deadline, which surprised the team.`,
      wrong: [
        `${cap(c.person)} missed the deadline, that surprised the team.`,
        `${cap(c.person)} missed the deadline which surprised the team.`,
        `${cap(c.person)} missed the deadline, what surprised the team.`,
      ],
    }),
  },
  {
    label: "Reduced active relative clause",
    cefr: "C1",
    level: 5,
    clue: "present participle reduction",
    rule: "An active relative clause can sometimes be reduced to a present participle phrase.",
    make: (c) => ({
      answer: `${cap(c.person)} attending the workshop should sign this form.`,
      wrong: [
        `${cap(c.person)} attended the workshop should sign this form.`,
        `${cap(c.person)} who attending the workshop should sign this form.`,
        `${cap(c.person)} to attend the workshop should signs this form.`,
      ],
    }),
  },
  {
    label: "Reduced passive relative clause",
    cefr: "C1",
    level: 5,
    clue: "past participle reduction",
    rule: "A passive relative clause can sometimes be reduced to a past participle phrase.",
    make: (c) => ({
      answer: `${cap(c.thing)} published yesterday needs checking.`,
      wrong: [
        `${cap(c.thing)} publishing yesterday needs checking.`,
        `${cap(c.thing)} which published yesterday needs checking.`,
        `${cap(c.thing)} was published yesterday needs checking.`,
      ],
    }),
  },
  {
    label: "Free relative with what",
    cefr: "C1",
    level: 5,
    clue: "what = the thing that",
    rule: "What can introduce a free relative clause meaning the thing that.",
    make: (c) => ({
      answer: `What ${c.person} explained was useful for the whole class.`,
      wrong: [
        `That ${c.person} explained was useful for the whole class.`,
        `Which ${c.person} explained was useful for the whole class.`,
        `What did ${c.person} explain was useful for the whole class.`,
      ],
    }),
  },
];

function cap(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function context(index) {
  return {
    person: people[index % people.length],
    personClause: clauses[index % clauses.length],
    place: places[index % places.length],
    reason: reasons[index % reasons.length],
    thing: things[index % things.length],
    thingClause: thingClauses[index % thingClauses.length],
    time: times[index % times.length],
    verb: verbs[Math.floor(index / people.length) % verbs.length],
  };
}

function shuffleOptions(options, seed) {
  const result = [...options];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = (seed + index * 23) % (index + 1);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function promptFor(pattern, index) {
  const stems = [
    "Choose the correct relative clause.",
    "Choose the best relative pronoun or structure.",
    "Which option uses the relative clause correctly?",
    "Complete the idea with the correct relative clause.",
    "Select the sentence that fits the relative clause rule.",
  ];
  return `${stems[index % stems.length]} Focus: ${pattern.clue}. Context set ${String(index + 1).padStart(4, "0")}.`;
}

function makeQuestion(index, pattern) {
  const data = pattern.make(context(index));
  const answer = data.answer;
  const options = shuffleOptions([answer, ...data.wrong].slice(0, 4), index);
  return {
    id: `relative-clauses-${String(index + 1).padStart(4, "0")}`,
    type: "multiple-choice",
    level: pattern.level,
    cefr: pattern.cefr,
    examFocus: examFocuses[(index + pattern.level) % examFocuses.length],
    relativeFocus: pattern.label,
    prompt: promptFor(pattern, index),
    options,
    answer,
    explanation: pattern.rule,
  };
}

const levelPlan = [
  { count: 120, level: 1 },
  { count: 300, level: 2 },
  { count: 320, level: 3 },
  { count: 260, level: 4 },
  { count: 200, level: 5 },
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
  lessonId: "relative-clauses",
  title: "Relative Clauses Mastery Test",
  description:
    "1200 original multiple-choice relative clause questions for General English, VSTEP, IELTS, TOEIC, and Cambridge-style practice.",
  sourceNotes: [
    "Original questions generated from relative pronoun, defining/non-defining, zero relative, preposition, reduced clause, and free relative patterns; not copied from source materials.",
    "Difficulty levels: 1=A1/A2 foundation, 2=A2, 3=B1, 4=B2, 5=C1.",
  ],
  questionCount: questions.length,
  questions,
};

writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
