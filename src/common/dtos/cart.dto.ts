import { ItensDTO } from "./cart-item.dto";
import { UserDTO } from "./user.dto";

export type NewCartDTO = {
    user: UserDTO;
    totalValue: number;
    status: string;
    payment: boolean;
}

export type CartDTO = {
    id: string;
    user: UserDTO;
    totalValue: number;
    status: string;
    payment: boolean;
    estimatedTime: number;
}

export type CartItensDTO = {
    id: string;
    user: UserDTO;
    totalValue: number;
    status: string;
    payment: boolean;
    estimatedTime: number;
    cartItens: ItensDTO[]
}