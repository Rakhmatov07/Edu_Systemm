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
exports.Student = void 0;
const typeorm_1 = require("typeorm");
const project_entity_1 = require("./project.entity");
const group_entity_1 = require("./group.entity");
let Student = exports.Student = class Student {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Student.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "firstname", nullable: false }),
    __metadata("design:type", String)
], Student.prototype, "firstname", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "lastname", nullable: false }),
    __metadata("design:type", String)
], Student.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "email", nullable: false, unique: true }),
    __metadata("design:type", String)
], Student.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "password", nullable: false }),
    __metadata("design:type", String)
], Student.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "isAllowed", default: false }),
    __metadata("design:type", Boolean)
], Student.prototype, "isAllowed", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => group_entity_1.Group, (group) => group.students, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: 'groupId', referencedColumnName: 'groupId' }),
    __metadata("design:type", String)
], Student.prototype, "groupId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_entity_1.Project, (project) => project.studentId),
    __metadata("design:type", Array)
], Student.prototype, "projects", void 0);
exports.Student = Student = __decorate([
    (0, typeorm_1.Entity)('students')
], Student);
//# sourceMappingURL=student.entity.js.map