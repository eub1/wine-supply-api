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
    const { name, lastName, phone, _id } = req.user;
    let id = _id.toString();
    let address1;
    for (const address of req.user.address) {
        if (address.isDefault === true) {
            address1 = address;
        }
    }
    if (!address1) {
        return res.status(400).send("Address not found!");
    }
    const { country, stateName, cityName, postalCode, streetName, streetNumber, floor, Apartment } = address1;
    if (req.shoppingCart) {
        const cart = req.shoppingCart;
        let items = yield (0, PaymentCreate_1.default)(cart);
        let preference = {
            auto_return: 'approved',
            back_urls: {
                success: `https://wine-supply-back-production.up.railway.app/createorder?name=${name}&lastName=${lastName}&user_id=${id}&country=${country}&state_name=${stateName}&city_name=${cityName}&zip_code=${postalCode}&street_name=${streetName}&street_number=${streetNumber}&floor=${floor}&apartment=${Apartment}`
            },
            items
            // notification_url : 'http://localhost:3001/notificar'
        };
        const pruebaMercadoPago = yield mercadopago.preferences.create(preference);
        res.send(pruebaMercadoPago.body.init_point);
    }
    if (req.item) {
        const item = req.item;
        let items = yield (0, PaymentCreate_1.default)(item);
        let preference = {
            auto_return: 'approved',
            back_urls: {
                success: `https://wine-supply-back-production.up.railway.app/createorder?name=${name}&lastName=${lastName}&user_id=${id}&country=${country}&state_name=${stateName}&city_name=${cityName}&zip_code=${postalCode}&street_name=${streetName}&street_number=${streetNumber}&floor=${floor}&apartment=${Apartment}`
            },
            items
            // notification_url : 'http://localhost:3001/notificar'
        };
        const pruebaMercadoPago = yield mercadopago.preferences.create(preference);
        res.send(pruebaMercadoPago.body.init_point);
    }
}));
exports.default = router;
