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
exports.CartUseCase = void 0;
const cart_1 = require("../entities/cart");
const cart_2 = require("../../operation/presenters/cart");
class CartUseCase {
    static createCart(cartGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCart = new cart_1.CartEntity(0, 0, [], 0, "OPEN", false);
            const cart = yield cartGateway.createcart(cart_2.CartPresenter.toDTO(newCart));
            if (cart) {
                return cart;
            }
            else {
                return null;
            }
        });
    }
    static addUser(idCart, idUser, cartGateway, userGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cartGateway.getOne(Number(idCart));
            if (cart) {
                const user = yield userGateway.getUserById(Number(idUser));
                if (user) {
                    cart.user = user.id;
                }
                else {
                    throw new Error("Não foi possivel add o user no cart: Usuário: " + idUser);
                }
                return cartGateway.update(Number(idCart), cart);
            }
            else {
                return null;
            }
        });
    }
    static addProduct(idCart, idProduct, cartGateway, productGateway, cartItemGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cartGateway.getOne(Number(idCart));
            if (cart) {
                let product = yield productGateway.getOne(Number(idProduct));
                if (product) {
                    const productList = {};
                    cart.itensCart.forEach((c) => __awaiter(this, void 0, void 0, function* () { return productList.push((yield productGateway.getOne(c.product))); }));
                    product.price = CartUseCase.calculateProductPrice(productList, product, cartGateway);
                    productList.push(product);
                    let valorTotal = CartUseCase.calculateTotalValue(productList, cartGateway);
                    const newCartItemDTO = {
                        options: product.options,
                        price: product.price,
                        product: Number(product.id),
                        cart: Number(cart.id)
                    };
                    cartItemGateway.createcart(newCartItemDTO);
                    cart.totalValue = valorTotal;
                    return cartGateway.update(Number(cart.id), cart);
                }
            }
            return null;
        });
    }
    static personalizeItem(idCart, idProduct, options, cartItemGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartItem = yield cartItemGateway.getCartItem(Number(idCart), Number(idProduct));
            if (cartItem) {
                cartItem.options = options;
                cartItemGateway.update(cartItem.id, cartItem);
            }
            else {
                throw new Error("Product with id ${idProduct} not found in cart {idCart} ");
            }
            return null;
        });
    }
    static resumeCart(id, cartGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cartGateway.getOne(Number(id));
            if (cart) {
                return cart;
            }
            return null;
        });
    }
    static closeCart(id, cartGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cartGateway.getOne(Number(id));
            if (cart) {
                cart.status = "CLOSED";
                return cartGateway.update(Number(id), cart);
            }
            return null;
        });
    }
    static payCart(id, cartGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cartGateway.getOne(Number(id));
            if (cart) {
                cart.payment = true;
                return cartGateway.update(Number(id), cart);
            }
            return null;
        });
    }
    static sendToKitchen(id, cartGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cartGateway.getOne(Number(id));
            if (cart) {
                if (cart.payment) {
                    cart.status = "SENDED";
                    yield cartGateway.update(Number(id), cart);
                    return true;
                }
            }
            return false;
        });
    }
    static cancelCart(id, cartGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cartGateway.getOne(Number(id));
            if (cart) {
                cart.status = "CANCELLED";
                return cartGateway.update(Number(id), cart);
            }
            return null;
        });
    }
    static findOne(id, cartGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cartGateway.getOne(Number(id));
            if (cart) {
                return cart;
            }
            return null;
        });
    }
    static calculateTotalValue(productsList, cartGateway) {
        return productsList.reduce((sum, p) => sum + p.price, 0);
    }
    static calculateProductPrice(productsList, product, cartGateway) {
        let qtdCombos = productsList.filter(value => value.category == "combo").length;
        let qtdBebida = productsList.filter(value => value.category === "bebida").length;
        let qtdAcompanhamento = productsList.filter(value => value.category === "acompanhamento").length;
        if (product.category === "bebida" && qtdCombos > qtdBebida ||
            product.category === "acompanhamento" && qtdCombos > qtdAcompanhamento) {
            return 0;
        }
        return product.price;
    }
}
exports.CartUseCase = CartUseCase;
