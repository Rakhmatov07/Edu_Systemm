import { Router } from "express";

import { login, logout, register, verify } from "../controllers/student.controller";
import { isStudent } from "../middlewares/isStudent";
export const router: Router = Router();


router.post('/student/register', register);
router.post('/student/login', login);
router.post('/student/verify', verify);
router.delete('/student/logout', isStudent as any, logout);

// Working propperly

