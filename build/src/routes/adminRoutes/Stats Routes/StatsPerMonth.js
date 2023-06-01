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
const StatsPerMonthController_1 = require("../../../controllers/Stats/StatsPerMonthController");
const router = require("express").Router();
// total number of registered Users Per Month
//* /admin/stats/permonth
// por query envian el model en el que se va a buscar la data.
// no pongo el nombre exacto del model por query por seguridad
// ejemplo: /admin/stats/permonth?model=user
// user = UserModel
// order = ShoppingOrder
// wine = WineModel
// review = ReviewModel
// membership = MembershipModel
// agrego income, no es un model, pero lo sumo asi
// devuelve:
// _id --> es el mes
// total --> cantidad de users por ejemplo
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { model } = req.query;
    let data = [];
    try {
        if (model === "user") {
            data = yield (0, StatsPerMonthController_1.usersPerMonth)();
        }
        ;
        if (model === "order") {
            data = yield (0, StatsPerMonthController_1.ordersPerMonth)();
        }
        ;
        if (model === "review") {
            data = yield (0, StatsPerMonthController_1.reviewsPerMonth)();
        }
        ;
        if (model === "wine") {
            data = yield (0, StatsPerMonthController_1.winesPerMonth)();
        }
        ; // este esta vacio por ahora
        if (model === "income") {
            data = yield (0, StatsPerMonthController_1.incomePerMonth)();
        }
        ;
        if (model === "items") {
            data = yield (0, StatsPerMonthController_1.itemsIncome)();
        }
        ;
        if (data.length === 0) {
            return res.status(404).send("no data matched");
        }
        res.status(200).send(data);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.default = router;
