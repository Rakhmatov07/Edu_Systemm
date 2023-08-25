"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const student_controller_1 = require("../controllers/student.controller");
const isStudent_1 = require("../middlewares/isStudent");
exports.router = (0, express_1.Router)();
exports.router.post('/student/register', student_controller_1.register);
exports.router.post('/student/login', student_controller_1.login);
exports.router.post('/student/verify', student_controller_1.verify);
exports.router.delete('/student/logout', isStudent_1.isStudent, student_controller_1.logout);
// Working propperly
//# sourceMappingURL=student.route.js.map