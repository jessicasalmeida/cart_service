import { ProductDTO } from "./product.dto";
import { UserDTO } from "./user.dto";

export type NewCartDTO = {
    user: UserDTO;
    cartItens: ProductDTO[];
    totalValue: number;
    status: string;
    payment: boolean;
}


export type CartDTO = {
    id: string;
    user: UserDTO;
    cartItens: ProductDTO[];
    totalValue: number;
    status: string;
    payment: boolean;
}