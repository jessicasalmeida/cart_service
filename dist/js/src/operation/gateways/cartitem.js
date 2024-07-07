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
exports.CartItemGateway = void 0;
const cart_item_1 = require("../../core/entities/cart-item");
const cartItem_1 = require("../presenters/cartItem");
const product_1 = require("../presenters/product");
const product_2 = require("../../core/entities/product");
const cart_1 = require("../../core/entities/cart");
const user_1 = require("../../core/entities/user");
class CartItemGateway {
    constructor(cartItemDataSource, cartDataSource, productDataSource) {
        this.cartItemDataSource = cartItemDataSource;
        this.cartDataSource = cartDataSource;
        this.productDataSource = productDataSource;
    }
    createcart(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartEntity = new cart_item_1.CartItemEntity(0, cart.options, cart.price, new product_2.ProductEntity(Number(cart.product.id), cart.product.name, cart.product.options, cart.product.price, cart.product.timeToPrepare, cart.product.category, cart.product.status), new cart_1.CartEntity(Number(cart.cart.id), new user_1.UserEntity(Number(cart.cart.user.id), cart.cart.user.cpf, cart.cart.user.name, cart.cart.user.email), cart.cart.totalValue, cart.cart.status, cart.cart.payment));
            const sucesso = yield this.cartItemDataSource.create(cartEntity);
            return cartItem_1.CartItemPresenter.toDTO(sucesso);
        });
    }
    getProductsByCart(idCart) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartDataSource.getOne(idCart);
            const data = yield this.cartItemDataSource.getAll();
            const cartItens = data.filter(c => c.cart.id === cart.id);
            const productList = [];
            cartItens.forEach((c) => __awaiter(this, void 0, void 0, function* () { return productList.push(product_1.ProductPresenter.toDTO(yield this.productDataSource.getOne(c.product.id))); }));
            if (productList) {
                return productList;
            }
            return null;
        });
    }
    getCartItem(idCart, idProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartDataSource.getOne(idCart);
            const product = yield this.productDataSource.getOne(idProduct);
            const data = yield this.cartItemDataSource.getOne(cart, product);
            if (data) {
                return cartItem_1.CartItemPresenter.toDTO(data);
            }
            return null;
        });
    }
    update(id, cart) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartEntity = new cart_item_1.CartItemEntity(id, cart.options, cart.price, new product_2.ProductEntity(Number(cart.product.id), cart.product.name, cart.product.options, cart.product.price, cart.product.timeToPrepare, cart.product.category, cart.product.status), new cart_1.CartEntity(Number(cart.cart.id), new user_1.UserEntity(Number(cart.cart.user.id), cart.cart.user.cpf, cart.cart.user.name, cart.cart.user.email), cart.cart.totalValue, cart.cart.status, cart.cart.payment));
            const data = yield this.cartItemDataSource.update(cartEntity);
            if (data) {
                const dataEntity = cartItem_1.CartItemPresenter.toDTO(data);
                return dataEntity;
            }
            return null;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.cartItemDataSource.getAll();
            if (data) {
                let dataDTO = [];
                data.forEach(data => {
                    dataDTO.push(cartItem_1.CartItemPresenter.toDTO(data));
                });
                return dataDTO;
            }
            return null;
        });
    }
}
exports.CartItemGateway = CartItemGateway;
