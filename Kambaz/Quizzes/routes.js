import * as dao from "./dao.js";
import * as qdao from "../QuestionsTab/dao.js";

export default function QuizRoutes(app) {
    app.get("/api/courses/:cid/quizzes", async (req, res) => {
        const { cid } = req.params;
        const quizzes = await dao.findQuizzesForCourse(cid);
        res.send(quizzes);
    });

    app.get("/api/quizzes/:qid", async (req, res) => {
        const { qid } = req.params;
        const quiz = await dao.findQuizById(qid);
        if (quiz) {
            res.send(quiz);
        } else {
            res.status(404).send({ message: "Quiz not found" });
        }
    });

    app.post("/api/courses/:cid/quizzes", async (req, res) => {
        const { cid } = req.params;
        const newQuiz = await dao.createQuiz({ ...req.body, course: cid });
        res.send(newQuiz);
    });

    app.put("/api/quizzes/:qid", async (req, res) => {
        const { qid } = req.params;
        const updated = await dao.updateQuiz(qid, req.body);
        res.send(updated);
    });

    app.delete("/api/quizzes/:qid", async (req, res) => {
        const { qid } = req.params;
        await dao.deleteQuiz(qid);
        await qdao.deleteQuestionsByQuiz(qid);
        res.sendStatus(200);
    });
}