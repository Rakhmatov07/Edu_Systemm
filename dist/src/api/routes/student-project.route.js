"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const student_project_controller_1 = require("../controllers/student-project.controller");
const isStudent_1 = require("../middlewares/isStudent");
exports.router = (0, express_1.Router)();
exports.router.get('/student/project', isStudent_1.isStudent, student_project_controller_1.getProjects);
exports.router.get('/student/project/:projectId', isStudent_1.isStudent, student_project_controller_1.getProject);
exports.router.post('/student/project/:examId', isStudent_1.isStudent, student_project_controller_1.sendProject);
//# sourceMappingURL=student-project.route.js.map