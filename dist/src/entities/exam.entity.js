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
exports.Exam = void 0;
const typeorm_1 = require("typeorm");
const project_entity_1 = require("./project.entity");
const group_entity_1 = require("./group.entity");
let Exam = exports.Exam = class Exam {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Exam.prototype, "examId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'title', nullable: false }),
    __metadata("design:type", String)
], Exam.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', nullable: false }),
    __metadata("design:type", String)
], Exam.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'duration', nullable: false }),
    __metadata("design:type", Number)
], Exam.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'maxScore', nullable: false }),
    __metadata("design:type", Number)
], Exam.prototype, "maxScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'passingScore', nullable: false }),
    __metadata("design:type", Number)
], Exam.prototype, "passingScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'createdAt', type: "time with time zone", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Exam.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_entity_1.Project, (project) => project.examId),
    __metadata("design:type", Array)
], Exam.prototype, "projects", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => group_entity_1.Group, (group) => group.exams),
    (0, typeorm_1.JoinColumn)({ name: 'groupId', referencedColumnName: 'groupId' }),
    __metadata("design:type", String)
], Exam.prototype, "groupId", void 0);
exports.Exam = Exam = __decorate([
    (0, typeorm_1.Entity)('exams')
], Exam);
//# sourceMappingURL=exam.entity.js.map