import { CartItemDTO, NewCartItemDTO } from '../../common/dtos/cart-item.dto';
import { ProductDTO } from '../../common/dtos/product.dto';
import { CartDataSource } from '../../common/interfaces/cart-data-source';
import { CartItemDataSource } from '../../common/interfaces/cart-item-data-source';
import { CartItemEntity } from '../../core/entities/cart-item';
import { CartItemPresenter } from '../presenters/cartItem';
import { ProductPresenter } from '../presenters/product';
import ProductDataSource from '../../common/interfaces/product-data-source';
import { ProductEntity } from '../../core/entities/product';
import { CartEntity } from '../../core/entities/cart';
import { UserEntity } from '../../core/entities/user';

export class CartItemGateway {
    cartItemDataSource: CartItemDataSource;
    cartDataSource: CartDataSource;
    productDataSource: ProductDataSource;
    constructor(cartItemDataSource: CartItemDataSource, cartDataSource: CartDataSource, productDataSource: ProductDataSource) {
        this.cartItemDataSource = cartItemDataSource;
        this.cartDataSource = cartDataSource;
        this.productDataSource = productDataSource;
    }

    async createcart(cart: NewCartItemDTO): Promise<CartItemDTO | null> {
        const cartEntity: CartItemEntity = new CartItemEntity(
            0,
            cart.options,
            cart.price,
            new ProductEntity(Number(cart.product.id), cart.product.name, cart.product.options, cart.product.price, cart.product.timeToPrepare, cart.product.category, cart.product.status),
            new CartEntity(Number(cart.cart.id), new UserEntity(Number(cart.cart.user.id), cart.cart.user.cpf, cart.cart.user.name, cart.cart.user.email), cart.cart.totalValue, cart.cart.status, cart.cart.payment, cart.cart.estimatedTime));
        const sucesso = await this.cartItemDataSource.create(cartEntity);
        return CartItemPresenter.toDTO(sucesso);
    }

    async getProductsByCart(idCart: number): Promise<ProductDTO[] | null> {
        const cart = await this.cartDataSource.getOne(idCart);
        const data = await this.cartItemDataSource.getAll();
        const cartItens = data.filter(c=> c.cart.id === cart.id);
        const productList = [] as ProductDTO[];
        cartItens.forEach( c=> productList.push(ProductPresenter.toDTO(c.product)));
        if (productList) {
            return productList;
        }
        return null;
    }

    async getCartItem(idCart: number, idProduct: number): Promise<CartItemDTO | null>{
        const cart = await this.cartDataSource.getOne(idCart);
        const product = await this.productDataSource.getOne(idProduct);
        const data = await this.cartItemDataSource.getOne(cart, product);
        if (data) {
            return CartItemPresenter.toDTO(data);
        }
        return null;

    }

    async update(id: number, cart: CartItemDTO): Promise<CartItemDTO | null> {

        const cartEntity: CartItemEntity = new CartItemEntity(
            id,
            cart.options,
            cart.price,
            new ProductEntity(Number(cart.product.id), cart.product.name, cart.product.options, cart.product.price, cart.product.timeToPrepare, cart.product.category, cart.product.status),
            new CartEntity(Number(cart.cart.id), new UserEntity(Number(cart.cart.user.id), cart.cart.user.cpf, cart.cart.user.name, cart.cart.user.email), cart.cart.totalValue, cart.cart.status, cart.cart.payment, cart.cart.estimatedTime));
       
        const data = await this.cartItemDataSource.update(cartEntity);
        if (data) {
            const dataEntity = CartItemPresenter.toDTO(data);
            return dataEntity;
        }
        return null;
    }

    async getAll(): Promise<CartItemDTO[] | null> {

        const data = await this.cartItemDataSource.getAll();
        if (data) {
            let dataDTO = [] as CartItemDTO[];
            data.forEach(data => {
                dataDTO.push(CartItemPresenter.toDTO(data))
            });

            return dataDTO;
        }
        return null;
    }
}