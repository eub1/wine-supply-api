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
// import { Router } from "express"
const jwt = require("jsonwebtoken");
const User_1 = __importDefault(require("../../models/User"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// const router = Router()
//* /verifyuser/
function verTokenPayment(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            try {
                token = req.headers.authorization.split(" ")[1];
                const checkToken = jwt.verify(token, process.env.JWTKEY);
                req.user = yield User_1.default.findById(checkToken._id, "-hashedPass");
                // .populate({ path:'shopping_cart', select:'_id name images price stock'})
                if (req.headers.items) {
                    req.shoppingCart = JSON.parse(req.headers.items);
                }
                if (req.headers.item) {
                    req.item = req.headers.item;
                }
                if (req.headers.sub_type) {
                    req.sub_type = req.headers.sub_type;
                }
                next();
            }
            catch (error) {
                console.log(error);
                res.status(300).send("Not authorized!");
            }
        }
        if (!token) {
            res.status(303).send("no token!");
        }
    });
}
exports.default = verTokenPayment;
