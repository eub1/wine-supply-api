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
const Wine_1 = __importDefault(require("../../models/Wine"));
const router = (0, express_1.Router)();
//* /wines/categories
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carmenereFiltered = yield Wine_1.default.where({ strain: "CARMENERE" }).limit(4).select("_id name brand type description cropYear strain volume images rating");
        const cabernetFiltered = yield Wine_1.default.where({ strain: "CABERNET SAUVIGNON" }).limit(4).select("_id name brand type description cropYear strain volume images rating");
        const merlotFiltered = yield Wine_1.default.where({ strain: "MERLOT" }).limit(4).select("_id name brand type description cropYear strain volume images rating");
        const chardonnayFiltered = yield Wine_1.default.where({ strain: "CHARDONNAY" }).limit(4).select("_id name brand type description cropYear strain volume images rating");
        const syrahFiltered = yield Wine_1.default.where({ strain: "SYRAH" }).limit(4).select("_id name brand type description cropYear strain volume images rating");
        const pinotNoirFiltered = yield Wine_1.default.where({ strain: "PINOT NOIR" }).limit(4).select("_id name brand type description cropYear strain volume images rating");
        const nebbioloFiltered = yield Wine_1.default.where({ strain: "NEBBIOLO" }).limit(4).select("_id name brand type description cropYear strain volume images rating");
        const categoriesArray = [carmenereFiltered, cabernetFiltered, merlotFiltered, chardonnayFiltered, syrahFiltered, pinotNoirFiltered, nebbioloFiltered].flat();
        return res.send(categoriesArray);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
exports.default = router;
