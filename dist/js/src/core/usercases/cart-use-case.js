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
class CartUseCase {
    static createCart(cartGateway, userGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userGateway.getUserById(Number(1));
            const newCart = {
                id: "0",
                user: user,
                totalValue: 0,
                status: "OPEN",
                payment: false,
                estimatedTime: 0
            };
            const cart = yield cartGateway.createcart(newCart, user);
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
                    cart.user = user;
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
                const productCart = yield cartItemGateway.getProductsByCart(Number(cart.id));
                if (product) {
                    product.price = CartUseCase.calculateProductPrice(productCart, product);
                    productCart.push(product);
                    cart.estimatedTime = productCart != null ? CartUseCase.calculateEstimatedDelivery(productCart) : 0;
                    let valorTotal = CartUseCase.calculateTotalValue(productCart);
                    const newCartItemDTO = {
                        options: product.options,
                        price: product.price,
                        product: product,
                        cart: cart
                    };
                    cart.totalValue = valorTotal;
                    cartItemGateway.createcart(newCartItemDTO);
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
                return cartItemGateway.update(cartItem.id, cartItem);
            }
            else {
                throw new Error("Product with id ${idProduct} not found in cart {idCart} ");
            }
            return null;
        });
    }
    static resumeCart(id, cartGateway, cartItemGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cartGateway.getOne(Number(id));
            const cartItem = yield cartItemGateway.getAll();
            let cartItens = [];
            if (cartItem.length > 0) {
                cartItem.forEach(c => {
                    if (c.cart.id === (cart === null || cart === void 0 ? void 0 : cart.id)) {
                        cartItens.push({
                            id: Number(c.id),
                            options: c.options,
                            price: c.price,
                            product: c.product
                        });
                    }
                });
            }
            const retorno = {
                id: String(cart.id),
                user: cart.user,
                totalValue: cart.totalValue,
                status: cart.status,
                payment: cart.payment,
                estimatedTime: cart.estimatedTime,
                cartItens: cartItens
            };
            return retorno;
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
    static calculateTotalValue(productsList) {
        return productsList.reduce((sum, p) => sum + p.price, 0);
    }
    static calculateProductPrice(productsList, product) {
        let qtdCombos = productsList.filter(value => value.category === "combo").length;
        let qtdBebida = productsList.filter(value => value.category === "bebida").length;
        let qtdAcompanhamento = productsList.filter(value => value.category === "acompanhamento").length;
        if (product.category === "bebida" && qtdCombos > qtdBebida ||
            product.category === "acompanhamento" && qtdCombos > qtdAcompanhamento) {
            return 0;
        }
        return product.price;
    }
    static calculateEstimatedDelivery(productsList) {
        return productsList.reduce((sum, p) => sum + p.timeToPrepare, 0);
    }
}
exports.CartUseCase = CartUseCase;
