"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPresenter = void 0;
class ProductPresenter {
    static toDTO(product) {
        let dto = {
            id: String(product.id),
            name: product.name,
            options: product.options,
            price: product.price,
            timeToPrepare: product.timeToPrepare,
            category: product.category,
            status: product.status
        };
        return dto;
    }
}
exports.ProductPresenter = ProductPresenter;
