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
//* /getorders/
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    try {
        let user = yield User_1.default.findById(userId, 'order').populate('order');
        if ((user === null || user === void 0 ? void 0 : user.order.length) > 0) {
            return res.status(200).json(user === null || user === void 0 ? void 0 : user.order);
        }
        return res.status(300).send('No shopping orders present!');
    }
    catch (err) {
        console.log(err);
    }
}));
exports.default = router;
