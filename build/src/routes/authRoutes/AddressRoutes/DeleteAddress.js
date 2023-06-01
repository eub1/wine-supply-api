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
const router = require("express").Router();
//* /address
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user.isActive) {
            return res.status(303).send("Inactive user, do you want to recover it?");
        }
        ;
        if (!user) {
            return res.status(404).send("User not found!");
        }
        ;
        //-   ?erase=true    ----para tener una opcion de borrado?
        if (req.query.erase) {
            user.address = [];
        }
        // mandan por query el index del address en el array, posicion en el array, del address a eliminar
        const start = parseInt(req.query.index);
        user.address.splice(start, 1);
        const updatedUser = yield user.save();
        return res.status(200).send(updatedUser.address);
    }
    catch (error) {
        return res.status(400).send({ error: error.message });
    }
}));
exports.default = router;
