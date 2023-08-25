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
exports.deleteStudentFromGroup = exports.addStudentToGroup = exports.getStudentsByStatus = exports.getStudent = exports.getStudents = void 0;
const student_entity_1 = require("../../entities/student.entity");
const customError_1 = require("../../utils/customError");
const typeorm_1 = require("../../database/typeorm");
function getStudents(_, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const studentRepository = typeorm_1.dataSource.getRepository(student_entity_1.Student);
            const students = yield studentRepository.find();
            res.status(200).json({ message: 'Success1', students });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getStudents = getStudents;
function getStudent(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { studentId } = req.params;
            const studentRepository = typeorm_1.dataSource.getRepository(student_entity_1.Student);
            if (!studentId)
                throw new customError_1.CustomError('Bad request!', 400);
            const student = yield studentRepository.findOne({ where: { studentId } });
            res.status(200).json({ message: 'Success2', student });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getStudent = getStudent;
function getStudentsByStatus(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { isAllowed } = req.query;
            const studentRepository = typeorm_1.dataSource.getRepository(student_entity_1.Student);
            const students = yield studentRepository.find({ where: { isAllowed } });
            res.status(200).json({ message: 'Success12', students });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getStudentsByStatus = getStudentsByStatus;
function addStudentToGroup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(1233444);
        try {
            console.log(12);
            const studentRepository = typeorm_1.dataSource.getRepository(student_entity_1.Student);
            const { groupId } = req.body;
            const { studentId } = req.params;
            const student = yield studentRepository.findBy({ studentId });
            if (!student)
                throw new customError_1.CustomError('Not Found', 404);
            student.isAllowed = true;
            student.groupId = groupId;
            yield studentRepository.save(student);
            console.log("5", student);
            res.status(200).json({ message: 'Success', student });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    });
}
exports.addStudentToGroup = addStudentToGroup;
function deleteStudentFromGroup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { studentId } = req.params;
            const studentRepository = typeorm_1.dataSource.getRepository(student_entity_1.Student);
            const student = yield studentRepository.findBy({ studentId });
            if (!student)
                throw new customError_1.CustomError('Not Found', 404);
            student.isAllowed = false;
            yield studentRepository.save(student);
            res.status(200).json({ message: 'Success', student });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteStudentFromGroup = deleteStudentFromGroup;
//# sourceMappingURL=admin-student.controller.js.map