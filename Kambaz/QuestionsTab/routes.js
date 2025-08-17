import * as dao from "./dao.js";

export default function QuestionRoutes(app) {
    app.get("/api/courses/:cid/quizzes/:qid/questions", async (req, res) => {
        const { qid } = req.params;
        const questions = await dao.findQuestionsForQuiz(qid);
        res.send(questions);
    });

    app.get("/api/quizzes/:qid/questions/:questid", async (req, res) => {
        const { questid } = req.params;
        const question = await dao.findQuestionById(questid);
        if (question) {
            res.send(question);
        } else {
            res.status(404).send({ message: "Question not found" });
        }
    });

    app.post("/api/courses/:cid/quizzes/:qid/questions", async (req, res) => {
        const { qid } = req.params;
        const newQuestion = await dao.createQuestion({ ...req.body, quiz: qid });
        res.send(newQuestion);
    });

    app.put("/api/quizzes/:qid/questions/:questid", async (req, res) => {
        const { questid } = req.params;
        const updated = await dao.updateQuestion(questid, req.body);
        res.send(updated);
    });

    app.delete("/api/quizzes/:qid/questions/:questid", async (req, res) => {
        const { questid } = req.params;
        await dao.deleteQuestion(questid);
        res.sendStatus(200);
    });
}