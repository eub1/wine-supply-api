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
const PostOrder_1 = __importDefault(require("../../controllers/PaymentsControllers/PostOrder"));
const User_1 = __importDefault(require("../../models/User"));
const router = (0, express_1.Router)();
// */ /createorder
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = req.query; // id - orderShopId (es de mercado pago)
        const orderShopId = response.merchant_order_id;
        const data = yield mercadopago.merchant_orders.findById(orderShopId);
        (0, PostOrder_1.default)(response, data);
        const user = yield User_1.default.findById(response.user_id);
        return res.redirect(`https://voluble-hummingbird-3fb9b1.netlify.app/user/${user === null || user === void 0 ? void 0 : user.name}/profile`);
        // 'http://localhost:3000/home/products'
    }
    catch (error) {
        console.log(error);
        return res.status(400).send("Couldn't generate order!");
    }
}));
exports.default = router;
