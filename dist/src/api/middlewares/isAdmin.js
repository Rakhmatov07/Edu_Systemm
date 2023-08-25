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
exports.isAdmin = void 0;
const customError_1 = require("../../utils/customError");
const admin_entity_1 = require("../../entities/admin.entity");
const typeorm_1 = require("../../database/typeorm");
const jwt_1 = require("../../utils/jwt");
function isAdmin(req, _res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(56);
        try {
            console.log(req.body);
            const adminRepository = typeorm_1.dataSource.getRepository(admin_entity_1.Admin);
            const { token } = req.cookies;
            const adminId = (0, jwt_1.verifyPayload)(token);
            if (!adminId)
                throw new customError_1.CustomError("Invalid Token", 403); // Use CutomError to return error response
            const admin = yield adminRepository.findOneBy({ adminId: adminId.toString() });
            if (!admin)
                throw new customError_1.CustomError('Admin Not Found', 404);
            if (admin.email !== "joewillson857@gmail.com")
                throw new customError_1.CustomError('Not Allowed', 409);
            next();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.isAdmin = isAdmin;
//# sourceMappingURL=isAdmin.js.map