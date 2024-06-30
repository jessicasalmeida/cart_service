import { ObjectId } from "mongodb";
import { CartDataSource } from "../../../common/interfaces/cart-data-source";
import { collections } from "./db-connect";
import { CartDTO } from '../../../common/dtos/cart.dto';

export class CartRepositoryMongoBd implements CartDataSource {

    async create(newCart:CartDTO): Promise<CartDTO> {
        await collections.carts?.insertOne(newCart);
        return newCart;
    }   

    async update(id: string, newCart: CartDTO): Promise<CartDTO>
    {
        const query = { id: (id)};
        await collections.carts?.updateOne(query, {$set: newCart});
        return newCart;
    }

    async getOne(id: string) : Promise<CartDTO>
    {
        const query = { id: (id)};
        const cart = await collections.carts?.findOne(query);
        if(!cart)
        {
            throw new Error(`Cart with id ${id} not found`);
        }
        return cart as CartDTO;
    }
    async delete(id: string): Promise<void> {
        const query = { id: (id)};
        await collections.carts?.deleteOne(query);        
    }
}