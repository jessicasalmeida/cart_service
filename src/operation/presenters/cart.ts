import { CartDTO } from "../../common/dtos/cart.dto";
import { CartEntity } from "../../core/entities/cart";
import { UserPresenter } from './user';

export class CartPresenter {
    static toDTO(
        cart: CartEntity
    ): CartDTO {
        
        let dto: CartDTO = {
            id: String(cart.id),
            user: UserPresenter.toDTO(cart.user),
            totalValue: cart.totalValue,
            status: cart.status,
            payment: cart.payment,
            estimatedTime: cart.estimatedTime
        };
        return dto;
    }
}
