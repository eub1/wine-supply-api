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
Object.defineProperty(exports, "__esModule", { value: true });
const SubscriptionDetail = (data) => __awaiter(void 0, void 0, void 0, function* () {
    switch (data) {
        case 'Regular': {
            return {
                "reason": "Wine Club (Regular Subscription)",
                "auto_recurring": {
                    "frequency": 1,
                    "frequency_type": "months",
                    "billing_day": 10,
                    "billing_day_proportional": false,
                    "transaction_amount": 40,
                    "currency_id": "ARS"
                },
                "back_url": "http://google.com"
            };
            break;
        }
        case 'Premium': {
            return {
                "reason": "Wine Club (Premium Subscription)",
                "auto_recurring": {
                    "frequency": 1,
                    "frequency_type": "months",
                    "billing_day": 10,
                    "billing_day_proportional": false,
                    "transaction_amount": 60,
                    "currency_id": "ARS"
                },
                "back_url": "http://google.com"
            };
            break;
        }
        case 'Sommeliere': {
            return {
                "reason": "Wine Club (Sommeliere Subscription)",
                "auto_recurring": {
                    "frequency": 1,
                    "frequency_type": "months",
                    "billing_day": 10,
                    "billing_day_proportional": false,
                    "transaction_amount": 80,
                    "currency_id": "ARS"
                },
                "back_url": "http://google.com"
            };
            break;
        }
        default:
            return console.log('No membership specified!');
    }
});
exports.default = SubscriptionDetail;
