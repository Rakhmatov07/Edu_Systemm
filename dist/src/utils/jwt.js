"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayload = exports.signPayload = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const { sign, verify } = jsonwebtoken_1.default;
const jwt_key = config_1.default.get("JWT_KEY");
const signPayload = (payload) => sign(payload, jwt_key);
exports.signPayload = signPayload;
const verifyPayload = (payload) => verify(payload, jwt_key);
exports.verifyPayload = verifyPayload;
//# sourceMappingURL=jwt.js.map