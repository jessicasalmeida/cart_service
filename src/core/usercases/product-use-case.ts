import { ProductGateway } from '../../operation/gateways/product';
import { CartGateway } from '../../operation/gateways/cart';
import { NewProductDTO, ProductDTO } from '../../common/dtos/product.dto';
import { CartItemGateway } from '../../operation/gateways/cartitem';
import { CartItemDTO } from '../../common/dtos/cart-item.dto';
import { CartDTO } from '../../common/dtos/cart.dto';

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
    static async deleteProduct(id: number, productGateway: ProductGateway, cartGateway: CartGateway, cartItemGateway: CartItemGateway): Promise<boolean> {
        const product = await ProductUseCase.findProductById(id, productGateway);
        if (!(await ProductUseCase.verifyActiveOrder(id, productGateway, cartGateway, cartItemGateway))) {
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
    static async deactivateProduct(id: number, productGateway: ProductGateway, cartGateway: CartGateway, cartItemGateway: CartItemGateway): Promise<boolean> {
        const product = await productGateway.getOne(id);
        if (product) {
            if (!(await ProductUseCase.verifyActiveOrder(id, productGateway, cartGateway, cartItemGateway))) {
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

    static async verifyActiveOrder(idProduct: number, productGateway: ProductGateway, cartGateway: CartGateway, cartItemGateway: CartItemGateway): Promise<boolean> {
        const cartItens = await cartItemGateway.getAll();
        let cartItemActive = {} as CartItemDTO[];
        let cart = {} as CartDTO;
        if (cartItens) {
            cartItens.forEach(async (p) => {
                if (Number(p.product) === idProduct) {
                    cart = await cartGateway.getOne(p.cart) as CartDTO;
                    if (cart.status == "OPEN") {
                        cartItemActive.push(p);
                    }
                }
            });
        }
        if (cartItemActive.length > 0) {
            return true;
        }
        return false;
    }
}