import { Router } from "express";

import { addStudentToGroup, deleteStudentFromGroup, getStudent, getStudents, getStudentsByStatus } from "../controllers/admin-student.controller";
import { isAdmin } from "../middlewares/isAdmin";
export const router: Router = Router();

router.get('/admin/student', isAdmin, getStudents);
router.get('/admin/student/status', isAdmin, getStudentsByStatus);
router.get('/admin/student/:studentId', isAdmin, getStudent);

router.patch('/admin/student/:studentId', isAdmin, addStudentToGroup); // get student's info when they registered and add to the group

router.delete('/admin/student/:studentId', isAdmin, deleteStudentFromGroup);

// Working Properly