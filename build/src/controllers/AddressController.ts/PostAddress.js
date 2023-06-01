"use strict";
// address = req.body
// {country, stateName, cityName, postalcode, streetName, streetNumber, floor, Apartment, isDefault}
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
const postAddress = (user, address, query) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.address.length >= 3)
        throw new Error("can't keep more than 3 addresses, please remove one");
    // ejemplo: /address/update?index=0
    // si la propiedad isDefault viene como true, entonces todas las anteriores se cambian a false, en el proximo paso, queda registrado el true
    if (address.isDefault) {
        user.address.forEach((el) => el.isDefault = false);
    }
    user.address.push(address);
    const updatedUser = yield user.save();
    //  console.log("updatedUser", updatedUser);
    return updatedUser.address;
});
exports.default = postAddress;
