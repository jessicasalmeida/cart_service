import { ProductGateway } from '../../operation/gateways/product';
import { CartGateway } from '../../operation/gateways/cart';
import { NewProductDTO, ProductDTO } from '../../common/dtos/product.dto';

export class ProductUseCase {

    static async findProductByCategory(id: string, productGateway: ProductGateway): Promise<ProductDTO[] | null> {
        const products = await productGateway.getAll();
        if (products) {
            return products.filter((p) => p.category === id);
        }
        return null;
    }
    static async findProductById(id: number, productGateway: ProductGateway): Promise<ProductDTO | null> {
        const product = productGateway.getOne(id);
        if (product) {
            return product;
        }
        return null;
    }
    static async createProduct(productDTO: NewProductDTO, productGateway: ProductGateway): Promise<ProductDTO | null> {
        
        const product = productGateway.createProduct(productDTO);
        if (product) {
            return product;
        }
        return null;

    }
    static async deleteProduct(id: number, productGateway: ProductGateway, cartGateway: CartGateway): Promise<boolean> {
        const product = await ProductUseCase.findProductById(id, productGateway);
        if (!(await ProductUseCase.verifyActiveOrder(id, productGateway, cartGateway))) {
            await productGateway.delete(id);
            return true;
        }
        else {
            return false
        }
    }
    static async updateProduct(id: number, productDTO: NewProductDTO, productGateway: ProductGateway): Promise<ProductDTO | null> {
        const product = productGateway.update(id, productDTO);
        if (product) {
            return product;
        }
        return null;

    }
    static async deactivateProduct(id: number, productGateway: ProductGateway, cartGateway: CartGateway): Promise<boolean> {
        const product = await productGateway.getOne(id);
        if (product) {
            if (!(await ProductUseCase.verifyActiveOrder(id, productGateway, cartGateway))) {
                product.status = false;
                await productGateway.update(id, product)
                return true;
            }
            else {
                return false
            }
        }
        else {
            return false;
        }
    }
    static async getActiveProducts(productGateway: ProductGateway): Promise<ProductDTO[] | null> {
        const products = await productGateway.getAll();
        if (products) {
            return products.filter((p) => p.status === true);
        }
        return null;
    }

    static async getAllProducts(productGateway: ProductGateway): Promise<ProductDTO[] | null> {
        const products = await productGateway.getAll();
        if (products) {
            return products;
        }
        return null;
    }

    static async verifyActiveOrder(id: number, productGateway: ProductGateway, cartGateway: CartGateway): Promise<boolean> {
        const carts = await cartGateway.getAll();
        if (carts) {
            let products = {} as ProductDTO[];
            for (const cart of carts) {
                    products = cart.cartItens as ProductDTO[];
                    products = products.filter((p) => p.id === id);
                    if (products.length > 0) {
                        return true;
                    }
                }
            }        
        return false;
    }
}