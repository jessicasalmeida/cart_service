import { CartDTO } from "./cart.dto";

export type PaymentDTO = {
    status: boolean;
    cart: CartDTO;
}
