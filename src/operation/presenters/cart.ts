import { CartDTO } from "../../common/dtos/cart.dto";
import { CartEntity } from "../../core/entities/cart";
import { UserPresenter } from './user';
import { CartItemDTO } from '../../common/dtos/cart-item.dto';
import { CartItemPresenter } from "./cartItem";

export class CartPresenter {
    static toDTO(
        cart: CartEntity
    ): CartDTO {
        let cartItemList = {} as CartItemDTO[];
        
        cart.itensCart.forEach(c=> cartItemList.push(CartItemPresenter.toDTO(c)));

        let dto: CartDTO = {
            id: cart.id.toString(),
            user: cart.user.toString(),
            itensCart: cartItemList,
            totalValue: cart.totalValue,
            status: cart.status,
            payment: cart.payment
        };
        return dto;
    }
}
