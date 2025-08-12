import express from 'express';
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kambaz/Users/routes.js";
import "dotenv/config";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import session from "express-session";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";
import QuizzesRoutes from "./Kambaz/Quizzes/routes.js";
import mongoose from "mongoose";
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);



const app = express();


const allowedOrigin = process.env.NETLIFY_URL || "http://localhost:5173";

app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);  
        if (origin.startsWith(allowedOrigin)) {
            return callback(null, true);  
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    }
}));


const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}

app.use(session(sessionOptions));
app.use(express.json());

Hello(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
QuizzesRoutes(app);
Lab5(app);

app.listen(process.env.PORT || 4000);
