import { Router } from "express";

import { getExam, getExams } from "../controllers/student-exam.controller";
import { isStudent } from "../middlewares/isStudent";
export const router: Router = Router();


router.get('/student/exam', isStudent as any, getExams as any);
router.get('/student/exam/:examId', isStudent as any, getExam as any);

// Working Properly