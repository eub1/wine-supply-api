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
const StatsPerWeekController_1 = require("../../../controllers/Stats/StatsPerWeekController");
const router = require("express").Router();
// total number of registered Users Per Month
//* /admin/stats/perweek
// por query envian el model en el que se va a buscar la data. (deben venir escritos igual que el model)
// ejemplo: /admin/stats/permonth?model=UserModel
// devuelve:
// _id --> es el mes
// total --> cantidad de users por ejemplo
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { model } = req.query;
    let data = [];
    try {
        if (model === "UserModel") {
            data = yield (0, StatsPerWeekController_1.usersPerWeek)();
        }
        ;
        if (model === "ShoppingOrder") {
            data = yield (0, StatsPerWeekController_1.ordersPerWeek)();
        }
        ;
        res.status(200).send(data);
    }
    catch (error) {
        res.send(error.message);
    }
}));
exports.default = router;
