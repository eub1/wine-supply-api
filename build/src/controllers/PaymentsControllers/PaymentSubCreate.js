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
const axios_1 = __importDefault(require("axios"));
const SubscriptionDetail_1 = __importDefault(require("./SubscriptionDetail"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const PaymentSubCreate = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let sub = yield (0, SubscriptionDetail_1.default)(data);
    let subscription = JSON.stringify(sub);
    let response = yield axios_1.default.post('https://api.mercadopago.com/preapproval_plan', subscription, { headers: {
            'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN_MP,
            'Content-Type': 'application/json'
        } });
    return response;
});
exports.default = PaymentSubCreate;
