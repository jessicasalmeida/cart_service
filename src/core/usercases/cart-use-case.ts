import { CartGateway } from '../../operation/gateways/cart';
import { UserGateway } from '../../operation/gateways/user';
import { ProductGateway } from '../../operation/gateways/product';
import { CartDTO, CartItensDTO } from '../../common/dtos/cart.dto';
import { ProductDTO } from '../../common/dtos/product.dto';
import { CartItemDTO, ItensDTO } from '../../common/dtos/cart-item.dto';
import { CartItemGateway } from '../../operation/gateways/cartitem';
import { PaymentDTO } from '../../common/dtos/payment.dto';
import { RabbitMQ } from '../../external/mq/mq';
import { log } from 'console';

export class CartUseCase {
    static mq: RabbitMQ;

    constructor(mq: RabbitMQ) {
        CartUseCase.mq = mq;
    }

    static async createCart(cartGateway: CartGateway, userGateway: UserGateway): Promise<CartDTO | null> {
        const user = await userGateway.getUserById(Number(2));
        const newCart: CartDTO = {
            id: "0",
            user: user!,
            totalValue: 0,
            status: "OPEN",
            payment: false,
            estimatedTime: 0
        };
        const cart = await cartGateway.createcart(newCart, user!);
        if (cart) {
            return cart;
        }
        else {
            return null;
        }
    }

    static async addUser(idCart: string, idUser: string, cartGateway: CartGateway, userGateway: UserGateway): Promise<CartDTO | null> {
        const cart = await cartGateway.getOne(Number(idCart));
        if (cart) {
            const user = await userGateway.getUserById(Number(idUser));
            if (user) {
                cart.user = user;
            }
            else {
                throw new Error("Não foi possivel add o user no cart: Usuário: " + idUser);
            }
            return cartGateway.update(Number(idCart), cart);
        }
        else {
            return null;
        }
    }

    static async addProduct(idCart: string, idProduct: string, cartGateway: CartGateway, productGateway: ProductGateway, cartItemGateway: CartItemGateway): Promise<CartDTO | null> {

        const cart = await cartGateway.getOne(Number(idCart));

        if (cart) {
            let product = await productGateway.getOne(Number(idProduct));
            const productCart = await cartItemGateway.getProductsByCart(Number(cart.id));
            if (product) {
                product.price = CartUseCase.calculateProductPrice(productCart!, product);
                productCart!.push(product);
                cart.estimatedTime = productCart != null ? CartUseCase.calculateEstimatedDelivery(productCart) : 0;
                let valorTotal = CartUseCase.calculateTotalValue(productCart!);
                const newCartItemDTO = {
                    options: product.options,
                    price: product.price,
                    product: product,
                    cart: cart
                };
                cart.totalValue = valorTotal;
                cartItemGateway.createcart(newCartItemDTO);
                return cartGateway.update(Number(cart.id), cart);
            }
        }
        return null;

    }

    static async personalizeItem(idCart: string, idProduct: string, options: string, cartItemGateway: CartItemGateway): Promise<CartItemDTO | null> {
        const cartItem = await cartItemGateway.getCartItem(Number(idCart), Number(idProduct));
        if (cartItem) {
            cartItem.options = options;
            return cartItemGateway.update(cartItem.id, cartItem);
        }
        else {
            throw new Error("Product with id ${idProduct} not found in cart {idCart} ");
        }
    }

    static async resumeCart(id: string, cartGateway: CartGateway, cartItemGateway: CartItemGateway): Promise<CartItensDTO | null> {
        const cart = await cartGateway.getOne(Number(id));
        const cartItem = await cartItemGateway.getAll();
        let cartItens = [] as ItensDTO[];
        if (cartItem!.length > 0) {
            cartItem!.forEach(c => {
                if (c.cart.id === cart?.id) {
                    cartItens.push({
                        id: Number(c.id),
                        options: c.options,
                        price: c.price,
                        product: c.product
                    });
                }
            })
        }
        const retorno: CartItensDTO = {
            id: String(cart!.id),
            user: cart!.user,
            totalValue: cart!.totalValue,
            status: cart!.status,
            payment: cart!.payment,
            estimatedTime: cart!.estimatedTime,
            cartItens: cartItens
        }
        return retorno;
    }
    static async closeCart(id: string, cartGateway: CartGateway): Promise<CartDTO | null> {
        const cart = await cartGateway.getOne(Number(id));
        if (cart) {
            cart.status = "CLOSED"
            return cartGateway.update(Number(id), cart);
        }
        return null;
    }
    static async payCart(id: string, cartGateway: CartGateway): Promise<PaymentDTO | null> {
        const cart = await cartGateway.getOne(Number(id));
        if (cart == null) {
            return null
        }
        if (cart.totalValue > 0) {
            cart.status = "PENDING PAYMENT"
            cartGateway.update(Number(id), cart);

            const payment: PaymentDTO = {
                status: false,
                cart: cart
            }
            CartUseCase.mq = new RabbitMQ();
            await CartUseCase.mq.connect();
            await CartUseCase.mq.publish('new_payment', { payment: payment });
            await CartUseCase.mq.close();
            return payment;
        }
        return null;
    }

    static async payedCart(id: string, cartGateway: CartGateway): Promise<CartDTO | null> {
        const cart = await cartGateway.getOne(Number(id));
        if (cart) {
            cart.payment = true;
            cart.status = "READY TO ORDER"
            cartGateway.update(Number(id), cart);
            return cart;
        }
        return null;
    }

    static async errorPayment(id: string, cartGateway: CartGateway): Promise<CartDTO | null> {
        const cart = await cartGateway.getOne(Number(id));
        if (cart) {
            cart.payment = false;
            cart.status = "ERROR PAYMENT"
            cartGateway.update(Number(id), cart);
            return cart;
        }
        return null;
    }

    static async errorNewOrder(id: string, cartGateway: CartGateway): Promise<CartDTO | null> {
        const cart = await cartGateway.getOne(Number(id));
        if (cart) {
            cart.status = "ERROR KITCHEN"
            cartGateway.update(Number(id), cart);
            return cart;
        }
        return null;
    }


    static async sendToKitchen(id: string, cartGateway: CartGateway, cartItemGateway: CartItemGateway): Promise<boolean> {
        const cart = await cartGateway.getOne(Number(id));

        const cartItens = await CartUseCase.resumeCart(id, cartGateway, cartItemGateway);


        if (cart) {
            if (cart.payment) {
                cart.status = "SENDED"
                await cartGateway.update(Number(id), cart);
                CartUseCase.mq = new RabbitMQ();
                await CartUseCase.mq.connect();
                await CartUseCase.mq.publish('new_order', { cart: cartItens });
                await CartUseCase.mq.close();
                return true;
            }
        }
        return false;
    }

    static async cancelCart(id: string, cartGateway: CartGateway): Promise<CartDTO | null> {
        const cart = await cartGateway.getOne(Number(id));
        if (cart) {
            if (!cart.status.includes("SENDED")) {
                cart.status = "CANCELLED"
                return cartGateway.update(Number(id), cart);
            }
        }
        return null;
    }

    private static calculateTotalValue(productsList: ProductDTO[]): number {
        return productsList.reduce((sum, p) => sum + p.price, 0);
    }

    private static calculateProductPrice(productsList: ProductDTO[], product: ProductDTO): number {
        let qtdCombos = productsList.filter(value => value.category === "combo").length;
        let qtdBebida = productsList.filter(value => value.category === "bebida").length;
        let qtdAcompanhamento = productsList.filter(value => value.category === "acompanhamento").length;

        if (product.category === "bebida" && qtdCombos > qtdBebida ||
            product.category === "acompanhamento" && qtdCombos > qtdAcompanhamento) {
            return 0;
        }
        return product.price;
    }

    private static calculateEstimatedDelivery(productsList: ProductDTO[]): number {
        return productsList.reduce((sum: any, p: { timeToPrepare: any; }) => sum + p.timeToPrepare, 0);
    }


    static async listeners(cartGateway: CartGateway): Promise<void> {
        CartUseCase.mq = new RabbitMQ();
        await CartUseCase.mq.connect();
        await CartUseCase.mq.consume('cart_paid', async (message: any) => {
            const payment: PaymentDTO = message.payment;
            console.log("Fila CART_PAID. ID: " + payment.cart.id);
            CartUseCase.payedCart(payment.cart.id, cartGateway);
        });
        await CartUseCase.mq.consume('rollback_cart_paid', async (message: any) => {
            const payment: PaymentDTO = message.payment;
            console.log("Fila rollback_cart_paid. ID: " + payment.cart.id);
            CartUseCase.errorPayment(payment.cart.id, cartGateway);
        });
        await CartUseCase.mq.consume('rollback_new_order', async (message: any) => {
            const cart: CartItensDTO = message.cart;
            console.log("Fila rollback_new_order. ID: " + cart.id);
            CartUseCase.errorNewOrder(cart.id, cartGateway);
        });
    }

}