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
const router = (0, express_1.Router)();
//* /usermembership
// verifica token del usuario
// trae al usuario y la data de su membresia
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).send("User not found!");
        }
        if (!user.isActive) {
            return res.status(303).send("Inactive user, do you want to recover it?");
        }
        const userMembership = yield User_1.default.find({ _id: user._id, isActive: true }).select("membership_id").populate('Membership').select("-user_id");
        console.log("userMembership", userMembership);
        if (userMembership.isActive) {
            return res.status(200).send(userMembership);
        }
        else {
            res.status(200).send("Membresia inactiva");
        }
    }
    catch (error) {
        return res.status(400).send({ error: error.message });
    }
}));
exports.default = router;
