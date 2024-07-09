import { CartUseCase } from '../../core/usercases/cart-use-case';
import { CartGateway } from '../gateways/cart';
import { CartDataSource } from '../../common/interfaces/cart-data-source';
import UserDataSource from '../../common/interfaces/user-data-source';
import { UserGateway } from '../gateways/user';
import ProductDataSource from '../../common/interfaces/product-data-source';
import { ProductGateway } from '../gateways/product';
import { CartItemDataSource } from '../../common/interfaces/cart-item-data-source';
import { CartItemGateway } from '../gateways/cartitem';
import { CartItensDTO } from '../../common/dtos/cart.dto';
import { OrderDTO } from '../../common/dtos/order.dto';
import { response } from 'express';
import { error } from 'console';

export class CartController {
    constructor(private readonly cartUseCase: CartUseCase) { }

    static async createCart(cartDataSource: CartDataSource, userDataSource: UserDataSource) {
        const cartGateway = new CartGateway(cartDataSource);
        const userGateway = new UserGateway(userDataSource);

        if (!cartGateway) {
            throw new Error("Gateway Inválido");
        }
        const cart = await CartUseCase.createCart(cartGateway, userGateway);
        if (!cart) {
            return null;
        }
        return cart;
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

    static async addProduct(idCart: string, idProduct: string, cartDataSource: CartDataSource, productDataSource: ProductDataSource, cartItemDataSource: CartItemDataSource) {
        const cartGateway = new CartGateway(cartDataSource);
        const productGateway = new ProductGateway(productDataSource);
        const cartItemGateway = new CartItemGateway(cartItemDataSource, cartDataSource, productDataSource);
        if (!cartGateway) {
            throw new Error("Gateway Inválido");
        }
        const cart = await CartUseCase.addProduct(idCart, idProduct, cartGateway, productGateway, cartItemGateway);
        if (!cart) {
            return null;
        }
        return cart;
    }

    static async personalizeItens(idCart: string, idProduct: string, options: string, cartDataSource: CartDataSource, productDataSource: ProductDataSource, cartItemDataSource: CartItemDataSource) {
        const cartItemGateway = new CartItemGateway(cartItemDataSource, cartDataSource, productDataSource);
        if (!cartItemGateway) {
            throw new Error("Gateway Inválido");
        }
        const cart = await CartUseCase.personalizeItem(idCart, idProduct, options, cartItemGateway);
        if (!cart) {
            return null;
        }
        return cart;
    }

    static async resumeCart(id: string, cartDataSource: CartDataSource, cartItemDataSource: CartItemDataSource, productDataSource: ProductDataSource) {
        const cartGateway = new CartGateway(cartDataSource);
        const cartItemGateway = new CartItemGateway(cartItemDataSource, cartDataSource, productDataSource);
        if (!cartGateway) {
            throw new Error("Gateway Inválido");
        }
        const cart = await CartUseCase.resumeCart(id, cartGateway, cartItemGateway);
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

    static async sendToKitchen(id: string, cartDataSource: CartDataSource, cartItemDataSource: CartItemDataSource, productDataSource: ProductDataSource) {
        const cartGateway = new CartGateway(cartDataSource);
        if (!cartGateway) {
            throw new Error("Gateway Inválido");
        }
        const orderSended = await CartUseCase.sendToKitchen(id, cartGateway);
        const cartItens = await this.resumeCart(id, cartDataSource, cartItemDataSource, productDataSource) as unknown as CartItensDTO;

        if (orderSended) {
            return await createOrder(cartItens);
        }
        else {
            return false;
        }
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



function createOrder(cartItens: CartItensDTO): Promise<OrderDTO> {
    return fetch('http://localhost:5000/order/receive/',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({cart : cartItens}),
        })
		.then((response) =>{
            console.log(response);
            return response as unknown as OrderDTO; // Cast the response type to our interface
        })
        .catch((erro)=>{
            console.log(erro);
            throw new Error("Erro ao enviar o pedido para cozinha: " + cartItens + "Erro: " +erro);
        }     
        );

}


