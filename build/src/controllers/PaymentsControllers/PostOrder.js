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
const ShoppingOrder_1 = __importDefault(require("../../models/ShoppingOrder"));
const User_1 = __importDefault(require("../../models/User"));
const ResetCart_1 = __importDefault(require("./ResetCart"));
const postOrder = (response, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastName, user_id, country, state_name, city_name, zip_code, street_name, street_number, floor, apartment } = response;
    const newOrder = new ShoppingOrder_1.default({
        user_id,
        user: `${lastName}, ${name}`,
        order_address: `${country}, ${state_name}, ${city_name} (${zip_code}), ${street_name} ${street_number}, floor: ${floor}, apartment: ${apartment}`,
        items: data.body.items,
        orderDate: Date.now(),
        payment: "Mercado Pago",
        shippingMethod: 'Correo',
        orderTotal: data.body.total_amount,
        orderStatus: 1 //mercadopago devuelve un string
    });
    const createdOrder = yield newOrder.save();
    try {
        const order_user = yield User_1.default.findOneAndUpdate({ _id: user_id }, { $push: { order: createdOrder._id } });
        const updatedUser = order_user === null || order_user === void 0 ? void 0 : order_user.save();
    }
    catch (err) {
        console.log(err);
    }
    if (data.body.items[0].description === "cart") {
        (0, ResetCart_1.default)(user_id);
    }
});
exports.default = postOrder;
