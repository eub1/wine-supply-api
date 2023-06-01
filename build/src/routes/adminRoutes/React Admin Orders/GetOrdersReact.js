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
const ShoppingOrder_1 = __importDefault(require("../../../models/ShoppingOrder"));
const router = (0, express_1.Router)();
//* /admin/orders
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield ShoppingOrder_1.default.find().sort({ _id: -1 }).lean();
        if (order.length === 0) {
            res.status(404).send("No orders found");
        }
        ;
        // console.log("order", order);
        const parsedOrder = order.map((e) => {
            return {
                id: e._id,
                user: e.user,
                order_address: e.order_address,
                items: e.items,
                orderDate: e.orderDate,
                payment: e.payment,
                shippingMethod: e.shippingMethod,
                orderTotal: e.orderTotal,
                orderStatus: e.orderStatus
            };
        });
        //  console.log("parsedOrder", parsedOrder);
        let total = parsedOrder.length;
        res.header({ 'content-Range': `parsedOrder 0-20/${total}`, 'Access-Control-Expose-Headers': 'Content-Range' });
        return res.status(200).send(parsedOrder);
    }
    catch (error) {
        return res.status(404).send("Can't get orders!");
    }
}));
exports.default = router;
