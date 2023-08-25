import SMTPTransport from "nodemailer/lib/smtp-transport";
import nodemailer from "nodemailer";
import config from "config";

const ownEmail: string = config.get('ownEmail');
const emailPass: string = config.get('emailPass');

export const transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: ownEmail,
        pass: emailPass,
    },
    secure: true,
});

export function mailData(to: string, subject: string, text: string, html: string): {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
} {
    return {
        from: ownEmail,
        to, // Send the registration email to the provided user's email address
        subject,
        text,
        html,
    }
};