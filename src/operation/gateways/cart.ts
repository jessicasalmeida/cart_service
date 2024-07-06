import { CartDTO } from '../../common/dtos/cart.dto';
import { CartDataSource } from '../../common/interfaces/cart-data-source';
import { CartEntity } from '../../core/entities/cart';
import { CartItemEntity } from '../../core/entities/cart-item';
import { CartPresenter } from '../presenters/cart';

export class CartGateway {
    cartDataSource: CartDataSource;
    constructor(cartDataSource: CartDataSource) {
        this.cartDataSource = cartDataSource;
    }

    async createcart(cart: CartDTO): Promise<CartDTO | null> {

        const cartEntity: CartEntity = new CartEntity(
            0,
            0,
            {} as CartItemEntity[],
            cart.totalValue,            
            cart.status,
            cart.payment
        );
        const sucesso = await this.cartDataSource.create(cartEntity);
        return CartPresenter.toDTO(sucesso);
    }

    async getOne(id: number): Promise<CartDTO | null> {
        const data = await this.cartDataSource.getOne(id);
        if (data) {
            const dataEntity = CartPresenter.toDTO(data);
            return dataEntity;
        }
        return null;
    }

    async update(id: number, cart: CartDTO): Promise<CartDTO | null> {
        const cartEntity: CartEntity = new CartEntity(
            0,
            Number(cart.user),
            {} as CartItemEntity[],
            cart.totalValue,
            cart.status,
            cart.payment
        );

        const data = await this.cartDataSource.update(id, cartEntity);
        if (data) {
            const dataEntity = CartPresenter.toDTO(data);
            return dataEntity;
        }
        return null;
    }

    async getAll(): Promise<CartDTO[] | null> {

        const data = await this.cartDataSource.getAll();
        if (data) {
            var dataDTO: Array<CartDTO> = new Array();
            data.forEach(data => {
                dataDTO.push(CartPresenter.toDTO(data))
            });

            return dataDTO;
        }
        return null;
    }
}