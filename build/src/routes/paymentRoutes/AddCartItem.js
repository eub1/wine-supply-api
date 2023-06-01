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
const User_1 = __importDefault(require("../../models/User"));
const router = (0, express_1.Router)();
//* /addcartitem/
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const wines = JSON.parse(req.headers.items);
    // let listWines = wines.map((e:any) => {
    //     return {
    try {
        //         id: e._id,
        //         name: e.name,
        //         img: e.img,
        //         descriptions: e.descriptions,
        //         price: e.price,
        //         rating: e.rating,
        //         cuantity: e.cuantity
        //     }
        let user = yield User_1.default.findOneAndUpdate({ _id: userId }, { $set: { shopping_cart: wines } });
        user === null || user === void 0 ? void 0 : user.save();
        return res.status(200).send("wines added!");
    }
    catch (err) {
        console.log(err);
        return res.status(403).send("Can't add wines to cart!");
    }
}));
//     let updatedUser = req.user
//     updatedUser.shopping_cart = listWines
//     updatedUser.save()
exports.default = router;
