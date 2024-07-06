import { CartEntity } from "../../core/entities/cart";
import { ProductEntity } from "../../core/entities/product";
import { CartDTO } from "./cart.dto";
import { ProductDTO } from "./product.dto";

export type NewCartItemDTO = {
    options: string;
    price: number;
    product: number;
    cart: number;
}

export type CartItemDTO = {
    id: number;
    options: string;
    price: number;
    product: number;
    cart: number;
}