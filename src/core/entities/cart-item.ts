import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product";
import { CartEntity } from "./cart";

@Entity()
export class CartItemEntity {
    @PrimaryGeneratedColumn()
    private id: number;

    @ManyToOne(
        () => ProductEntity,
        product => product.id,
        {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
      )
      @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
      products: ProductEntity[];
    
    @ManyToOne(
    () => CartEntity,
    cart => cart.id,
    {onDelete: 'CASCADE', onUpdate: 'NO ACTION'}
    )
    @JoinColumn([{ name: 'cart_id', referencedColumnName: 'id' }])
    carts: CartEntity[];

    constructor(id: number, products: ProductEntity[], carts:CartEntity[]) {
        this.id = id;
        this.products = products;
        this.carts = carts;
    }

}