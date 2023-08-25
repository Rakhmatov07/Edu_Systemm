"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markStudentProject = exports.getProject = exports.getProjectsByStudent = exports.getProjectsByGroup = exports.getProjectsByExam = exports.getProjects = void 0;
const project_entity_1 = require("../../entities/project.entity");
const typeorm_1 = require("../../database/typeorm");
const exam_entity_1 = require("../../entities/exam.entity");
function getProjects(_, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const projectRepository = typeorm_1.dataSource.getRepository(project_entity_1.Project);
            const projects = yield projectRepository.find();
            res.status(200).json({ message: 'Success', projects });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getProjects = getProjects;
function getProjectsByExam(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { examId } = req.params;
            const projectRepository = typeorm_1.dataSource.getRepository(project_entity_1.Project);
            const projects = yield projectRepository.find({ where: { examId } });
            res.status(200).json({ message: 'Success', projects });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getProjectsByExam = getProjectsByExam;
function getProjectsByGroup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { groupId } = req.params;
            const projectRepository = typeorm_1.dataSource.getRepository(project_entity_1.Project);
            const projects = yield projectRepository.find({ where: { groupId } });
            res.status(200).json({ message: 'Success', projects });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getProjectsByGroup = getProjectsByGroup;
function getProjectsByStudent(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { studentId } = req.params;
            const projectRepository = typeorm_1.dataSource.getRepository(project_entity_1.Project);
            const projects = yield projectRepository.find({ where: { studentId } });
            res.status(200).json({ message: 'Success', projects });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getProjectsByStudent = getProjectsByStudent;
function getProject(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { projectId } = req.params;
            const projectRepository = typeorm_1.dataSource.getRepository(project_entity_1.Project);
            const project = yield projectRepository.findBy({ projectId });
            res.status(200).json({ message: 'Success', project });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getProject = getProject;
function markStudentProject(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { projectId } = req.params;
            const { score, teacherComment } = req.body;
            const projectRepository = typeorm_1.dataSource.getRepository(project_entity_1.Project);
            const examRepository = typeorm_1.dataSource.getRepository(exam_entity_1.Exam);
            const project = yield projectRepository.findBy({ projectId });
            const exam = yield examRepository.findOne({ where: { examId: project.examId } });
            if (exam.passingScore < score) {
                project.isPassed = true;
            }
            else {
                project.isPassed = false;
            }
            project.score = score;
            project.teacherComment = teacherComment;
            yield projectRepository.save(project);
            res.status(200).json({ message: 'Success' });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.markStudentProject = markStudentProject;
//# sourceMappingURL=admin-project.controller.js.map