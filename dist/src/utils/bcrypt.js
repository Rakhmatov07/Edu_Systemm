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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePayload = exports.hashPayload = void 0;
const bcrypt_1 = require("bcrypt");
const config_1 = __importDefault(require("config"));
const salt = config_1.default.get('SALT');
const hashPayload = (payload) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, bcrypt_1.hash)(payload, salt); });
exports.hashPayload = hashPayload;
const comparePayload = (payload, encryptedPayload) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, bcrypt_1.compare)(payload, encryptedPayload); });
exports.comparePayload = comparePayload;
//# sourceMappingURL=bcrypt.js.map