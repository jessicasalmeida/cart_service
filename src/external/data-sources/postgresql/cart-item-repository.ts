import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "./db-connect";
import { CartItemEntity } from "../../../core/entities/cart-item";
import { CartItemDataSource } from "../../../common/interfaces/cart-item-data-source";
import { CartEntity } from "../../../core/entities/cart";
import { ProductEntity } from "../../../core/entities/product";

export class CartItemRepository implements CartItemDataSource {

    private repository: Repository<CartItemEntity>;

    constructor(manager: EntityManager) {
        this.repository = AppDataSource.getRepository(CartItemEntity);
    }

    async getAll(): Promise<CartItemEntity[]> {
        return await this.repository.find({relations: ["product", "cart", "cart.user"]});
    }

    async create(cartItem: CartItemEntity): Promise<CartItemEntity> {
        await this.repository.save(cartItem);
        return cartItem;
    }

    async update(newCart: CartItemEntity): Promise<CartItemEntity> {
        const cartBd = await this.repository.findOneBy({ id: newCart.id });

        cartBd!.cart = newCart.cart;
        cartBd!.options = newCart.options;
        cartBd!.product = newCart.product;

        await this.repository.save(cartBd!);
        return cartBd!;
    }

    async getOne(cart: CartEntity, product: ProductEntity): Promise<CartItemEntity> {
        const cartItem = await this.repository.findOne({
            where: {
                product: product,
                cart: cart
            },
            relations: ["product", "cart", "cart.user"]
        });
        if (!cartItem) {
            throw new Error(`Cart with id ${cart} not found`);
        }
        return cartItem;
    }

    async delete(id: number): Promise<void> {
        const query = { id: (id) };
        await this.repository.delete(id);
    }
}