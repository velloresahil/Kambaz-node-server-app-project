import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    // matches your local structure
    questionId: { type: String, required: true },
    questionTitle: String,
    questionDescription: String,
    // you already use: "multiple-choice", "true-false", "fill-in-blank", "multi-select"
    questionType: {
      type: String,
      enum: ["multiple-choice", "true-false", "fill-in-blank", "multi-select"],
    },
    possibleAnswers: [String],
    // sometimes you store a string (MC/TF/FIB) and sometimes it could be array (multi-select),
    // so Mixed type keeps it simple and compatible
    correctAnswers: mongoose.Schema.Types.Mixed,
    points: { type: Number, default: 0 },
  },
  { _id: false }
);

const attemptSchema = new mongoose.Schema(
  {
    attemptId: { type: String, required: true },
    studentId: { type: String, required: true },
    // answers like { [questionId]: "answer" } or array for multi-select
    answers: { type: mongoose.Schema.Types.Mixed, default: {} },
    score: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const quizSchema = new mongoose.Schema(
  {
    courseId: { type: String, index: true, required: true },
    quizId: { type: String, index: true, unique: true, required: true },

    published: { type: Boolean, default: false },

    details: {
      title: { type: String, default: "New Quiz" },
      description: { type: String, default: "" },
      points: { type: Number, default: 0 },

      quizType: {
        type: String,
        enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
        default: "Graded Quiz",
      },

      assignmentGroup: {
        type: String,
        enum: ["Quizzes", "Exams", "Assignments", "Project"],
        default: "Quizzes",
      },

      shuffleAnswers: { type: Boolean, default: false },
      timeLimit: { type: Number, default: 20 }, // minutes
      multipleAttempts: { type: Boolean, default: false },
      maxAttempts: { type: Number, default: 1 },
      showCorrectAnswers: { type: Boolean, default: true },
      accessCode: { type: String, default: "" },
      oneQuestionAtATime: { type: Boolean, default: true },
      webcamRequired: { type: Boolean, default: false },
      lockAfterAnswering: { type: Boolean, default: false },

      dates: {
        availableFrom: { type: Date, default: null },
        availableUntil: { type: Date, default: null },
        dueDate: { type: Date, default: null },
      },
    },

    questions: [questionSchema],
    attempts: [attemptSchema],
  },
  { collection: "quizzes" }
);

export default quizSchema;
