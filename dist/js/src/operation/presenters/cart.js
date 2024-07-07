"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartPresenter = void 0;
class CartPresenter {
    static toDTO(cart) {
        let dto = {
            id: String(cart.id),
            user: String(cart.user),
            totalValue: cart.totalValue,
            status: cart.status,
            payment: cart.payment
        };
        return dto;
    }
}
exports.CartPresenter = CartPresenter;
