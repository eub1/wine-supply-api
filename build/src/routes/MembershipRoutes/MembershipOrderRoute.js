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
const mercadopago = require('mercadopago');
const PostMembership_1 = __importDefault(require("../../controllers/Membership controllers/PostMembership"));
const router = (0, express_1.Router)();
// *  /membership
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        //console.log("user", user);
        if (!user.isActive) {
            return res.status(303).send("Inactive user, do you want to recover it?");
        }
        ;
        if (!user) {
            return res.status(404).send("User not found!");
        }
        ;
        const response = req.query;
        // const orderShopId = response.merchant_order_id;
        // const data = await mercadopago.merchant_orders.findById(orderShopId);
        // postOrder(response, data);
        const newMembership = (0, PostMembership_1.default)(response, user);
        res.send(newMembership);
    }
    catch (error) {
        return res.status(400).send({ error: error.message });
    }
}));
exports.default = router;
