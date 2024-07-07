import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product";
import { CartEntity } from "./cart";

@Entity()
export class CartItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    options: string;

    @Column()
    price: number;

    @ManyToOne(() => ProductEntity, product => product.id, {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
    @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
    productId: number;
    
    @ManyToOne(() => CartEntity, cart => cart.id, {onDelete: 'CASCADE', onUpdate: 'NO ACTION'})
    @JoinColumn([{ name: 'cart_id', referencedColumnName: 'id' }])
    cartId: number;

    constructor(id: number, options:string, price: number, product: number, cart:number) {
        this.id = id;
        this.options = options;
        this.price = price;
        this.productId = product;
        this.cartId = cart;
    }

}