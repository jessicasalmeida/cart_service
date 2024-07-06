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
exports.ProductController = void 0;
const product_use_case_1 = require("../../core/usercases/product-use-case");
const product_1 = require("../gateways/product");
const product_2 = require("../presenters/product");
const cart_1 = require("../gateways/cart");
const cartitem_1 = require("../gateways/cartitem");
class ProductController {
    constructor(productUseCase) {
        this.productUseCase = productUseCase;
    }
    static getProductById(id, productDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const productGateway = new product_1.ProductGateway(productDataSource);
            if (!productGateway) {
                throw new Error("Gateway Inválido");
            }
            const product = yield product_use_case_1.ProductUseCase.findProductById(Number(id), productGateway);
            if (!product) {
                return null;
            }
            return product;
        });
    }
    static getProductByCategory(category, productDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const productGateway = new product_1.ProductGateway(productDataSource);
            if (!productGateway) {
                throw new Error("Gateway Inválido");
            }
            const product = yield product_use_case_1.ProductUseCase.findProductByCategory(category, productGateway);
            if (!product) {
                return null;
            }
            return product;
        });
    }
    static createProduct(newProductDTO, productDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const productGateway = new product_1.ProductGateway(productDataSource);
            if (!productGateway) {
                throw new Error("Gateway Inválido");
            }
            const product = yield product_use_case_1.ProductUseCase.createProduct(newProductDTO, productGateway);
            if (product) {
                return product_2.ProductPresenter.toDTO(product);
            }
            return null;
        });
    }
    static deleteProductById(id, productDataSource, cartDataSource, cartItemDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const productGateway = new product_1.ProductGateway(productDataSource);
            const cartGateway = new cart_1.CartGateway(cartDataSource);
            const cartItemGateway = new cartitem_1.CartItemGateway(cartItemDataSource, cartDataSource, productDataSource);
            if (!productGateway) {
                throw new Error("Gateway Inválido");
            }
            return product_use_case_1.ProductUseCase.deleteProduct(Number(id), productGateway, cartGateway, cartItemGateway);
        });
    }
    static updateProductById(id, newProductDTO, productDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const productGateway = new product_1.ProductGateway(productDataSource);
            if (!productGateway) {
                throw new Error("Gateway Inválido");
            }
            const product = yield product_use_case_1.ProductUseCase.updateProduct(Number(id), newProductDTO, productGateway);
            if (!product) {
                return null;
            }
            return product;
        });
    }
    static deactivateProductById(id, productDataSource, cartDataSource, cartItemDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const productGateway = new product_1.ProductGateway(productDataSource);
            const cartGateway = new cart_1.CartGateway(cartDataSource);
            const cartItemGateway = new cartitem_1.CartItemGateway(cartItemDataSource, cartDataSource, productDataSource);
            if (!productGateway) {
                throw new Error("Gateway Inválido");
            }
            return product_use_case_1.ProductUseCase.deactivateProduct(Number(id), productGateway, cartGateway, cartItemGateway);
        });
    }
    static getActiveProducts(productDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const productGateway = new product_1.ProductGateway(productDataSource);
            if (!productGateway) {
                throw new Error("Gateway Inválido");
            }
            const product = product_use_case_1.ProductUseCase.getActiveProducts(productGateway);
            if (!product) {
                return null;
            }
            const productDTO = new Array();
            product.forEach(element => {
                productDTO.push(product_2.ProductPresenter.toDTO(element));
            });
            return productDTO;
        });
    }
    static getAllProducts(productDataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const productGateway = new product_1.ProductGateway(productDataSource);
            if (!productGateway) {
                throw new Error("Gateway Inválido");
            }
            const product = yield product_use_case_1.ProductUseCase.getAllProducts(productGateway);
            if (!product) {
                return null;
            }
            const productDTO = new Array();
            product.forEach(element => {
                productDTO.push(product_2.ProductPresenter.toDTO(element));
            });
            return productDTO;
        });
    }
}
exports.ProductController = ProductController;
