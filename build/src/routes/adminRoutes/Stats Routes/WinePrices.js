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
const WinePricesController_1 = require("../../../controllers/Stats/WinePricesController");
const router = require("express").Router();
// total number of registered Users Per Month
//* /admin/stats/wines/prices
// si manda por query ?rates=true  trae ratio de precios
// si no, trae todos los precios y cantidad de vinos por cada uno. Tal vez puedo hacer por rangos de precios
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pricesRates = yield (0, WinePricesController_1.pricesRatio)();
        const prices = yield (0, WinePricesController_1.getPrices)();
        if (req.query.rates) {
            return res.status(200).send(pricesRates);
        }
        res.status(200).send(prices);
    }
    catch (error) {
        res.send(error.message);
    }
}));
exports.default = router;
