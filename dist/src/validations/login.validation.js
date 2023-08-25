"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidate = void 0;
const joi_1 = __importDefault(require("joi"));
function loginValidate(user) {
    const loginSchema = joi_1.default.object({
        email: joi_1.default.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required(),
        password: joi_1.default.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required()
    });
    const { error } = loginSchema.validate(user);
    return error ? error.message : false;
}
exports.loginValidate = loginValidate;
//# sourceMappingURL=login.validation.js.map