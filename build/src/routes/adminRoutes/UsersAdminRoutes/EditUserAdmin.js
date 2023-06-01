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
// import getuserById from "../../controllers/GetuserById";
const User_1 = __importDefault(require("../../../models/User"));
const router = (0, express_1.Router)();
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        let user = yield User_1.default.findById(id);
        let result;
        if (!user) {
            return res.status(404).send("User not found!");
        }
        for (const property in req.body) {
            if (property === "isActive") {
                user.isActive = req.body[property];
            }
            if (user[property] && property !== "_id" && property !== '$__' && property !== '$isNew' && property !== 'isActive') {
                user[property] = req.body[property];
            }
        }
        if (user) {
            let updatedUser = yield User_1.default.findByIdAndUpdate(id, user);
            updatedUser = Object.assign(Object.assign({}, updatedUser), { id: updatedUser._id });
            res.send(updatedUser);
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send("Update not possible!");
    }
}));
exports.default = router;
