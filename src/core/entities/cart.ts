import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartItemEntity } from "./cart-item";
import { UserEntity } from "./user";


@Entity()
export class CartEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @OneToOne(() => UserEntity, (user) => user.id)
    user: number
    @OneToMany(()=> CartItemEntity, (cartItem) => cartItem.cart)
    itensCart: CartItemEntity[]
    @Column()
    totalValue: number;
    @Column()
    status: string;
    @Column()
    payment: boolean;

    constructor(
        id: number,
        user: number,
        itensCart: CartItemEntity[],
        totalValue: number,
        status: string,
        payment: boolean,
    ) {
        this.id = id;
        this.user = user;
        this.itensCart = itensCart;
        this.totalValue = totalValue;
        this.status = status;
        this.payment = payment;
    }

}
