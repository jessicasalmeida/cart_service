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
exports.ProductGateway = void 0;
const product_1 = require("../../core/entities/product");
const product_2 = require("../presenters/product");
class ProductGateway {
    constructor(productDataSource) {
        this.productDataSource = productDataSource;
    }
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const productEntity = new product_1.ProductEntity(0, product.name, product.options, product.price, product.timeToPrepare, product.category, product.status);
            const sucesso = yield this.productDataSource.create(productEntity);
            return product_2.ProductPresenter.toDTO(sucesso);
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.productDataSource.getOne(id);
            if (data) {
                const dataEntity = new product_1.ProductEntity((id = data.id), data.name, data.options, data.price, data.timeToPrepare, data.category, data.status);
                return product_2.ProductPresenter.toDTO(dataEntity);
            }
            return null;
        });
    }
    update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const productEntity = {
                id: 0,
                name: product.name,
                category: product.category,
                options: product.options,
                price: product.price,
                timeToPrepare: product.timeToPrepare,
                status: product.status
            };
            const data = yield this.productDataSource.update(id, productEntity);
            if (data) {
                const dataEntity = product_2.ProductPresenter.toDTO(data);
                return dataEntity;
            }
            return null;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.productDataSource.getAll();
            if (data) {
                var dataDTO = new Array();
                data.forEach(d => {
                    dataDTO.push(product_2.ProductPresenter.toDTO(d));
                });
                return dataDTO;
            }
            return null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.productDataSource.delete(id);
            return data;
        });
    }
}
exports.ProductGateway = ProductGateway;
