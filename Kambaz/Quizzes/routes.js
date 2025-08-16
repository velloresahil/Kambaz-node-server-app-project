import * as dao from "./dao.js";



export default function QuizRoutes(app) {
  // Create
app.post("/api/courses/:courseId/quizzes", async (req, res) => {
  try {
    const { courseId } = req.params;
    console.log("POST /quizzes courseId =", courseId); // 👈 log
    const newQuiz = await dao.createQuiz(courseId);
    console.log("Created quizId =", newQuiz.quizId); // 👈 log
    res.json(newQuiz);
  } catch (e) {
    console.error("Create quiz failed:", e);
    res.status(500).json({ error: e.message });
  }
});


  // List by course
  app.get("/api/courses/:courseId/quizzes", async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await dao.getQuizzesByCourse(courseId);
    res.json(quizzes);
  });

  // Read one
  app.get("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const quiz = await dao.getQuizById(quizId);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    res.json(quiz);
  });

  // Update details
  app.put("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const updates = req.body;
    const updated = await dao.updateQuiz(quizId, updates);
    if (!updated) return res.status(404).json({ error: "Quiz not found" });
    res.json(updated);
  });

  // Delete
  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const deleted = await dao.deleteQuiz(quizId);
    if (!deleted) return res.status(404).json({ error: "Quiz not found" });
    res.json(deleted);
  });

  // Publish toggle
  app.put("/api/quizzes/:quizId/publish", async (req, res) => {
    const { quizId } = req.params;
    const { published } = req.body;
    const updated = await dao.setPublishStatus(quizId, published);
    if (!updated) return res.status(404).json({ error: "Quiz not found" });
    res.json(updated);
  });

  // Add question
  app.post("/api/quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    const newQ = await dao.addQuestion(quizId, req.body);
    if (!newQ) return res.status(404).json({ error: "Quiz not found" });
    res.json(newQ);
  });

  // Update question
  app.put("/api/quizzes/:quizId/questions/:questionId", async (req, res) => {
    const { quizId, questionId } = req.params;
    const updated = await dao.updateQuestion(quizId, questionId, req.body);
    if (!updated) return res.status(404).json({ error: "Question not found" });
    res.json(updated);
  });

  // Delete question
  app.delete("/api/quizzes/:quizId/questions/:questionId", async (req, res) => {
    const { quizId, questionId } = req.params;
    const quiz = await dao.deleteQuestion(quizId, questionId);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    res.json(quiz);
  });

  // Record attempt
  app.post("/api/quizzes/:quizId/attempts", async (req, res) => {
    const { quizId } = req.params;
    const { studentId, answers, score } = req.body;
    const updated = await dao.recordAttempt(quizId, studentId, answers, score);
    if (!updated) return res.status(404).json({ error: "Quiz not found" });
    res.json(updated);
  });

  // Get attempts for a student
  app.get("/api/quizzes/:quizId/attempts/:studentId", async (req, res) => {
    const { quizId, studentId } = req.params;
    const attempts = await dao.getAttemptsByStudent(quizId, studentId);
    if (!attempts) return res.status(404).json({ error: "Quiz not found" });
    res.json(attempts);
  });
}
