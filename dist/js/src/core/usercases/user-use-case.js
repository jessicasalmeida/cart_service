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
exports.UserUseCase = void 0;
const user_1 = require("../entities/user");
class UserUseCase {
    static executeCreate(name, cpf, email, userGateway) {
        const novoId = 0;
        const newUser = new user_1.UserEntity(Number(novoId), cpf, name, email);
        return userGateway.createUser(newUser);
    }
    static executeGetOne(id, userGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userGateway.getUserById(Number(id));
        });
    }
}
exports.UserUseCase = UserUseCase;
