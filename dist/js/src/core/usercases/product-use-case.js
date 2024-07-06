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
exports.ProductUseCase = void 0;
class ProductUseCase {
    static findProductByCategory(id, productGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield productGateway.getAll();
            if (products) {
                return products.filter((p) => p.category === id);
            }
            return null;
        });
    }
    static findProductById(id, productGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = productGateway.getOne(id);
            if (product) {
                return product;
            }
            return null;
        });
    }
    static createProduct(productDTO, productGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = productGateway.createProduct(productDTO);
            if (product) {
                return product;
            }
            return null;
        });
    }
    static deleteProduct(id, productGateway, cartGateway, cartItemGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield ProductUseCase.findProductById(id, productGateway);
            if (!(yield ProductUseCase.verifyActiveOrder(id, productGateway, cartGateway, cartItemGateway))) {
                yield productGateway.delete(id);
                return true;
            }
            else {
                return false;
            }
        });
    }
    static updateProduct(id, productDTO, productGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = productGateway.update(id, productDTO);
            if (product) {
                return product;
            }
            return null;
        });
    }
    static deactivateProduct(id, productGateway, cartGateway, cartItemGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield productGateway.getOne(id);
            if (product) {
                if (!(yield ProductUseCase.verifyActiveOrder(id, productGateway, cartGateway, cartItemGateway))) {
                    product.status = false;
                    yield productGateway.update(id, product);
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        });
    }
    static getActiveProducts(productGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield productGateway.getAll();
            if (products) {
                return products.filter((p) => p.status === true);
            }
            return null;
        });
    }
    static getAllProducts(productGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield productGateway.getAll();
            if (products) {
                return products;
            }
            return null;
        });
    }
    static verifyActiveOrder(idProduct, productGateway, cartGateway, cartItemGateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartItens = yield cartItemGateway.getAll();
            let cartItemActive = {};
            let cart = {};
            if (cartItens) {
                cartItens.forEach((p) => __awaiter(this, void 0, void 0, function* () {
                    if (Number(p.product) === idProduct) {
                        cart = (yield cartGateway.getOne(p.cart));
                        if (cart.status == "OPEN") {
                            cartItemActive.push(p);
                        }
                    }
                }));
            }
            if (cartItemActive.length > 0) {
                return true;
            }
            return false;
        });
    }
}
exports.ProductUseCase = ProductUseCase;
