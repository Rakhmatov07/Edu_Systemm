"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const project_entity_1 = require("../entities/project.entity");
const student_entity_1 = require("../entities/student.entity");
const admin_entity_1 = require("../entities/admin.entity");
const group_entity_1 = require("../entities/group.entity");
const exam_entity_1 = require("../entities/exam.entity");
exports.dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1207",
    database: "examcontroller",
    synchronize: true,
    logging: false,
    entities: [admin_entity_1.Admin, student_entity_1.Student, group_entity_1.Group, exam_entity_1.Exam, project_entity_1.Project],
});
//# sourceMappingURL=typeorm.js.map