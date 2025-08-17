import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
    text: String,
}, { _id: false });

const questionSchema = new mongoose.Schema(
    {
        _id: String,
        questionType: {
            type: String,
            enum: ["Multiple Choice", "True False", "Fill in the Blank"],
            default: "Multiple Choice",
        },
        questionGroup: {
            type: String,
            enum: ["Computer Science", "Data Science"],
            default: "Computer Science"
        },
        title: String,
        question: String,
        points: Number,
        correctAnswer: String,
        options: [optionSchema],
        published: {
            type: Boolean,
            default: false,
        },
        quiz: { type: String, ref: "QuizModel" },
    },
    { collection: "questions" }
);
export default questionSchema;