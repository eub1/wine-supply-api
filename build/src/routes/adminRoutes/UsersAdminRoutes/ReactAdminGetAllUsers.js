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
const User_1 = __importDefault(require("../../../models/User"));
const router = (0, express_1.Router)();
//* /admin/users
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find().select("-hashedPass");
        const parsedUsers = users.map((e) => {
            return {
                id: e._id,
                name: e.name,
                lastName: e.lastName,
                userName: e.userName,
                email: e.email,
                date_of_birth: e.date_of_birth,
                phone: e.phone,
                avatar: e.avatar,
                isAdmin: e.isAdmin,
                isActive: e.isActive,
                address: e.address,
                shopping_cart: e.shopping_cart,
                order: e.order,
                whishList: e.whishList,
                membership_id: e.membership_id,
                createdAt: e.createdAt,
                updatedAt: e.updatedAt,
            };
        });
        //  console.log("parsedUsers", parsedUsers);
        let total = parsedUsers.length;
        res.header({ 'content-Range': `parsedUsers 0-20/${total}`, 'Access-Control-Expose-Headers': 'Content-Range' });
        return res.status(200).send(parsedUsers);
    }
    catch (error) {
        return res.status(404).send('Cant get users!');
    }
}));
exports.default = router;
