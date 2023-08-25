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
exports.createExam = exports.deleteExam = exports.getExamsByGroup = exports.getExam = exports.getExams = void 0;
const exam_validation_1 = require("../../validations/exam.validation");
const customError_1 = require("../../utils/customError");
const typeorm_1 = require("../../database/typeorm");
const exam_entity_1 = require("../../entities/exam.entity");
function getExams(_, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const examRepository = typeorm_1.dataSource.getRepository(exam_entity_1.Exam);
            const exams = yield examRepository.find();
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
            const examRepository = typeorm_1.dataSource.getRepository(exam_entity_1.Exam);
            const { examId } = req.params;
            const exam = yield examRepository.findOneBy({ examId });
            res.status(200).json({ message: 'Success', exam });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getExam = getExam;
function getExamsByGroup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const examRepository = typeorm_1.dataSource.getRepository(exam_entity_1.Exam);
            const { groupId } = req.params;
            const exams = yield examRepository.find({ where: { groupId } });
            res.status(200).json({ message: 'Success', exams });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getExamsByGroup = getExamsByGroup;
function deleteExam(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const examRepository = typeorm_1.dataSource.getRepository(exam_entity_1.Exam);
            const { examId } = req.params;
            const deletedExam = yield examRepository.findOneBy({ examId });
            yield examRepository.delete({ examId });
            res.status(200).json({ message: 'Success', deletedExam });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteExam = deleteExam;
function createExam(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const examRepository = typeorm_1.dataSource.getRepository(exam_entity_1.Exam);
            const { title, description, duration, maxScore, passingScore, groupId } = req.body;
            const isValid = (0, exam_validation_1.examValidate)({ title, description, duration, maxScore, passingScore, groupId });
            if (isValid)
                throw new customError_1.CustomError(isValid, 400);
            const exam = yield examRepository.findOne({ where: { title, description, groupId } });
            if (exam)
                throw new customError_1.CustomError(`'${title}' exam already exists`, 409);
            const newExam = new exam_entity_1.Exam();
            newExam.title = title;
            newExam.description = description;
            newExam.duration = duration;
            newExam.maxScore = maxScore;
            newExam.passingScore = passingScore;
            newExam.groupId = groupId;
            yield examRepository.save(newExam);
            res.status(201).json({ message: 'Success', newExam });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createExam = createExam;
//# sourceMappingURL=admin-exam.controller.js.map