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
const mercadopago = require("mercadopago");
const dotenv_1 = require("dotenv");
const PaymentCreate_1 = __importDefault(require("../../../controllers/PaymentsControllers/PaymentCreate"));
(0, dotenv_1.config)();
const router = (0, express_1.Router)();
//* /payment/
mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN_MP,
});
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    let id = _id.toString();
    let address1;
    // for (const address of req.user.address) {
    //     if (address.isDefault === true) {
    //         address1 = address
    //     }
    // }
    // if (!address1) {
    //     return res.status(400).send("Address not found!")
    // }
    //wine-supply-back-production.up.railway.app
    try {
        if (req.item) {
            const item = req.item;
            let items = yield (0, PaymentCreate_1.default)(item);
            let preference = {
                auto_return: "approved",
                back_urls: {
                    success: `https://localhost:3001/createorder?user_id=${id}`,
                },
                items,
                // notification_url : 'http://localhost:3001/notificar'
            };
            const pruebaMercadoPago = yield mercadopago.preferences.create(preference);
            return res.send(pruebaMercadoPago.body.init_point);
        }
        if (req.body) {
            console.log(req.user);
            const cart = req.user.shopping_cart;
            let items = yield (0, PaymentCreate_1.default)(cart);
            let preference = {
                auto_return: "approved",
                back_urls: {
                    success: `https://localhost:3001/createorder?user_id=${id}`,
                },
                items,
                // notification_url : 'http://localhost:3001/notificar'
            };
            const pruebaMercadoPago = yield mercadopago.preferences.create(preference);
            return res.send(pruebaMercadoPago.body.init_point);
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).send("Error in payment creation!");
    }
    res.status(300).send("No items received!");
}));
exports.default = router;
