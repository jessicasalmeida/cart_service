"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartPresenter = void 0;
const user_1 = require("./user");
class CartPresenter {
    static toDTO(cart) {
        let dto = {
            id: String(cart.id),
            user: user_1.UserPresenter.toDTO(cart.user),
            totalValue: cart.totalValue,
            status: cart.status,
            payment: cart.payment,
            estimatedTime: cart.estimatedTime
        };
        return dto;
    }
}
exports.CartPresenter = CartPresenter;
