import { CartItemDTO } from "../../common/dtos/cart-item.dto";
import { CartItemEntity } from "../../core/entities/cart-item";
import { CartPresenter } from "./cart";
import { ProductPresenter } from './product';

export class CartItemPresenter {
    static toDTO(
        cart: CartItemEntity
    ): CartItemDTO {
        let dto: CartItemDTO = {
            id: cart.id,
            options: cart.options,
            price: cart.price,
            product: cart.product,
            cart: cart.cart
        };
        return dto;
    }
}
