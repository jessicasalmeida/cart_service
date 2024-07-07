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
exports.CartGateway = void 0;
const cart_1 = require("../../core/entities/cart");
const user_1 = require("../../core/entities/user");
const cart_2 = require("../presenters/cart");
class CartGateway {
    constructor(cartDataSource) {
        this.cartDataSource = cartDataSource;
    }
    createcart(cart, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartEntity = new cart_1.CartEntity(Number(cart.id), new user_1.UserEntity(Number(user.id), user.cpf, user.name, user.email), cart.totalValue, cart.status, cart.payment);
            const sucesso = yield this.cartDataSource.create(cartEntity);
            return cart_2.CartPresenter.toDTO(sucesso);
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.cartDataSource.getOne(id);
            if (data) {
                const dataEntity = cart_2.CartPresenter.toDTO(data);
                return dataEntity;
            }
            return null;
        });
    }
    update(id, cart) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartEntity = new cart_1.CartEntity(Number(cart.id), new user_1.UserEntity(Number(cart.user.id), cart.user.cpf, cart.user.name, cart.user.email), cart.totalValue, cart.status, cart.payment);
            const data = yield this.cartDataSource.update(id, cartEntity);
            if (data) {
                const dataEntity = cart_2.CartPresenter.toDTO(data);
                return dataEntity;
            }
            return null;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.cartDataSource.getAll();
            if (data) {
                var dataDTO = new Array();
                data.forEach(data => {
                    dataDTO.push(cart_2.CartPresenter.toDTO(data));
                });
                return dataDTO;
            }
            return null;
        });
    }
}
exports.CartGateway = CartGateway;
