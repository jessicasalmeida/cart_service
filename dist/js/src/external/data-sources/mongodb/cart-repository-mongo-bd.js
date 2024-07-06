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
exports.CartRepositoryMongoBd = void 0;
const db_connect_1 = require("./db-connect");
class CartRepositoryMongoBd {
    create(newCart) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield ((_a = db_connect_1.collections.carts) === null || _a === void 0 ? void 0 : _a.insertOne(newCart));
            return newCart;
        });
    }
    update(id, newCart) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = { id: (id) };
            yield ((_a = db_connect_1.collections.carts) === null || _a === void 0 ? void 0 : _a.updateOne(query, { $set: newCart }));
            return newCart;
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = { id: (id) };
            const cart = yield ((_a = db_connect_1.collections.carts) === null || _a === void 0 ? void 0 : _a.findOne(query));
            if (!cart) {
                throw new Error(`Cart with id ${id} not found`);
            }
            return cart;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = { id: (id) };
            yield ((_a = db_connect_1.collections.carts) === null || _a === void 0 ? void 0 : _a.deleteOne(query));
        });
    }
}
exports.CartRepositoryMongoBd = CartRepositoryMongoBd;
