import { Router } from "express";

import { createGroup, deleteGroup, getGroup, getGroups } from "../controllers/admin-group.controller";
import { isAdmin } from "../middlewares/isAdmin";
export const router: Router = Router();


router.get('/admin/group', isAdmin, getGroups);
router.get('/admin/group/:groupId', isAdmin, getGroup);

router.post('/admin/group', isAdmin, createGroup);

router.delete('/admin/group/:groupId', isAdmin, deleteGroup);


// Working Properly