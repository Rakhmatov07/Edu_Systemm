"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const student_exam_controller_1 = require("../controllers/student-exam.controller");
const isStudent_1 = require("../middlewares/isStudent");
exports.router = (0, express_1.Router)();
exports.router.get('/student/exam', isStudent_1.isStudent, student_exam_controller_1.getExams);
exports.router.get('/student/exam/:examId', isStudent_1.isStudent, student_exam_controller_1.getExam);
//# sourceMappingURL=student-exam.route.js.map