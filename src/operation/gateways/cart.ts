import { CartDTO } from '../../common/dtos/cart.dto';
import { UserDTO } from '../../common/dtos/user.dto';
import { CartDataSource } from '../../common/interfaces/cart-data-source';
import { CartEntity } from '../../core/entities/cart';
import { UserEntity } from '../../core/entities/user';
import { CartPresenter } from '../presenters/cart';

export class CartGateway {
    cartDataSource: CartDataSource;
    constructor(cartDataSource: CartDataSource) {
        this.cartDataSource = cartDataSource;
    }

    async createcart(cart: CartDTO, user: UserDTO): Promise<CartDTO | null> {

        const cartEntity: CartEntity = new CartEntity(
            Number(cart.id),
            new UserEntity(Number(user.id), user.cpf, user.name, user.email, user.cep, user.telefone),
            cart.totalValue,            
            cart.status,
            cart.payment,
            cart.estimatedTime
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

            Number(cart.id),
            new UserEntity(Number(cart.user.id), cart.user.cpf, cart.user.name, cart.user.email, cart.user.cep, cart.user.telefone),
            cart.totalValue,
            cart.status,
            cart.payment,
            cart.estimatedTime
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
            const dataDTO: Array<CartDTO> = new Array();
            data.forEach(data => {
                dataDTO.push(CartPresenter.toDTO(data))
            });

            return dataDTO;
        }
        return null;
    }
}