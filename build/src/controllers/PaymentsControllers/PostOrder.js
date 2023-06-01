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
const ConfirmPayment_1 = __importDefault(require("../Mails/ConfirmPayment"));
const postOrder = (response, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = response;
        const order_user = yield User_1.default.findById(user_id);
        const address = "userAdress";
        // let address;
        // for (const ind_address of order_user?.address) {
        //     if (ind_address.isDefault === true) {
        //         address = ind_address
        //     }
        // }
        // const { country, stateName, cityName, postalCode, streetName, streetNumber, floor, apartment } = address
        const newOrder = new ShoppingOrder_1.default({
            user_id,
            user: `${order_user.lastName}, ${order_user.name}`,
            // order_address: `${country}, ${stateName}, ${cityName} (${postalCode}), ${streetName} ${streetNumber}, floor: ${floor}, apartment: ${apartment}`,
            order_address: `adress`,
            items: data.body.items,
            orderDate: Date.now(),
            payment: "Mercado Pago",
            shippingMethod: 'Correo',
            orderTotal: data.body.total_amount,
            orderStatus: 1 //mercadopago devuelve un string
        });
        // const mail = await confirmPayment( "Wine purchase", address, order_user, data.body.total_amount);
        const mail = yield (0, ConfirmPayment_1.default)("Wine purchase", order_user, data.body.total_amount);
        console.log(mail);
        const createdOrder = yield newOrder.save();
        order_user.order.push(createdOrder._id);
        order_user.shopping_cart = [];
        order_user.save();
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.default = postOrder;
