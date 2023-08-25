"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.examValidate = void 0;
const joi_1 = __importDefault(require("joi"));
function examValidate(exam) {
    const examSchema = joi_1.default.object({
        title: joi_1.default.string().min(3).required(),
        description: joi_1.default.string().min(5).required(),
        duration: joi_1.default.number().required(),
        maxScore: joi_1.default.number().required(),
        passingScore: joi_1.default.number().required(),
        groupId: joi_1.default.string().required(),
    });
    const { error } = examSchema.validate(exam);
    return error ? error.message : false;
}
exports.examValidate = examValidate;
//# sourceMappingURL=exam.validation.js.map