import { CartItensDTO } from "./cart.dto";

export type OrderDTO = {
    id: string;
    receiveDate: Date;
    deliveryTime: number;
    status: string;
    cart: CartItensDTO;
}