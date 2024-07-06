import { CartEntity } from "../../core/entities/cart";
import { CartItemEntity } from "../../core/entities/cart-item";
import { ProductEntity } from "../../core/entities/product";

export interface CartItemDataSource{
    create(cartItem: CartItemEntity): Promise<CartItemEntity>;
    update(cart: CartItemEntity) : Promise<CartItemEntity>;
    getOne(cart: number, product: number): Promise<CartItemEntity>;
    delete(id: number): Promise<void>;
    getAll(): Promise<CartItemEntity[]>;
}