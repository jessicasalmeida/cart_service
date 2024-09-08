"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.CartController = void 0;
const cart_use_case_1 = require("../../core/usercases/cart-use-case");
const cart_1 = require("../gateways/cart");
const user_1 = require("../gateways/user");
const product_1 = require("../gateways/product");
const cartitem_1 = require("../gateways/cartitem");
const dotenv = __importStar(require("dotenv"));
class CartController {
    constructor(cartDataSource) {
        const cartGateway = new cart_1.CartGateway(cartDataSource);
        cart_use_case_1.CartUseCase.listenForCartPaid(cartGateway);
    }
    static createCart(cartDataSource, userDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartGateway = new cart_1.CartGateway(cartDataSource);
            const userGateway = new user_1.UserGateway(userDataSource);
            if (!cartGateway) {
                throw new Error("Gateway Inválido");
            }
            const cart = yield cart_use_case_1.CartUseCase.createCart(cartGateway, userGateway);
            if (!cart) {
                return null;
            }
            return cart;
        });
    }
    static addUser(idCart, idUser, cartDataSource, userDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartGateway = new cart_1.CartGateway(cartDataSource);
            const userGateway = new user_1.UserGateway(userDataSource);
            if (!cartGateway) {
                throw new Error("Gateway Inválido");
            }
            const cart = yield cart_use_case_1.CartUseCase.addUser(idCart, idUser, cartGateway, userGateway);
            if (!cart) {
                return null;
            }
            return cart;
        });
    }
    static addProduct(idCart, idProduct, cartDataSource, productDataSource, cartItemDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartGateway = new cart_1.CartGateway(cartDataSource);
            const productGateway = new product_1.ProductGateway(productDataSource);
            const cartItemGateway = new cartitem_1.CartItemGateway(cartItemDataSource, cartDataSource, productDataSource);
            if (!cartGateway) {
                throw new Error("Gateway Inválido");
            }
            const cart = yield cart_use_case_1.CartUseCase.addProduct(idCart, idProduct, cartGateway, productGateway, cartItemGateway);
            if (!cart) {
                return null;
            }
            return cart;
        });
    }
    static personalizeItens(idCart, idProduct, options, cartDataSource, productDataSource, cartItemDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartItemGateway = new cartitem_1.CartItemGateway(cartItemDataSource, cartDataSource, productDataSource);
            if (!cartItemGateway) {
                throw new Error("Gateway Inválido");
            }
            const cart = yield cart_use_case_1.CartUseCase.personalizeItem(idCart, idProduct, options, cartItemGateway);
            if (!cart) {
                return null;
            }
            return cart;
        });
    }
    static resumeCart(id, cartDataSource, cartItemDataSource, productDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartGateway = new cart_1.CartGateway(cartDataSource);
            const cartItemGateway = new cartitem_1.CartItemGateway(cartItemDataSource, cartDataSource, productDataSource);
            if (!cartGateway) {
                throw new Error("Gateway Inválido");
            }
            const cart = yield cart_use_case_1.CartUseCase.resumeCart(id, cartGateway, cartItemGateway);
            if (!cart) {
                return null;
            }
            return cart;
        });
    }
    static closeCart(id, cartDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartGateway = new cart_1.CartGateway(cartDataSource);
            if (!cartGateway) {
                throw new Error("Gateway Inválido");
            }
            const cart = yield cart_use_case_1.CartUseCase.closeCart(id, cartGateway);
            if (!cart) {
                return null;
            }
            return cart;
        });
    }
    static payCart(id, cartDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartGateway = new cart_1.CartGateway(cartDataSource);
            if (!cartGateway) {
                throw new Error("Gateway Inválido");
            }
            const payment = yield cart_use_case_1.CartUseCase.payCart(id, cartGateway);
            if (payment) {
                //  return await payCart(payment);
                return payment;
            }
            return null;
        });
    }
    static payedCart(id, cartDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartGateway = new cart_1.CartGateway(cartDataSource);
            if (!cartGateway) {
                throw new Error("Gateway Inválido");
            }
            const cart = yield cart_use_case_1.CartUseCase.payedCart(id, cartGateway);
            if (cart) {
                return cart;
            }
            return null;
        });
    }
    static sendToKitchen(id, cartDataSource, cartItemDataSource, productDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartGateway = new cart_1.CartGateway(cartDataSource);
            const cartItemGateway = new cartitem_1.CartItemGateway(cartItemDataSource, cartDataSource, productDataSource);
            if (!cartGateway) {
                throw new Error("Gateway Inválido");
            }
            const orderSended = yield cart_use_case_1.CartUseCase.sendToKitchen(id, cartGateway, cartItemGateway);
            if (orderSended) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    static cancelCart(id, cartDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartGateway = new cart_1.CartGateway(cartDataSource);
            if (!cartGateway) {
                throw new Error("Gateway Inválido");
            }
            const cart = yield cart_use_case_1.CartUseCase.cancelCart(id, cartGateway);
            if (!cart) {
                return null;
            }
            return cart;
        });
    }
}
exports.CartController = CartController;
function createOrder(cartItens) {
    dotenv.config();
    return fetch(String(process.env.ORDER_SERVER + "/order/receive/"), {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({ cart: cartItens }),
    })
        .then((response) => {
        console.log(response);
        return response.body;
    })
        .catch((erro) => {
        console.log(erro);
        throw new Error("Erro ao enviar o pedido para cozinha: " + cartItens.cartItens + "Erro: " + erro);
    });
}
function payCart(payment) {
    dotenv.config();
    return fetch(String(process.env.ORDER_SERVER + "/payment/"), {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({ payment: payment }),
    })
        .then((response) => {
        console.log(response);
        return response.body;
    })
        .catch((erro) => {
        console.log(erro);
        throw new Error("Erro ao enviar o pedido para cozinha: " + payment.cart.id + "Erro: " + erro);
    });
}
