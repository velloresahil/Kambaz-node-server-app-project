import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export async function findQuestionsForQuiz(qid) {
    return await model.find({ quiz: qid });
}

export async function findQuestionById(questid) {
    return await model.findById(questid);
}

export async function createQuestion(question) {
    const newQuestion = { ...question, _id: uuidv4() };
    return await model.create(newQuestion);
}

export async function updateQuestion(questid, updates) {
    return await model.findByIdAndUpdate(questid, updates, { new: true });
}

export async function deleteQuestion(questid) {
    return await model.findByIdAndDelete(questid);
}

export async function deleteQuestionsByQuiz(quizId) {
  return await model.deleteMany({ quiz: quizId });
}