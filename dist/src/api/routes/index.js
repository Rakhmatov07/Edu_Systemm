"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_student_route_1 = require("./admin-student.route");
const admin_project_route_1 = require("./admin-project.route");
const admin_group_route_1 = require("./admin-group.route");
const admin_exam_route_1 = require("./admin-exam.route");
const admin_route_1 = require("./admin.route");
const student_project_route_1 = require("./student-project.route");
const student_exam_route_1 = require("./student-exam.route");
const student_route_1 = require("./student.route");
exports.default = [admin_route_1.router, admin_student_route_1.router, admin_exam_route_1.router, admin_group_route_1.router, admin_project_route_1.router, student_route_1.router, student_exam_route_1.router, student_project_route_1.router];
//# sourceMappingURL=index.js.map