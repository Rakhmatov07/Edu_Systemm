"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const admin_exam_controller_1 = require("../controllers/admin-exam.controller");
const isAdmin_1 = require("../middlewares/isAdmin");
exports.router = (0, express_1.Router)();
exports.router.get('/admin/exam', isAdmin_1.isAdmin, admin_exam_controller_1.getExams);
exports.router.get('/admin/exam/group/:groupId', isAdmin_1.isAdmin, admin_exam_controller_1.getExamsByGroup);
exports.router.get('/admin/exam/:examId', isAdmin_1.isAdmin, admin_exam_controller_1.getExam);
exports.router.post('/admin/exam', isAdmin_1.isAdmin, admin_exam_controller_1.createExam);
exports.router.delete('/admin/exam/:examId', isAdmin_1.isAdmin, admin_exam_controller_1.deleteExam);
//# sourceMappingURL=admin-exam.route.js.map