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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendProject = exports.getProject = exports.getProjects = void 0;
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const project_validation_1 = require("../../validations/project.validation");
const project_entity_1 = require("../../entities/project.entity");
const customError_1 = require("../../utils/customError");
const typeorm_1 = require("../../database/typeorm");
const exam_entity_1 = require("../../entities/exam.entity");
const jwt_1 = require("../../utils/jwt");
function getProjects(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { token } = req.cookies;
            const projectRepository = typeorm_1.dataSource.getRepository(project_entity_1.Project);
            const studentId = (0, jwt_1.verifyPayload)(token);
            if (!studentId)
                throw new customError_1.CustomError('Invalid Token', 403);
            const projects = yield projectRepository.find({ where: { studentId: studentId.toString() } });
            res.status(200).json({ message: 'Success', projects });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getProjects = getProjects;
function getProject(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { projectId } = req.params;
            const { token } = req.cookies;
            const projectRepository = typeorm_1.dataSource.getRepository(project_entity_1.Project);
            const studentId = (0, jwt_1.verifyPayload)(token);
            if (!studentId)
                throw new customError_1.CustomError('Invalid Token', 403);
            const project = yield projectRepository.findOne({ where: { projectId, studentId: studentId.toString() } });
            res.status(200).json({ message: 'Success', project });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getProject = getProject;
function sendProject(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { projectName, studentComment, groupId } = req.body;
            const { examId } = req.params;
            const { file } = req.files;
            const { token } = req.cookies;
            const projectRepository = typeorm_1.dataSource.getRepository(project_entity_1.Project);
            const examRepository = typeorm_1.dataSource.getMongoRepository(exam_entity_1.Exam);
            const studentId = (0, jwt_1.verifyPayload)(token);
            if (!studentId)
                throw new customError_1.CustomError('Invalid Token', 403);
            if (!file)
                throw new customError_1.CustomError('File Not Found', 400);
            const isValid = (0, project_validation_1.projectValidate)({
                projectName, groupId, examId,
                isPassed: false,
                score: 0,
                teacherComment: "",
                studentComment: ""
            });
            if (isValid)
                throw new customError_1.CustomError(isValid, 400);
            const exam = yield examRepository.findBy({ examId });
            const endTime = new Date(exam.createdAt).setHours(new Date(exam.createdAt).getHours() + Number(exam.duration));
            if (new Date(endTime) < new Date())
                throw new customError_1.CustomError('Deadline end', 409);
            const project = yield projectRepository.findOne({ where: { examId, studentId: studentId.toString() } });
            if ((project === null || project === void 0 ? void 0 : project.attempts) == 0)
                throw new customError_1.CustomError('You do not have attempts', 409);
            if (!project) {
                const fileName = `${(0, uuid_1.v4)()}${path_1.default.extname(file.name)}`;
                const newProject = new project_entity_1.Project();
                newProject.projectName = projectName;
                newProject.fileName = fileName;
                newProject.studentComment = studentComment !== null && studentComment !== void 0 ? studentComment : '';
                newProject.groupId = groupId;
                newProject.examId = examId;
                newProject.studentId = studentId;
                newProject.attempts -= 1;
                yield projectRepository.save(newProject);
                file.mv(process.cwd() + '/src/public/uploads/' + fileName);
                res.status(201).json({ message: 'Success', newProject });
            }
            else {
                const fileName = `${(0, uuid_1.v4)()}${path_1.default.extname(file.name)}`;
                project.projectName = projectName !== null && projectName !== void 0 ? projectName : project.projectName;
                project.studentComment = studentComment !== null && studentComment !== void 0 ? studentComment : project.studentComment;
                project.groupId = groupId !== null && groupId !== void 0 ? groupId : project.groupId;
                project.attempts -= 1;
                file.mv(process.cwd() + '/src/public/uploads/' + fileName);
                yield projectRepository.save(project);
                res.status(201).json({ message: 'Success', project });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.sendProject = sendProject;
//# sourceMappingURL=student-project.controller.js.map