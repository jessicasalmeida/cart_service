import { ProductEntity } from '../../core/entities/product';

export default interface ProductDataSource {
    getOne(id: number): Promise<ProductEntity>;
    create(product: ProductEntity) : Promise<ProductEntity>;
    delete(id: number): Promise<boolean>;
    update(id:number, product: ProductEntity): Promise<ProductEntity>;
    getAll(): Promise<ProductEntity[]>;
}