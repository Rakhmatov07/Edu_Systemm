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
exports.verify = exports.logout = exports.login = exports.register = void 0;
const register_validation_1 = require("../../validations/register.validation");
const emailVerification_1 = require("../../utils/emailVerification");
const login_validation_1 = require("../../validations/login.validation");
const bcrypt_1 = require("../../utils/bcrypt");
const student_entity_1 = require("../../entities/student.entity");
const customError_1 = require("../../utils/customError");
const typeorm_1 = require("../../database/typeorm");
const jwt_1 = require("../../utils/jwt");
const redis_1 = require("../../database/redis");
function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { firstname, lastname, email, password } = req.body;
            const studentRepository = typeorm_1.dataSource.getRepository(student_entity_1.Student);
            const isValid = (0, register_validation_1.registerValidate)({ firstname, lastname, email, password });
            if (isValid)
                throw new customError_1.CustomError(isValid, 400);
            const student = yield studentRepository.findOne({ where: { email } });
            if (student)
                throw new customError_1.CustomError('Already Registered', 409);
            const code = Math.floor((Math.random() * 1000000) + 1);
            yield redis_1.redis.set(email, code, 'EX', 60);
            const emailData = (0, emailVerification_1.mailData)(email, 'Registration', 'Do you agree to registre?', `<b>Hey there!</b><br> Your verification code: ${code}.<br/>`);
            emailVerification_1.transporter.sendMail(emailData);
            const hashedPass = yield (0, bcrypt_1.hashPayload)(password);
            const newStudent = studentRepository.create({ firstname, lastname, email, password: hashedPass });
            yield studentRepository.save(newStudent);
            res.status(200).json({ message: 'Verify your email!' });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.register = register;
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const studentRepository = typeorm_1.dataSource.getRepository(student_entity_1.Student);
            const isValid = (0, login_validation_1.loginValidate)({ email, password });
            if (isValid)
                throw new customError_1.CustomError(isValid, 400);
            const student = yield studentRepository.findOne({ where: { email } });
            if (!student)
                throw new customError_1.CustomError('Not Found', 404);
            const checkPass = yield (0, bcrypt_1.comparePayload)(password, student.password);
            if (!checkPass)
                throw new customError_1.CustomError('Invalid Password', 403);
            const token = (0, jwt_1.signPayload)(student.studentId);
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
function verify(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, code } = req.body;
            const studentRepository = typeorm_1.dataSource.getRepository(student_entity_1.Student);
            const redisCode = yield redis_1.redis.get(email);
            const student = yield studentRepository.findOne({ where: { email } });
            if (!student)
                throw new customError_1.CustomError('Student Not Found', 404);
            if (code != redisCode) {
                yield studentRepository.delete({ email });
                throw new customError_1.CustomError('Invalid Verification code!\nTry again!', 403);
            }
            const token = (0, jwt_1.signPayload)(student.studentId);
            res.cookie('token', token);
            res.status(201).json({ message: 'Successfully Registered' });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.verify = verify;
//# sourceMappingURL=student.controller.js.map