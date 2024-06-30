import ProductDataSource from '../../common/interfaces/product-data-source';
import { ProductEntity } from '../../core/entities/product';
import { NewProductDTO, ProductDTO } from '../../common/dtos/product.dto';
import { ProductPresenter } from '../presenters/product';

export class ProductGateway {
    productDataSource: ProductDataSource;
    constructor(productDataSource: ProductDataSource) {
        this.productDataSource = productDataSource;
    }

    async createProduct(product: NewProductDTO): Promise<ProductDTO | null> {
        const productEntity = new ProductEntity(0, product.name, product.options, product.price, product.timeToPrepare, product.category, product.status);
        const sucesso = await this.productDataSource.create(productEntity);
        return ProductPresenter.toDTO(sucesso);
    }

    async getOne(id: number): Promise<ProductDTO | null> {
        const data = await this.productDataSource.getOne(id);
        if (data) {
            const dataEntity = new ProductEntity(
                (id = data.id), data.name, data.options, data.price, data.timeToPrepare, data.category, data.status);
            return ProductPresenter.toDTO(dataEntity);
        }
        return null;
    }

    async update(id: number, product: NewProductDTO): Promise<ProductDTO | null> {
        const productEntity: ProductEntity =
        {
            id: 0,
            name: product.name,
            category: product.category,
            options: product.options,
            price: product.price,
            timeToPrepare: product.timeToPrepare,
            status: product.status
        };

        const data = await this.productDataSource.update(id, productEntity);
        if (data) {
            const dataEntity = ProductPresenter.toDTO(data);
            return dataEntity;
        }
        return null;
    }

    async getAll(): Promise<ProductDTO[] | null> {

        const data = await this.productDataSource.getAll();
        if (data) {
            var dataDTO: Array<ProductDTO> = new Array();
            data.forEach(d => {
                dataDTO.push(ProductPresenter.toDTO(d));
            });
            return dataDTO;
        }
        return null;
    }

    async delete(id: number): Promise<boolean> {
        const data = await this.productDataSource.delete(id);
        return data;
    }
}