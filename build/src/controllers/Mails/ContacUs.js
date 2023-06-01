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
const nodemailer = require("nodemailer");
const contactUsLetter = (mail, subject, text, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // async..await is not allowed in global scope, must use a wrapper
        function main() {
            return __awaiter(this, void 0, void 0, function* () {
                // Generate test SMTP service account from ethereal.email
                // Only needed if you don't have a real mail account for testing
                let testAccount = yield nodemailer.createTestAccount();
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false,
                    auth: {
                        user: "winesupplyback@gmail.com",
                        pass: "thotqtuoklmgfkee", // generated ethereal password
                    },
                });
                // send mail with defined transport object
                let info = yield transporter.sendMail({
                    from: `${mail}`,
                    to: `winesupplyback@gmail.com`,
                    subject: `${subject}`,
                    text: `${text}`,
                    html: `
                <h1>${subject}</h1>
                <h2>Send by: ${name} <br/> Email: ${mail} </h2>
                <h3>${text}</h3>
                `, // html body
                });
                console.log("Message sent: %s", info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
        }
        yield main().catch(console.error);
        return true;
    }
    catch (erro) {
        console.log(erro);
    }
});
exports.default = contactUsLetter;
