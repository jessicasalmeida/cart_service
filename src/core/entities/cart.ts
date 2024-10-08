import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
    @Column()
    estimatedTime: number;
    
    constructor(
        id: number,
        user: UserEntity,
        totalValue: number,
        status: string,
        payment: boolean,
        estimatedTime: number
    ) {
        this.id = id;
        this.user = user;
        this.totalValue = totalValue;
        this.status = status;
        this.payment = payment;
        this.estimatedTime = estimatedTime;
    }

}
