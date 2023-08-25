"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectValidate = void 0;
const joi_1 = __importDefault(require("joi"));
function projectValidate(project) {
    const projectSchema = joi_1.default.object({
        projectName: joi_1.default.string().required(),
        groupId: joi_1.default.string().required(),
        examId: joi_1.default.string().required()
    });
    const { error } = projectSchema.validate(project);
    return error ? error.message : false;
}
exports.projectValidate = projectValidate;
//# sourceMappingURL=project.validation.js.map