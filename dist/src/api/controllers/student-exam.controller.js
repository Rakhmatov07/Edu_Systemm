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
exports.getExam = exports.getExams = void 0;
const student_entity_1 = require("../../entities/student.entity");
const customError_1 = require("../../utils/customError");
const typeorm_1 = require("../../database/typeorm");
const exam_entity_1 = require("../../entities/exam.entity");
const jwt_1 = require("../../utils/jwt");
function getExams(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { token } = req.cookies;
            const examRepository = typeorm_1.dataSource.getRepository(exam_entity_1.Exam);
            const studentRepository = typeorm_1.dataSource.getRepository(student_entity_1.Student);
            const studentId = (0, jwt_1.verifyPayload)(token);
            if (!studentId)
                throw new customError_1.CustomError('Invalid Token', 403);
            const student = yield studentRepository.findBy({ studentId: studentId.toString() });
            if (!student)
                throw new customError_1.CustomError('Not Found', 404);
            const exams = yield examRepository.find({ where: { groupId: student.groupId } });
            res.status(200).json({ message: 'Success', exams });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getExams = getExams;
function getExam(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { examId } = req.params;
            const { token } = req.cookies;
            const examRepository = typeorm_1.dataSource.getRepository(exam_entity_1.Exam);
            const studentRepository = typeorm_1.dataSource.getRepository(student_entity_1.Student);
            const studentId = (0, jwt_1.verifyPayload)(token);
            if (!studentId)
                throw new customError_1.CustomError('Invalid Token', 403);
            const student = yield studentRepository.findBy({ studentId: studentId.toString() });
            if (!student)
                throw new customError_1.CustomError('Not Found', 404);
            const exam = yield examRepository.findOne({ where: { examId, groupId: student.groupId } });
            res.status(200).json({ message: 'Success', exam });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getExam = getExam;
//# sourceMappingURL=student-exam.controller.js.map