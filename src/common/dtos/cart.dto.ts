import { CartItemDTO } from "./cart-item.dto";
import { UserDTO } from "./user.dto";

export type NewCartDTO = {
    user: string;
    itensCart: CartItemDTO[];
    totalValue: number;
    status: string;
    payment: boolean;
}


export type CartDTO = {
    id: string;
    user: string;
    itensCart: CartItemDTO[];
    totalValue: number;
    status: string;
    payment: boolean;
}