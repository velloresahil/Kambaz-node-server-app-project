import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export async function findQuizzesForCourse(courseId) {
    return await model.find({ course: courseId });
}

export async function findQuizById(quizId) {
    return await model.findById(quizId);
}

export async function createQuiz(quiz) {
    const newQuiz = { ...quiz, _id: uuidv4() };
    return await model.create(newQuiz);
}

export async function updateQuiz(quizId, updates) {
    return await model.findByIdAndUpdate(quizId, updates, { new: true });
}

export async function deleteQuiz(quizId) {
    return await model.findByIdAndDelete(quizId);
}