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
exports.isStudent = void 0;
const student_entity_1 = require("../../entities/student.entity");
const customError_1 = require("../../utils/customError");
const typeorm_1 = require("../../database/typeorm");
const jwt_1 = require("../../utils/jwt");
function isStudent(req, _, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const studentRepository = typeorm_1.dataSource.getRepository(student_entity_1.Student);
            const { token } = req.cookies;
            const studentId = (0, jwt_1.verifyPayload)(token);
            if (!studentId)
                throw new customError_1.CustomError("Invalid Token", 403); // Use CutomError to return error response
            const student = yield studentRepository.findOne({ where: { studentId: studentId.toString() } });
            if (!student)
                throw new customError_1.CustomError('Student Not Found', 404);
            req.student = student;
            next();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.isStudent = isStudent;
//# sourceMappingURL=isStudent.js.map