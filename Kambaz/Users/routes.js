// Kambaz/Users/routes.js
import * as dao from "./dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
import * as courseDao from "../Courses/dao.js";

export default function UserRoutes(app) {
  const createUser = (req, res) => {};
  const deleteUser = (req, res) => {};
  const findAllUsers = (req, res) => {};
  const findUserById = (req, res) => {};

  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    const currentUser = dao.findUserById(userId);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signin = (req, res) => {
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  // UPDATED: make profile a GET endpoint (was POST)
  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  // UPDATED: new endpoint to list the signed-in user's courses
  const getCurrentUsersCourses = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const courses = enrollmentsDao.findCoursesForUser(currentUser._id);
    res.json(courses);
  };

  // UPDATED: creating a course moved to /api/courses (instead of POST /users/current/courses)
  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const newCourse = courseDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  // --- ROUTES ---
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/profile", profile); // UPDATED (was POST)
  app.get("/api/users/current/courses", getCurrentUsersCourses); // UPDATED (new)

  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);

  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);

  

  // UPDATED: course creation here (if CourseRoutes already defines POST /api/courses, remove this to avoid duplicate route)
  app.post("/api/courses", createCourse);
}
