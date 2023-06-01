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
const express_1 = require("express");
const router = (0, express_1.Router)();
//* /getcart/
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const wineId = req.headers.wineid;
    if (req.user.shopping_cart.length > 0) {
        try {
            req.user.shopping_cart.pull(wineId);
            req.user.save();
            return res.status(200).send('Wine deleted!');
        }
        catch (err) {
            console.log(err);
        }
    }
    return res.status(300).send('No items in the shopping cart!');
}));
exports.default = router;
