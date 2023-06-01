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
//* /admin/orders/:id/:status
// se envia por params el id de la orden, y el status en que debe quedar.
// status: o = canceled, 1 = ordered
// ejemplo: /admin/orders/638d1c740cc2b2db18188819/0
router.put("/:id/:status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, status } = req.params;
        if (!id || !status) {
            return res.status(400).send("Missing data");
        }
        ;
        const parsedStatus = +status;
        console.log(typeof parsedStatus);
        const order = yield ShoppingOrder_1.default.findByIdAndUpdate(id, { orderStatus: parsedStatus });
        //console.log("order", order);
        if (!order || order.length === 0) {
            return res.status(404).send("No matches found for this id");
        }
        ;
        return res.status(200).send("orderStatus updated");
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}));
exports.default = router;
