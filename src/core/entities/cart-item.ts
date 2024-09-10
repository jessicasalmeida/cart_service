import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from './product';
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
    product: ProductEntity;
    
    @ManyToOne(() => CartEntity, cart => cart.id, {onDelete: 'CASCADE', onUpdate: 'NO ACTION'})
    @JoinColumn([{ name: 'cart_id', referencedColumnName: 'id' }])
    cart: CartEntity;

    constructor(id: number, options:string, price: number, product: ProductEntity, cart:CartEntity) {
        this.id = id;
        this.options = options;
        this.price = price;
        this.product = product;
        this.cart = cart;
    }

}