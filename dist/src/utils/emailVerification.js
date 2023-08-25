"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailData = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("config"));
const ownEmail = config_1.default.get('ownEmail');
const emailPass = config_1.default.get('emailPass');
exports.transporter = nodemailer_1.default.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: ownEmail,
        pass: emailPass,
    },
    secure: true,
});
function mailData(to, subject, text, html) {
    return {
        from: ownEmail,
        to,
        subject,
        text,
        html,
    };
}
exports.mailData = mailData;
;
//# sourceMappingURL=emailVerification.js.map