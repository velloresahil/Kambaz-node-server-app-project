// Kambaz/Enrollments/dao.js
import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
  enrollments.push(newEnrollment);
  return newEnrollment;
}

export function unEnrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  Database.enrollments = enrollments.filter(
    (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
  );
}

// UPDATED: helper used by GET /api/users/current/courses
export function findCoursesForUser(userId) {
  const { enrollments, courses } = Database;
  const courseIds = enrollments
    .filter((e) => e.user === userId)
    .map((e) => e.course);
  return courses.filter((c) => courseIds.includes(c._id));
}
