import { UserEntity } from '../entities/user';
import { CartEntity } from '../entities/cart';
import { ProductEntity } from '../entities/product';
import { CartGateway } from '../../operation/gateways/cart';
import { UserGateway } from '../../operation/gateways/user';
import { ProductGateway } from '../../operation/gateways/product';
import { CartDTO } from '../../common/dtos/cart.dto';
import { ProductDTO } from '../../common/dtos/product.dto';
import { CartPresenter } from '../../operation/presenters/cart';

export class CartUseCase {

    static async createCart(cartGateway: CartGateway): Promise<CartDTO | null> {
        const newCart: CartEntity = new CartEntity(
            0,
            {} as UserEntity,
            [] as ProductDTO[],
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

    static async addProduct(idCart: string, idProduct: string, cartGateway: CartGateway, productGateway: ProductGateway): Promise<CartDTO | null> {
        const cart = await cartGateway.getOne(Number(idCart));
        if (cart) {
            let product = await productGateway.getOne(Number(idProduct));
            if (product) {
                product.price = CartUseCase.calculateProductPrice(cart.products, product, cartGateway);
                const newProducts = cart.products;
                newProducts.push(product);
                let valorTotal = CartUseCase.calculateTotalValue(newProducts, cartGateway);
                cart.products = newProducts;
                cart.totalValue = valorTotal;
                return cartGateway.update(idCart, cart);
            }
        }
        return null;

    }

    static async personalizeItem(idCart: string, idProduct: string, options: Array<string>, cartGateway: CartGateway): Promise<CartDTO | null> {
        const cart = await cartGateway.getOne(Number(idCart));
        if (cart) {
            let listProducts = cart.products;
            let products = listProducts.find((u) => {
                return u.id == idProduct;
            });

            if (!products) {
                throw new Error("Product with id ${idProduct} not found in cart {idCart} ")
            }
            const indexProduct = listProducts.indexOf(products);
            products.options = options;
            listProducts[indexProduct] = products;
            cart.products = listProducts;
            return cartGateway.update(idCart, cart);
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

    static async findOne(id: string, cartGateway: CartGateway): Promise<CartDTO| null> {
        const cart = await cartGateway.getOne(Number(id));
        if (cart) {
            return cart;
        }
        return null;
    }

    private static calculateTotalValue(productsList: ProductEntity[], cartGateway: CartGateway): number {
        return productsList.reduce((sum, p) => sum + p.price, 0);
    }

    private static calculateProductPrice(productsList: ProductEntity[], product: ProductEntity, cartGateway: CartGateway): number {
        let qtdCombos = productsList.filter(value => value.category == "combo").length;
        let qtdBebida = productsList.filter(value => value.category === "bebida").length;
        let qtdAcompanhamento = productsList.filter(value => value.category === "acompanhamento").length;

        if (product.category === "bebida" && qtdCombos > qtdBebida ||
            product.category === "acompanhamento" && qtdCombos > qtdAcompanhamento) {
            return 0;
        }
        return product.price;
    }
}