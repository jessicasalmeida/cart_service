import { EntityManager, Repository } from "typeorm";
import { CartDataSource } from "../../../common/interfaces/cart-data-source";
import { CartEntity } from '../../../core/entities/cart';
import { AppDataSource } from "./db-connect";

export class CartRepository implements CartDataSource {

    private repository: Repository<CartEntity>;

    constructor(manager: EntityManager) {
        this.repository = AppDataSource.getRepository(CartEntity);
    }

    async getAll(): Promise<CartEntity[]> {
        return await this.repository.find();
    }

    async create(newCart: CartEntity): Promise<CartEntity> {
        await this.repository.save(newCart);
        return newCart;
    }

    async update(idCart: number, newCart: CartEntity): Promise<CartEntity> {
        const cartBd = await this.repository.findOneBy({ id: idCart });

        cartBd!.user = newCart.user;
        cartBd!.payment = newCart.payment;
        cartBd!.status = newCart.status;
        cartBd!.totalValue = newCart.totalValue;

        await this.repository.save(cartBd!);
        return newCart;
    }

    async getOne(id: number): Promise<CartEntity> {
        const cart = await this.repository.findOneBy({id});
        if (!cart) {
            throw new Error(`Cart with id ${id} not found`);
        }
        return cart as CartEntity;
    }
    async delete(id: number): Promise<void> {
        const query = { id: (id) };
        await this.repository.delete(id);
    }
}