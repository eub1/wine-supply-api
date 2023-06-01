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
//* /wines/filters
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const querys = req.query;
    querys.isActive = true;
    try {
        if (Object.keys(querys).length === 0) {
            return res.status(400).send("Please select a filter option");
        }
        const filteredWines = yield Wine_1.default.find(querys).select("_id name brand type description cropYear strain volume images rating price");
        // console.log("filteredWines:", filteredWines)
        if (filteredWines.length === 0) {
            return res.status(404).send(["No wines match the filter"]);
        }
        return res.status(200).send(filteredWines);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.default = router;
