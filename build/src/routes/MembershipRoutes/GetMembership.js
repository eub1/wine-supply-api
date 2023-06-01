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
const Membeship_1 = __importDefault(require("../../models/Membeship"));
const router = (0, express_1.Router)();
//* /membership?name=
// Regular - Premium - Sommielere
//! verifica token del admin
// busca en el model de membership segun los fields que vengan por query
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //! VER QUE DEVUELVE TOKEN DE ADMIN
        if (Object.keys(req.query).length === 0) {
            return "missing data from query";
        }
        const dbMembership = yield Membeship_1.default.find(req.query).select("-user_id");
        return res.status(200).send(dbMembership);
    }
    catch (error) {
        return res.status(400).send({ error: error.message });
    }
}));
exports.default = router;
