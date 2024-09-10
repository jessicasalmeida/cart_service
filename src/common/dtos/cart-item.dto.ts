import { CartDTO } from "./cart.dto";
import { ProductDTO } from "./product.dto";

export type NewCartItemDTO = {
    options: string;
    price: number;
    product: ProductDTO;
    cart: CartDTO;
}

export type CartItemDTO = {
    id: number;
    options: string;
    price: number;
    product: ProductDTO;
    cart: CartDTO;
}

export type ItensDTO = {
    id: number;
    options: string;
    price: number;
    product: ProductDTO;
}