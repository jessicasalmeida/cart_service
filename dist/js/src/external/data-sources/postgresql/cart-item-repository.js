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
exports.CartItemRepository = void 0;
const db_connect_1 = require("./db-connect");
const cart_item_1 = require("../../../core/entities/cart-item");
class CartItemRepository {
    constructor(manager) {
        this.repository = db_connect_1.AppDataSource.getRepository(cart_item_1.CartItemEntity);
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find({ relations: ["product", "cart", "cart.user"] });
        });
    }
    create(cartItem) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.save(cartItem);
            return cartItem;
        });
    }
    update(newCart) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartBd = yield this.repository.findOneBy({ id: newCart.id });
            cartBd.cart = newCart.cart;
            cartBd.options = newCart.options;
            cartBd.product = newCart.product;
            yield this.repository.save(cartBd);
            return cartBd;
        });
    }
    getOne(cart, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartItem = yield this.repository.findOne({
                where: {
                    product: product,
                    cart: cart
                },
                relations: ["product", "cart", "cart.user"]
            });
            if (!cartItem) {
                throw new Error(`Cart with id ${cart} not found`);
            }
            return cartItem;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { id: (id) };
            yield this.repository.delete(id);
        });
    }
}
exports.CartItemRepository = CartItemRepository;
