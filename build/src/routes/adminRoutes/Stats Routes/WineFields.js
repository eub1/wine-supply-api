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
const WineFieldsController_1 = require("../../../controllers/Stats/WineFieldsController");
const router = require("express").Router();
// total number of registered Users Per Month
//* /admin/stats/wines/fields
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = [];
        if (req.query.name) {
            data = yield (0, WineFieldsController_1.getName)();
        }
        ;
        if (req.query.brand) {
            data = yield (0, WineFieldsController_1.getBrand)();
        }
        ;
        if (req.query.type) {
            data = yield (0, WineFieldsController_1.getType)();
        }
        ;
        if (req.query.strain) {
            data = yield (0, WineFieldsController_1.getStrains)();
        }
        ;
        if (req.query.origin) {
            data = yield (0, WineFieldsController_1.getOrigin)();
        }
        ;
        if (req.query.zone) {
            data = yield (0, WineFieldsController_1.getZones)();
        }
        ;
        if (req.query.year) {
            data = yield (0, WineFieldsController_1.getCropYear)();
        }
        ;
        if (req.query.count) {
            data = yield (0, WineFieldsController_1.countWines)();
        }
        ;
        if (data.length === 0) {
            return res.status(404).send("no data matched");
        }
        res.status(200).send(data);
    }
    catch (error) {
        res.send(error.message);
    }
}));
exports.default = router;
