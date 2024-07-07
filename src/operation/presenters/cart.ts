import { CartDTO } from "../../common/dtos/cart.dto";
import { CartEntity } from "../../core/entities/cart";
import { UserPresenter } from './user';
import { CartItemDTO } from '../../common/dtos/cart-item.dto';
import { CartItemPresenter } from "./cartItem";

export class CartPresenter {
    static toDTO(
        cart: CartEntity
    ): CartDTO {
        
        let dto: CartDTO = {
            id: String(cart.id),
            user: String(cart.user),
            totalValue: cart.totalValue,
            status: cart.status,
            payment: cart.payment
        };
        return dto;
    }
}
