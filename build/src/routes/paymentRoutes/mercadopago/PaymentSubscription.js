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
const PaymentSubCreate_1 = __importDefault(require("../../../controllers/PaymentsControllers/PaymentSubCreate"));
(0, dotenv_1.config)();
const router = (0, express_1.Router)();
//* /paymentsubs/
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
    if (req.sub_type) {
        const id = req.sub_type;
        let subscription = yield (0, PaymentSubCreate_1.default)(id);
        res.status(200).send(subscription.data.init_point);
    }
}));
exports.default = router;
