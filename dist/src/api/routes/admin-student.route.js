"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const admin_student_controller_1 = require("../controllers/admin-student.controller");
const isAdmin_1 = require("../middlewares/isAdmin");
exports.router = (0, express_1.Router)();
exports.router.get('/admin/student', isAdmin_1.isAdmin, admin_student_controller_1.getStudents);
exports.router.get('/admin/student/status', isAdmin_1.isAdmin, admin_student_controller_1.getStudentsByStatus);
exports.router.get('/admin/student/:studentId', isAdmin_1.isAdmin, admin_student_controller_1.getStudent);
exports.router.post('/admin/student/:studentId', isAdmin_1.isAdmin, admin_student_controller_1.addStudentToGroup); // get student's info when they registered and add to the group
exports.router.delete('/admin/student/:studentId', isAdmin_1.isAdmin, admin_student_controller_1.deleteStudentFromGroup);
//# sourceMappingURL=admin-student.route.js.map