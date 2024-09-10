import { CartEntity } from '../../core/entities/cart';

export interface CartDataSource{
    create(newCart: CartEntity): Promise<CartEntity>;
    update(id: number, cart: CartEntity) : Promise<CartEntity>;
    getOne(id: number): Promise<CartEntity>;
    delete(id: number): Promise<void>;
    getAll(): Promise<CartEntity[]>;
}