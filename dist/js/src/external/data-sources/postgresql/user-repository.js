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
exports.UserRepository = void 0;
const user_1 = require("../../../core/entities/user");
const db_connect_1 = require("./db-connect");
class UserRepository {
    constructor(manager) {
        this.repository = db_connect_1.AppDataSource.getRepository(user_1.UserEntity);
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.save(user);
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.findOneBy({ id });
            if (!user) {
                throw new Error(`User with id ${id} not found`);
            }
            return user;
        });
    }
}
exports.UserRepository = UserRepository;
