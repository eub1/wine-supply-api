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
const PostUser_1 = __importDefault(require("../../controllers/PostUser"));
const WelcomeMail_1 = __importDefault(require("../../controllers/Mails/WelcomeMail"));
// import bcrypt from "bcrypt"
const bcrypt = require("bcrypt");
const router = (0, express_1.Router)();
//* /signup
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name, lastName, userName, email, password } = req.body;
        const hashedPass = yield bcrypt.hash(password, 10);
        const newUser = yield (0, PostUser_1.default)(name, lastName, userName, email, hashedPass);
        try {
            const mail = yield (0, WelcomeMail_1.default)(newUser.email);
        }
        catch (error) {
            res.status(400).json({ message: "Unable to sign up", error });
        }
        res.status(200).send(`${newUser.name} user created successfully!`);
    }
    catch (error) {
        res.status(400).send("Can't create user!");
    }
}));
/* AGREGAR VALIDACIONES A FUTURO */
exports.default = router;
