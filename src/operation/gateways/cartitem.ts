import { CartItemDTO, NewCartItemDTO } from '../../common/dtos/cart-item.dto';
import { ProductDTO } from '../../common/dtos/product.dto';
import { CartDataSource } from '../../common/interfaces/cart-data-source';
import { CartItemDataSource } from '../../common/interfaces/cart-item-data-source';
import { CartItemEntity } from '../../core/entities/cart-item';
import { CartItemPresenter } from '../presenters/cartItem';
import { ProductPresenter } from '../presenters/product';
import ProductDataSource from '../../common/interfaces/product-data-source';

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
            Number(cart.product),
            Number(cart.cart)
        );
        const sucesso = await this.cartItemDataSource.create(cartEntity);
        return CartItemPresenter.toDTO(sucesso);
    }

    async getProductsByCart(idCart: number): Promise<ProductDTO[] | null> {
        const cart = await this.cartDataSource.getOne(idCart);
        const data = await this.cartItemDataSource.getAll();
        const cartItens = data.filter(c=> c.cart = cart.id);
        const productList = {} as ProductDTO[];
        cartItens.forEach(async c=> productList.push(ProductPresenter.toDTO(await this.productDataSource.getOne(c.product))));
        if (productList) {
            return productList;
        }
        return null;
    }

    async getCartItem(idCart: number, idProduct: number): Promise<CartItemDTO | null>{
        const cart = await this.cartDataSource.getOne(idCart);
        const product = await this.productDataSource.getOne(idProduct);
        const data = await this.cartItemDataSource.getOne(cart.id, product.id);
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
            Number(cart.product),
            Number(cart.cart)
         );

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
            var dataDTO: Array<CartItemDTO> = new Array();
            data.forEach(data => {
                dataDTO.push(CartItemPresenter.toDTO(data))
            });

            return dataDTO;
        }
        return null;
    }
}