"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartPresenter = void 0;
const cartItem_1 = require("./cartItem");
class CartPresenter {
    static toDTO(cart) {
        let cartItemList = {};
        cart.itensCart.forEach(c => cartItemList.push(cartItem_1.CartItemPresenter.toDTO(c)));
        let dto = {
            id: cart.id.toString(),
            user: cart.user.toString(),
            itensCart: cartItemList,
            totalValue: cart.totalValue,
            status: cart.status,
            payment: cart.payment
        };
        return dto;
    }
}
exports.CartPresenter = CartPresenter;
