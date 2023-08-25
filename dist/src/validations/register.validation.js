"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidate = void 0;
const joi_1 = __importDefault(require("joi"));
function registerValidate(user) {
    const registerSchema = joi_1.default.object({
        firstname: joi_1.default.string().min(3).required(),
        lastname: joi_1.default.string().min(3).required(),
        email: joi_1.default.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required(),
        password: joi_1.default.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required()
    });
    const { error } = registerSchema.validate(user);
    return error ? error.message : false;
}
exports.registerValidate = registerValidate;
//# sourceMappingURL=register.validation.js.map