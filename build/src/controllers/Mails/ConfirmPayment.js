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
const ConfirmPaymentModel_1 = __importDefault(require("./ConfirmPaymentModel"));
const nodemailer = require("nodemailer");
const confirmPayment = (subject, user, amount) => __awaiter(void 0, void 0, void 0, function* () {
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
                    from: '" 🍷 Wine Suplly Team  🍷 " <winesupplyback@gmail.com>',
                    to: `${user.email}`,
                    subject: `Payment`,
                    text: `${subject}`,
                    html: (0, ConfirmPaymentModel_1.default)(user, amount), // html body
                });
                console.log("Message sent: %s", info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
        }
        return yield main().catch(console.error);
    }
    catch (erro) {
        console.log(erro);
    }
});
exports.default = confirmPayment;
