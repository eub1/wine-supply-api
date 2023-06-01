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
const User_1 = __importDefault(require("../../models/User"));
const router = (0, express_1.Router)();
//* /getmembership
//! verifica token del admin
//1.
// Viene por query, ?name="nombre del plan"
// si el usuario quiere cambiar de plan, actualiza el plan en su membership doc.
// los nombres del plan pueden ser: regular - premium - sommelier
//2.
// Viene por query, ?isActive=false
// si el usuario se quiere dar de baja del plan, actualiza el field isActive a false. Tambien se vacia el field membership_id en el User doc.
router.put("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        //console.log("user", user);
        if (!user.isActive)
            return res.status(303).send("Inactive user, do you want to recover it?");
        if (!user) {
            return res.status(404).send("User not found!");
        }
        //! VER QUE DEVUELVE TOKEN DE ADMIN 
        //! if(token de Admin) { entonces permitir cambiar isActive a true?, tendria sentido recuperar la suscripcion?}
        if (Object.keys(req.query).length === 0) {
            return "missing data from query";
        }
        if (req.query.name) {
            const updatedUserMembership = yield User_1.default.findByIdAndUpdate(user._id, { name: req.query.name }, { runValidators: true }).lean();
        }
        // const dbMembership:any = await MembershipModel.find(req.query).select("-user_id");
        // return res.status(200).send(dbMembership)
    }
    catch (error) {
        return res.status(400).send({ error: error.message });
    }
}));
exports.default = router;
