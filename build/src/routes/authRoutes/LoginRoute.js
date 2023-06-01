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
const User_1 = __importDefault(require("../../models/User"));
const PostUserFirebase_1 = __importDefault(require("../../controllers/PostUserFirebase"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const router = (0, express_1.Router)();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//* /login
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let existingUser;
    if (!req.body.password) {
        try {
            const { given_name, family_name, email } = req.body.profile;
            let existingUser = yield User_1.default.findOne({ email });
            if (!existingUser) {
                const newUser = yield (0, PostUserFirebase_1.default)(given_name, family_name, email);
                const token = jwt.sign({ _id: newUser._id }, process.env.JWTKEY, { expiresIn: "2d" });
                return res.status(200).json({ info: "Successfull log-in!", user: existingUser, token });
            }
            if (existingUser) {
                if (!existingUser.isActive)
                    return res.status(303).send("Inactive user, do you want to recover it?");
                const token = jwt.sign({ _id: existingUser._id }, process.env.JWTKEY, { expiresIn: "2d" });
                return res.status(200).json({ info: "Successfull log-in!", user: existingUser, token });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(302).send("Not authorized!");
        }
    }
    const { email, password } = req.body;
    try {
        existingUser = yield User_1.default.findOne({ email: email });
    }
    catch (error) {
        return error;
    }
    if (!existingUser)
        return res.status(400).send("User doesnt exist!");
    const comparePassword = yield bcrypt.compare(password, existingUser.hashedPass);
    if (!comparePassword) {
        return res.status(400).send("Incorrect password!");
    }
    if (!existingUser.isActive)
        return res.status(303).send("Inactive user, do you want to recover it?");
    const token = yield jwt.sign({ _id: existingUser._id }, process.env.JWTKEY, { expiresIn: "2d" });
    return res.status(200).json({ info: "Successfull log-in!", user: existingUser, token });
}));
/*Si el usuario existe y se valida la contraseña devuelve un objeto:

{ info:"Successfull log-in!",
user: existingUser,
token}

Esto se puede cambiar, agreagar cosas o sacar segun la necesidad

IMPORTANTE! AVERIGUAR SOBRE REFRESH TOKEN

*/
exports.default = router;
