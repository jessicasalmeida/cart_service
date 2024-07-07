import { CartEntity } from '../entities/cart';
import { CartGateway } from '../../operation/gateways/cart';
import { UserGateway } from '../../operation/gateways/user';
import { ProductGateway } from '../../operation/gateways/product';
import { CartDTO } from '../../common/dtos/cart.dto';
import { ProductDTO } from '../../common/dtos/product.dto';
import { CartPresenter } from '../../operation/presenters/cart';
import { CartItemGateway } from '../../operation/gateways/cartitem';
import { CartItemDTO } from '../../common/dtos/cart-item.dto';

export class CartUseCase {

    static async createCart(cartGateway: CartGateway): Promise<CartDTO | null> {
        const newCart: CartEntity = new CartEntity(
            0,
            1,
            0,
            "OPEN",
            false);
        const cart = await cartGateway.createcart(CartPresenter.toDTO(newCart));
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
                cart.user = user.id;
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
            let productList = [] as ProductDTO[];
            if (product) {
                if (productCart!.length > 0) {
                    productList.push(productCart as unknown as ProductDTO);
                    product.price = CartUseCase.calculateProductPrice(productList!, product, cartGateway);
                }
                productList.push(product);
                let valorTotal = CartUseCase.calculateTotalValue(productList, cartGateway);
                const newCartItemDTO = {
                    options: product.options,
                    price: product.price,
                    product: Number(product.id),
                    cart: Number(cart.id)
                };
                cartItemGateway.createcart(newCartItemDTO);
                cart.totalValue = valorTotal;

                return cartGateway.update(Number(cart.id), cart);

                
            }
        }
        return null;

    }

    static async personalizeItem(idCart: string, idProduct: string, options: string, cartItemGateway: CartItemGateway): Promise<CartItemDTO | null> {
        const cartItem = await cartItemGateway.getCartItem(Number(idCart), Number(idProduct));
        if (cartItem) {
            cartItem.options = options;
            cartItemGateway.update(cartItem.id, cartItem);
        }
        else {
            throw new Error("Product with id ${idProduct} not found in cart {idCart} ");
        }

        return null;
    }

    static async resumeCart(id: string, cartGateway: CartGateway): Promise<CartDTO | null> {
        const cart = await cartGateway.getOne(Number(id));
        if (cart) {
            return cart;
        }
        return null;
    }
    static async closeCart(id: string, cartGateway: CartGateway): Promise<CartDTO | null> {
        const cart = await cartGateway.getOne(Number(id));
        if (cart) {
            cart.status = "CLOSED"
            return cartGateway.update(Number(id), cart);
        }
        return null;
    }
    static async payCart(id: string, cartGateway: CartGateway): Promise<CartDTO | null> {
        const cart = await cartGateway.getOne(Number(id));
        if (cart) {
            cart.payment = true;
            return cartGateway.update(Number(id), cart);
        }
        return null;
    }
    static async sendToKitchen(id: string, cartGateway: CartGateway): Promise<boolean> {
        const cart = await cartGateway.getOne(Number(id));
        if (cart) {
            if (cart.payment) {
                cart.status = "SENDED"
                await cartGateway.update(Number(id), cart);
                return true;
            }
        }
        return false;
    }

    static async cancelCart(id: string, cartGateway: CartGateway): Promise<CartDTO | null> {
        const cart = await cartGateway.getOne(Number(id));
        if (cart) {
            cart.status = "CANCELLED"
            return cartGateway.update(Number(id), cart);
        }
        return null;
    }

    static async findOne(id: string, cartGateway: CartGateway): Promise<CartDTO | null> {
        const cart = await cartGateway.getOne(Number(id));
        if (cart) {
            return cart;
        }
        return null;
    }

    private static calculateTotalValue(productsList: ProductDTO[], cartGateway: CartGateway): number {
        return productsList.reduce((sum, p) => sum + p.price, 0);
    }

    private static calculateProductPrice(productsList: ProductDTO[], product: ProductDTO, cartGateway: CartGateway): number {
        let qtdCombos = productsList.filter(value => value.category === "combo").length;
        let qtdBebida = productsList.filter(value => value.category === "bebida").length;
        let qtdAcompanhamento = productsList.filter(value => value.category === "acompanhamento").length;

        if (product.category === "bebida" && qtdCombos > qtdBebida ||
            product.category === "acompanhamento" && qtdCombos > qtdAcompanhamento) {
            return 0;
        }
        return product.price;
    }
}