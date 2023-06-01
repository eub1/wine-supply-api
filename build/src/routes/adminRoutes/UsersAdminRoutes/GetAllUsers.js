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
const User_1 = __importDefault(require("../../../models/User"));
const router = (0, express_1.Router)();
//*  SIN USO DE MOMENTO 9/12/22
// verify Token AdminStatus
// /admin/newusers/
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // si llega por query newUser=true, devuelve los ultimos 5 usuarios creados activos, ordenados por id
    // si llega por query isActive=yes, devuelve solo los usuarios activos, ordenados por _id
    // si llega por query isActive=no, devuelve solo los usuarios inactivos, ordenados por _id
    // si llega por query isAdmin=true, devuelve solo los usuarios con rol de admin, ordenados por _id
    // si llega por query all=true, devuelve todos los usuarios (no trae a los usuarios admin)
    const { newUser, isActive, isAdmin, all } = req.query;
    let users = [];
    let result;
    try {
        if (newUser) {
            users = yield User_1.default.find({ isAdmin: "no", isActive: true }).sort({ _id: -1 }).limit(5);
            result = users.map((e) => {
                return {
                    id: e._id,
                    email: e.email,
                    name: e.name,
                    lastName: e.lastName,
                    userName: e.userName
                };
            });
        }
        else if (isAdmin) {
            users = yield User_1.default.find({ isAdmin: "yes" }).sort({ _id: -1 });
        }
        else if (isActive === "yes") {
            users = yield User_1.default.find({ isAdmin: "no", isActive: true }).sort({ _id: -1 });
        }
        else if (isActive === "no") {
            users = yield User_1.default.find({ isAdmin: "no", isActive: false });
        }
        else if (all) {
            users = yield User_1.default.find();
        }
        if (users.length === 0) {
            return res.status(200).send("No matches found");
        }
        res.header({ 'content-Range': `wines 0-5/5`, 'Access-Control-Expose-Headers': 'Content-Range' });
        return res.status(200).send(result);
    }
    catch (error) {
        return res.status(500).send("Somethin bad happed retrieving the users");
    }
}));
exports.default = router;
