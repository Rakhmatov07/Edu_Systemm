import { Router } from "express";

import { login, logout } from "../controllers/admin.controller";
import { isAdmin } from "../middlewares/isAdmin";
export const router: Router = Router();


router.post('/admin/login', login);
router.delete('/admin/logout', isAdmin, logout);

// Working Properly

