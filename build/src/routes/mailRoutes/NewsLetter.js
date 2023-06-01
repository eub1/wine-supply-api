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
const express_1 = require("express");
const NewsLetter_1 = __importDefault(require("../../controllers/Mails/NewsLetter"));
const GetAllUsers_1 = __importDefault(require("../../controllers/GetAllUsers"));
const router = (0, express_1.Router)();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subject, title, news, image } = req.body;
    const users = yield (0, GetAllUsers_1.default)();
    try {
        if (users) {
            const mailSend = yield users.map((e) => {
                try {
                    return (0, NewsLetter_1.default)(e.email, subject, title, news, image);
                }
                catch (error) {
                    return error;
                }
                ;
            });
            res.status(200).json({ message: "Mails send" });
        }
    }
    catch (error) {
        res.status(500).send("Something bad happend in server :c\n " + error.message);
    }
}));
exports.default = router;
