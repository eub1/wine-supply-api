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
//* /admin/users/isAdmin
// verify Token AdminStatus
// se envia id por params.
// devuelve usuario actualizado
// actualiza propiedad isAdmin de un usuario. 
// (Ejemplo: si antes era "no", lo cambia a "yes"; por el contrario, si isAdmin era "yes", lo deja en "no")
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // no me funcionaba el .save() con un ternario:
    const checkValue = function (isAdmin) {
        if (isAdmin === "yes") {
            return "no";
        }
        else {
            return "yes";
        }
    };
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).send("Missing id");
        }
        let user = yield User_1.default.findById(id).select("-hashedPass");
        // console.log("user", user);
        if (user.length === 0) {
            return res.status(200).send("No matches found for this id");
        }
        ;
        const adminStatus = checkValue(user.isAdmin);
        // console.log("adminStatus", adminStatus);
        user.isAdmin = adminStatus;
        const updatedUser = yield user.save();
        const newUser = Object.assign(Object.assign({}, user._doc), { id: user._id });
        let total = newUser.length;
        res.header({ 'content-Range': `newUser 0-20/${total}`, 'Access-Control-Expose-Headers': 'Content-Range' });
        return res.status(200).send(newUser);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}));
exports.default = router;
