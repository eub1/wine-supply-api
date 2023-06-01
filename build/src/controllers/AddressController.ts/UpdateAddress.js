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
// -------------------UPDATE & POST ADDRESS
// address = req.body
//const { country, stateName, cityName, postalcode, streetName, streetNumber, floor, Apartment, isDefault} = address
// mandan por query la posicion del address a cambiar
// ejemplo: /address/update?index=0   --> voy a modificar el que este en el indice 0
const updateAddress = (user, address, query) => __awaiter(void 0, void 0, void 0, function* () {
    // si la propiedad isDefault viene como true, entonces todas las anteriores se cambian a false, en el proximo paso, queda registrado el true
    if (address.isDefault) {
        user.address.forEach((el) => el.isDefault = false);
    }
    // por query me indican en que posicion esta el address que se va a actualizar
    let i = parseInt(query.index);
    user.address[i] = address;
    yield user.save();
    return user.address;
});
exports.default = updateAddress;
