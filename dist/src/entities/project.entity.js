"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const typeorm_1 = require("typeorm");
const student_entity_1 = require("./student.entity");
const group_entity_1 = require("./group.entity");
const exam_entity_1 = require("./exam.entity");
let Project = exports.Project = class Project {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Project.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'projectName', nullable: false }),
    __metadata("design:type", String)
], Project.prototype, "projectName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fileName', nullable: false }),
    __metadata("design:type", String)
], Project.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'score', nullable: false, default: 0 }),
    __metadata("design:type", Number)
], Project.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'isPassed', nullable: false, default: false }),
    __metadata("design:type", Boolean)
], Project.prototype, "isPassed", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'studentComment', nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "studentComment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'teacherComment', nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "teacherComment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'attempts', nullable: true, default: 3 }),
    __metadata("design:type", Number)
], Project.prototype, "attempts", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, (student) => student.projects),
    (0, typeorm_1.JoinColumn)({ name: 'studentId', referencedColumnName: 'studentId' }),
    __metadata("design:type", String)
], Project.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => group_entity_1.Group, (group) => group.projects),
    (0, typeorm_1.JoinColumn)({ name: 'groupId', referencedColumnName: 'groupId' }),
    __metadata("design:type", String)
], Project.prototype, "groupId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => exam_entity_1.Exam, (exam) => exam.projects),
    (0, typeorm_1.JoinColumn)({ name: 'examId', referencedColumnName: 'examId' }),
    __metadata("design:type", String)
], Project.prototype, "examId", void 0);
exports.Project = Project = __decorate([
    (0, typeorm_1.Entity)('projects')
], Project);
//# sourceMappingURL=project.entity.js.map