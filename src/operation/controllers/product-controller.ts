import { ProductUseCase } from '../../core/usercases/product-use-case';
import ProductDataSource from '../../common/interfaces/product-data-source';
import { ProductGateway } from '../gateways/product';
import { ProductPresenter } from '../presenters/product';
import { ProductDTO, NewProductDTO } from '../../common/dtos/product.dto';
import { ProductEntity } from '../../core/entities/product';
import { CartDataSource } from '../../common/interfaces/cart-data-source';
import { CartGateway } from '../gateways/cart';
import { CartItemGateway } from '../gateways/cartitem';
import { CartItemDataSource } from '../../common/interfaces/cart-item-data-source';

export class ProductController {

    constructor(private readonly productUseCase: ProductUseCase) { }

    static async getProductById(id: string, productDataSource: ProductDataSource) {
        const productGateway = new ProductGateway(productDataSource);
        if (!productGateway) {
            throw new Error("Gateway Inválido");
        }
        const product = await ProductUseCase.findProductById(Number(id), productGateway);
        if (!product) {
            return null;
        }
        return product;
    }

    static async getProductByCategory(category: string, productDataSource: ProductDataSource) {
        const productGateway = new ProductGateway(productDataSource);
        if (!productGateway) {
            throw new Error("Gateway Inválido");
        }
        const product = await ProductUseCase.findProductByCategory(category, productGateway);
        if (!product) {
            return null;
        }
        return product;
    }

    static async createProduct(newProductDTO: NewProductDTO, productDataSource: ProductDataSource) {
        const productGateway = new ProductGateway(productDataSource);
        if (!productGateway) {
            throw new Error("Gateway Inválido")
        }
        const product = await ProductUseCase.createProduct(newProductDTO, productGateway) as unknown as ProductEntity;
        if (product) {
            return ProductPresenter.toDTO(product);
        }
        return null;
    }

    static async deleteProductById(id: string, productDataSource: ProductDataSource, cartDataSource: CartDataSource, cartItemDataSource:CartItemDataSource) {
        const productGateway = new ProductGateway(productDataSource);
        const cartGateway = new CartGateway(cartDataSource);
        const cartItemGateway = new CartItemGateway(cartItemDataSource, cartDataSource, productDataSource);
        if (!productGateway) {
            throw new Error("Gateway Inválido")
        }
        return ProductUseCase.deleteProduct(Number(id), productGateway, cartGateway, cartItemGateway);
    }

    static async updateProductById(id: string, newProductDTO: NewProductDTO, productDataSource: ProductDataSource) {
        const productGateway = new ProductGateway(productDataSource);
        if (!productGateway) {
            throw new Error("Gateway Inválido");
        }
        const product = await ProductUseCase.updateProduct(Number(id), newProductDTO, productGateway);
        if (!product) {
            return null;
        }
        return product;
    }

    static async deactivateProductById(id: string, productDataSource: ProductDataSource, cartDataSource: CartDataSource, cartItemDataSource: CartItemDataSource) {
        const productGateway = new ProductGateway(productDataSource);
        const cartGateway = new CartGateway(cartDataSource);
        const cartItemGateway = new CartItemGateway(cartItemDataSource, cartDataSource, productDataSource);
        if (!productGateway) {
            throw new Error("Gateway Inválido")
        }
        return ProductUseCase.deactivateProduct(Number(id), productGateway, cartGateway,cartItemGateway);

    }

    static async getActiveProducts(productDataSource: ProductDataSource) {
        const productGateway = new ProductGateway(productDataSource);
        if (!productGateway) {
            throw new Error("Gateway Inválido")
        }
        const product = ProductUseCase.getActiveProducts(productGateway) as unknown as ProductEntity[];
        if (product.length === 0) {
            return null;
        }
        const productDTO: ProductDTO[] = new Array();
        product.forEach(element => {
            productDTO.push(ProductPresenter.toDTO(element));
        });
        return productDTO;
    }

    static async getAllProducts(productDataSource: ProductDataSource) {
        const productGateway = new ProductGateway(productDataSource);
        if (!productGateway) {
            throw new Error("Gateway Inválido")
        }
        const product = await ProductUseCase.getAllProducts(productGateway) as unknown as ProductEntity[];
        if (!product) {
            return null;
        }
        const productDTO: ProductDTO[] = new Array();
        product.forEach(element => {
            productDTO.push(ProductPresenter.toDTO(element));
        });
        return productDTO;
    }
}
