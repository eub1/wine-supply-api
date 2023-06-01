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
const postMembership = (user, body) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = user;
    console.log(body);
    if (body.membership_id) {
        const { isMember } = body.membership_id[0];
        console.log(body.membership_id[0]);
        if (user.membership_id.length === 0) {
            user.membership_id.push({ isMember: true });
        }
        user.membership_id[0].isMember = isMember;
        yield user.save();
        return updatedUser;
    }
    for (const property in body) {
        user[property] = body[property];
    }
    yield updatedUser.save();
    return updatedUser;
});
