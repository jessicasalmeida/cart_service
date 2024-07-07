import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartItemEntity } from "./cart-item";
import { UserEntity } from "./user";


@Entity()
export class CartEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: 'id_user'})    
    user: UserEntity

    @Column()
    totalValue: number;
    @Column()
    status: string;
    @Column()
    payment: boolean;

    constructor(
        id: number,
        user: UserEntity,
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
