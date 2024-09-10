import { ProductDTO } from "../../common/dtos/product.dto";
import { ProductEntity } from "../../core/entities/product";

export class ProductPresenter {
    static toDTO(
        product: ProductEntity
    ): ProductDTO {
        let dto: ProductDTO = {
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
