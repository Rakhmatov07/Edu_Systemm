"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const admin_project_controller_1 = require("../controllers/admin-project.controller");
const isAdmin_1 = require("../middlewares/isAdmin");
exports.router = (0, express_1.Router)();
exports.router.get('/admin/project', isAdmin_1.isAdmin, admin_project_controller_1.getProjects);
exports.router.get('/admin/project/exam/:examId', isAdmin_1.isAdmin, admin_project_controller_1.getProjectsByExam);
exports.router.get('/admin/project/group/:groupId', isAdmin_1.isAdmin, admin_project_controller_1.getProjectsByGroup);
exports.router.get('/admin/project/student/:studentId', isAdmin_1.isAdmin, admin_project_controller_1.getProjectsByStudent);
exports.router.get('/admin/project/:projectId', isAdmin_1.isAdmin, admin_project_controller_1.getProject);
exports.router.put('/admin/project/:projectId', isAdmin_1.isAdmin, admin_project_controller_1.markStudentProject); // mark students and change isPassed status according to the score
//# sourceMappingURL=admin-project.route.js.map