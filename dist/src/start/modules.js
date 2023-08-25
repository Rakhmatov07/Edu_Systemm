"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modules = void 0;
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("../api/routes"));
const errorHandler_1 = require("../api/middlewares/errorHandler");
const modules = (app) => {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)({ origin: '*' }));
    app.use((0, cookie_parser_1.default)());
    app.use((0, express_fileupload_1.default)());
    app.use(express_1.default.static(process.cwd() + "/public"));
    app.use(routes_1.default);
    app.use(errorHandler_1.errorHandler);
};
exports.modules = modules;
//# sourceMappingURL=modules.js.map