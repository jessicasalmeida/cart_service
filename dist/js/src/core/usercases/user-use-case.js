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
const mq_1 = require("../../external/mq/mq");
class UserUseCase {
    constructor(mq) {
        UserUseCase.mq = mq;
    }
    static executeCreate(name, cpf, email, cep, telefone, userGateway) {
        const novoId = 0;
        const newUser = new user_1.UserEntity(Number(novoId), cpf, name, email, cep, telefone);
        return userGateway.createUser(newUser);
    }
    static executeGetOne(id, userGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userGateway.getUserById(Number(id));
        });
    }
    static deleteUser(id, userGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userGateway.getUserById(Number(id));
            if (user) {
                UserUseCase.mq = new mq_1.RabbitMQ();
                yield UserUseCase.mq.connect();
                yield UserUseCase.mq.publish('delete_user', { user: user });
                yield UserUseCase.mq.close();
            }
            return user;
        });
    }
}
exports.UserUseCase = UserUseCase;
