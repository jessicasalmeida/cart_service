import { CartUseCase } from '../../core/usercases/cart-use-case';
import { CartGateway } from '../gateways/cart';
import { CartDataSource } from '../../common/interfaces/cart-data-source';
import UserDataSource from '../../common/interfaces/user-data-source';
import { UserGateway } from '../gateways/user';
import ProductDataSource from '../../common/interfaces/product-data-source';
import { ProductGateway } from '../gateways/product';


export class CartController {
    constructor(private readonly cartUseCase: CartUseCase) { }

    static async createCart(cartDataSource: CartDataSource) {
        const cartGateway = new CartGateway(cartDataSource);
        if (!cartGateway) {
            throw new Error("Gateway Inválido");
        }
        const cart = await CartUseCase.createCart(cartGateway);
        if (!cart) {
            return null;
        }
        return await cart;
    }

    static async addUser(idCart: string, idUser: string, cartDataSource: CartDataSource, userDataSource: UserDataSource) {
        const cartGateway = new CartGateway(cartDataSource);
        const userGateway = new UserGateway(userDataSource);
        if (!cartGateway) {
            throw new Error("Gateway Inválido");
        }
        const cart = await CartUseCase.addUser(idCart, idUser, cartGateway, userGateway);
        if (!cart) {
            return null;
        }
        return cart;
    }

    static async addProduct(idCart: string, idUser: string, cartDataSource: CartDataSource, productDataSource: ProductDataSource) {
        const cartGateway = new CartGateway(cartDataSource);
        const productGateway = new ProductGateway(productDataSource);
        if (!cartGateway) {
            throw new Error("Gateway Inválido");
        }
        const cart = await CartUseCase.addProduct(idCart, idUser, cartGateway, productGateway);
        if (!cart) {
            return null;
        }
        return cart;
    }

    static async personalizeItens(idCart: string, idProduct: string,  options: string[], cartDataSource: CartDataSource) {
        const cartGateway = new CartGateway(cartDataSource);
        if (!cartGateway) {
            throw new Error("Gateway Inválido");
        }
        const cart = await CartUseCase.personalizeItem(idCart, idProduct, options, cartGateway);
        if (!cart) {
            return null;
        }
        return cart;
    }

    static async resumeCart(id: string, cartDataSource: CartDataSource) {
        const cartGateway = new CartGateway(cartDataSource);
        if (!cartGateway) {
            throw new Error("Gateway Inválido");
        }
        const cart = await CartUseCase.resumeCart(id, cartGateway);      
        if (!cart) {
            return null;
        }
        return cart;
    }

    static async closeCart(id: string, cartDataSource: CartDataSource) {
        const cartGateway = new CartGateway(cartDataSource);
        if (!cartGateway) {
            throw new Error("Gateway Inválido");
        }
        const cart = await CartUseCase.closeCart(id, cartGateway);       
        if (!cart) {
            return null;
        }
        return cart;
    }

    static async payCart(id: string, cartDataSource: CartDataSource) {
        const cartGateway = new CartGateway(cartDataSource);
        if (!cartGateway) {
            throw new Error("Gateway Inválido");
        }
        const cart = await CartUseCase.payCart(id, cartGateway);
        if (!cart) {
            return null;
        }
        return cart;
    }

    static async sendToKitchen(id: string, cartDataSource: CartDataSource) {
        const cartGateway = new CartGateway(cartDataSource);
        if (!cartGateway) {
            throw new Error("Gateway Inválido");
        }
        return await CartUseCase.sendToKitchen(id, cartGateway);
    }

    static async cancelCart(id: string, cartDataSource: CartDataSource) {
        const cartGateway = new CartGateway(cartDataSource);
        if (!cartGateway) {
            throw new Error("Gateway Inválido");
        }
        const cart = await CartUseCase.cancelCart(id, cartGateway);
        if (!cart) {
            return null;
        }
        return cart;
    }
}
