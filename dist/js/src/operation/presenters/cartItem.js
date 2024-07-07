"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemPresenter = void 0;
const product_1 = require("./product");
const cart_1 = require("./cart");
class CartItemPresenter {
    static toDTO(cart) {
        let dto = {
            id: cart.id,
            options: cart.options,
            price: cart.price,
            product: product_1.ProductPresenter.toDTO(cart.product),
            cart: cart_1.CartPresenter.toDTO(cart.cart)
        };
        return dto;
    }
}
exports.CartItemPresenter = CartItemPresenter;
