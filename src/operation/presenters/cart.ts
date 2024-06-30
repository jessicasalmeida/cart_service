import { CartDTO } from "../../common/dtos/cart.dto";
import { CartEntity } from "../../core/entities/cart";

export class CartPresenter {
    static toDTO(
        cart: CartEntity
    ): CartDTO {
        let dto: CartDTO = {
            id: cart.id.toString(),
            user: cart.user,
            products: cart.products,
            totalValue: cart.totalValue,
            status: cart.status,
            payment: cart.payment
        };
        return dto;
    }
}
