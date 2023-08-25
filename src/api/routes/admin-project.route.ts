import { Router } from "express";

import { getProject, getProjects, getProjectsByExam, getProjectsByGroup, getProjectsByStudent, markStudentProject } from "../controllers/admin-project.controller";
import { isAdmin } from "../middlewares/isAdmin";
export const router: Router = Router();

router.get('/admin/project', isAdmin, getProjects); 
router.get('/admin/project/exam/:examId', isAdmin, getProjectsByExam); 
router.get('/admin/project/group/:groupId', isAdmin, getProjectsByGroup); 
router.get('/admin/project/student/:studentId', isAdmin, getProjectsByStudent); 
router.get('/admin/project/:projectId', isAdmin, getProject); 

router.put('/admin/project/:projectId', isAdmin, markStudentProject); // mark students and change isPassed status according to the score

// Working Properly
