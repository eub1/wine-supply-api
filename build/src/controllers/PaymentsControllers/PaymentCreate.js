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
const Wine_1 = __importDefault(require("../../models/Wine"));
const PaymentCreate = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const items = [];
    if (typeof data === 'string') {
        try {
            const wine = yield Wine_1.default.findById(data);
            if (wine && wine.stock > 0) {
                items.push({
                    id: wine._id,
                    title: wine.name,
                    unit_price: wine.price,
                    // picture_url: wine.images[0],
                    quantity: 1,
                    currency_id: "ARS"
                });
                return items;
            }
            if (wine && wine.stock <= 0)
                return console.log('No stock!');
        }
        catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    if (data) {
        try {
            data.forEach((e) => {
                items.push({
                    id: e._id,
                    title: e.name,
                    description: "cart",
                    unit_price: e.price,
                    // picture_url: e.images[0],
                    quantity: e.cuantity,
                    currency_id: "ARS"
                });
            });
            return items;
        }
        catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
});
exports.default = PaymentCreate;
