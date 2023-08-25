"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupValidate = void 0;
const joi_1 = __importDefault(require("joi"));
function groupValidate(group) {
    const groupSchema = joi_1.default.object({
        groupName: joi_1.default.string().min(3).required()
    });
    const { error } = groupSchema.validate(group);
    return error ? error.message : false;
}
exports.groupValidate = groupValidate;
//# sourceMappingURL=group.validation.js.map