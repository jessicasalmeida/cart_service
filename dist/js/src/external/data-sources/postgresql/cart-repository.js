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
exports.CartRepository = void 0;
const cart_1 = require("../../../core/entities/cart");
const db_connect_1 = require("./db-connect");
class CartRepository {
    constructor(manager) {
        this.repository = db_connect_1.AppDataSource.getRepository(cart_1.CartEntity);
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find();
        });
    }
    create(newCart) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.save(newCart);
            return newCart;
        });
    }
    update(idCart, newCart) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartBd = yield this.repository.findOneBy({ id: idCart });
            cartBd.user = newCart.user;
            cartBd.payment = newCart.payment;
            cartBd.status = newCart.status;
            cartBd.totalValue = newCart.totalValue;
            yield this.repository.save(cartBd);
            return newCart;
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.repository.findOneBy({ id });
            if (!cart) {
                throw new Error(`Cart with id ${id} not found`);
            }
            return cart;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { id: (id) };
            yield this.repository.delete(id);
        });
    }
}
exports.CartRepository = CartRepository;
