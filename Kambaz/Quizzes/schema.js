import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
    {
        _id: String,
        title: String,
        description: String,
        course: { type: String, ref: "CourseModel" },
        available: Date,
        due: Date,
        until: Date,
        quizType: {
            type: String,
            enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
            default: "Graded Quiz",
        },
        points: Number,
        assignmentGroup: {
            type: String,
            enum: ["Quizzes", "Exams", "Assignments", "Project"],
            default: "Quizzes",
        },
        shuffleAnswers: {
            type: Boolean,
            default: true,
        },
        timeLimit: {
            type: Number,
            default: 20, 
        },
        multipleAttempts: {
            type: Boolean,
            default: false,
        },
        attempts: {
            type: Number,
            default: 1,
        },
        showCorrectAnswers: {
            type: String,
            enum: ["Immediately", "Never", "After Due Date"],
            default: "After Due Date",
        },
        accessCode: {
            type: String,
            default: "",
        },
        oneQuestionAtATime: {
            type: Boolean,
            default: true,
        },
        webcamRequired: {
            type: Boolean,
            default: false,
        },
        lockQuestionsAfterAnswering: {
            type: Boolean,
            default: false,
        },
        assignTo: {
            type: String,
            default: "Everyone",
        },
        published: {
            type: Boolean,
            default: false,
        },
    },
    { collection: "quizzes" }
);
export default quizSchema;