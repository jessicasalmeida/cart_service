"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemPresenter = void 0;
class CartItemPresenter {
    static toDTO(cart) {
        let dto = {
            id: cart.id,
            options: cart.options,
            price: cart.price,
            product: cart.product,
            cart: cart.cart
        };
        return dto;
    }
}
exports.CartItemPresenter = CartItemPresenter;
