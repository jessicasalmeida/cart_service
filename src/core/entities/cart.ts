import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CartItemEntity } from "./cart-item";
import { UserEntity } from "./user";


@Entity()
export class CartEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    user: UserEntity;
    @Column()
    totalValue: number;
    @Column()
    status: string;
    @Column()
    payment: boolean;

    constructor(
        id: number,
        user: UserEntity,
        cartItens: CartItemEntity[],
        totalValue: number,
        status: string,
        payment: boolean,
    ) {
        this.id = id;
        this.user = user;
        this.totalValue = totalValue;
        this.status = status;
        this.payment = payment;
    }

}
