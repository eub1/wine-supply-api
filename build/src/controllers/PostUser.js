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
const User_1 = __importDefault(require("../models/User"));
const postUser = (name, lastName, userName, email, hashedPass) => __awaiter(void 0, void 0, void 0, function* () {
    const image = ["https://res.cloudinary.com/dq3sboxbn/image/upload/v1669934892/Users/Not_image.png_wd8tei.png", "v1669934892"];
    let existingUser;
    try {
        existingUser = yield User_1.default.findOne({ email: email });
    }
    catch (error) {
        console.log(error);
    }
    if (existingUser)
        throw new Error("User already exist");
    const newUser = new User_1.default({
        name,
        lastName,
        userName,
        email,
        hashedPass,
        image
    });
    const createdUser = yield newUser.save();
    return createdUser;
});
exports.default = postUser;
