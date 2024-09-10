import { CartItemDTO } from "../../common/dtos/cart-item.dto";
import { CartItemEntity } from "../../core/entities/cart-item";
import { ProductPresenter } from './product';
import { CartPresenter } from './cart';

export class CartItemPresenter {
    static toDTO(
        cart: CartItemEntity
    ): CartItemDTO {
        let dto: CartItemDTO = {
            id: cart.id,
            options: cart.options,
            price: cart.price,
            product: ProductPresenter.toDTO(cart.product),
            cart: CartPresenter.toDTO(cart.cart)
        };
        return dto;
    }
}
