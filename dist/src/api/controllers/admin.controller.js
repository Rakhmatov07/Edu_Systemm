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
exports.logout = exports.login = void 0;
const login_validation_1 = require("../../validations/login.validation");
const customError_1 = require("../../utils/customError");
const bcrypt_1 = require("../../utils/bcrypt");
const admin_entity_1 = require("../../entities/admin.entity");
const typeorm_1 = require("../../database/typeorm");
const jwt_1 = require("../../utils/jwt");
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(Date.now());
        try {
            const { email, password } = req.body;
            console.log(Date.now());
            const adminRepository = typeorm_1.dataSource.getRepository(admin_entity_1.Admin);
            const isValid = (0, login_validation_1.loginValidate)({ email, password });
            if (isValid)
                throw new customError_1.CustomError(isValid, 400);
            console.log(Date.now());
            const admin = yield adminRepository.findOneBy({ email });
            console.log(Date.now());
            if (!admin)
                throw new customError_1.CustomError('Not Found', 404);
            const checkPass = yield (0, bcrypt_1.comparePayload)(password, admin.password);
            if (!checkPass)
                throw new customError_1.CustomError('Invalid Password', 403);
            console.log(Date.now());
            const token = (0, jwt_1.signPayload)(admin.adminId);
            console.log(Date.now());
            res.cookie('token', token);
            res.status(200).json({ message: 'Successfully logged In' });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.login = login;
function logout(_, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.cookie('token', '');
            res.status(200).json({ message: 'Successfully logged Out' });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.logout = logout;
//# sourceMappingURL=admin.controller.js.map