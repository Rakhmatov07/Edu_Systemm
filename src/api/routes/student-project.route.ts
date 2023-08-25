import { Router } from "express";

import { getProject, getProjects, sendProject } from "../controllers/student-project.controller";
import { isStudent } from "../middlewares/isStudent";
export const router: Router = Router();


router.get('/student/project', isStudent as any, getProjects as any);
router.get('/student/project/:projectId', isStudent as any, getProject as any);

router.post('/student/project/:examId', isStudent as any, sendProject as any);

// Working Properly