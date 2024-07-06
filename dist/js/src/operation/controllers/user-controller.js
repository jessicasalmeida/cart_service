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
exports.userController = void 0;
const user_1 = require("../gateways/user");
const user_2 = require("../presenters/user");
const user_use_case_1 = require("../../core/usercases/user-use-case");
class userController {
    constructor(userUseCase) {
        this.userUseCase = userUseCase;
    }
    static getUserById(id, userDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const userGateway = new user_1.UserGateway(userDataSource);
            if (!userGateway) {
                throw new Error("Gateway inválido");
            }
            const user = yield user_use_case_1.UserUseCase.executeGetOne(id, userGateway);
            if (!user) {
                return null;
            }
            return user;
        });
    }
    static createUser(newUserDTO, userDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const userGateway = new user_1.UserGateway(userDataSource);
            if (!userGateway) {
                throw new Error("Gateway inválido");
            }
            const user = yield user_use_case_1.UserUseCase.executeCreate(newUserDTO.name, newUserDTO.cpf, newUserDTO.email, userGateway);
            if (!user) {
                return null;
            }
            return user_2.UserPresenter.toDTO(user);
        });
    }
}
exports.userController = userController;
