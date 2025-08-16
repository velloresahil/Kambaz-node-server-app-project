import model from "./model.js";   
import { v4 as uuidv4 } from "uuid";

// ✅ Create a new quiz for a course
export const createQuiz = async (courseId) => {
  const doc = await model.create({
    courseId,
    quizId: uuidv4(),
    published: false,
    details: {
      title: "New Quiz",
      description: "",
      points: 0,
      quizType: "Graded Quiz",
      assignmentGroup: "Quizzes",
      shuffleAnswers: false,
      timeLimit: 20,
      multipleAttempts: false,
      maxAttempts: 1,
      showCorrectAnswers: true,
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockAfterAnswering: false,
      dates: { availableFrom: null, availableUntil: null, dueDate: null }
    },
    questions: [],
    attempts: []
  });
  return doc;
};

// ✅ Get all quizzes for a course
export const getQuizzesByCourse = (courseId) => {
  return model.find({ courseId }).lean();
};

// ✅ Get a quiz by ID
export const getQuizById = (quizId) => {
  return model.findOne({ quizId }).lean();
};

// ✅ Update quiz details (merge into details)
export const updateQuiz = async (quizId, updates) => {
  const quiz = await model.findOne({ quizId });
  if (!quiz) return null;

  quiz.details = { ...quiz.details.toObject?.() ?? quiz.details, ...updates };

  if (quiz.questions?.length) {
    quiz.details.points = quiz.questions.reduce((s, q) => s + (q.points || 0), 0);
  }
  await quiz.save();
  return quiz.toObject();
};

// ✅ Delete a quiz
export const deleteQuiz = async (quizId) => {
  const deleted = await model.findOneAndDelete({ quizId }).lean();
  return deleted;
};

// ✅ Publish/Unpublish a quiz
export const setPublishStatus = (quizId, status) => {
  return model.findOneAndUpdate(
    { quizId },
    { $set: { published: status } },
    { new: true }
  ).lean();
};

// ✅ Add a question
export const addQuestion = async (quizId, question) => {
  const payload = { ...question, questionId: uuidv4() };
  const quiz = await model.findOneAndUpdate(
    { quizId },
    { $push: { questions: payload } },
    { new: true }
  );
  if (!quiz) return null;

  quiz.details.points = quiz.questions.reduce((s, q) => s + (q.points || 0), 0);
  await quiz.save();

  return payload;
};

// ✅ Update a question
export const updateQuestion = async (quizId, questionId, updates) => {
  const quiz = await model.findOne({ quizId });
  if (!quiz) return null;

  const q = quiz.questions.find((qq) => qq.questionId === questionId);
  if (!q) return null;

  Object.assign(q, updates);
  quiz.details.points = quiz.questions.reduce((s, qq) => s + (qq.points || 0), 0);
  await quiz.save();

  return q.toObject ? q.toObject() : q;
};

// ✅ Delete a question
export const deleteQuestion = async (quizId, questionId) => {
  const quiz = await model.findOne({ quizId });
  if (!quiz) return null;

  quiz.questions = quiz.questions.filter((q) => q.questionId !== questionId);
  quiz.details.points = quiz.questions.reduce((s, q) => s + (q.points || 0), 0);
  await quiz.save();

  return quiz.toObject();
};

// ✅ Record a student attempt
export const recordAttempt = async (quizId, studentId, answers, score) => {
  const quiz = await model.findOne({ quizId });
  if (!quiz) return null;

  quiz.attempts.push({
    attemptId: uuidv4(),
    studentId,
    answers,
    score,
    timestamp: new Date()
  });
  await quiz.save();

  return quiz.toObject();
};

// ✅ Get attempts for a student
export const getAttemptsByStudent = async (quizId, studentId) => {
  const quiz = await model.findOne({ quizId }).lean();
  if (!quiz) return null;
  return quiz.attempts.filter((a) => a.studentId === studentId);
};
