import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    options: Array<string>;
    @Column()
    price: number;
    @Column()
    timeToPrepare: number;
    @Column()
    category: string;
    @Column()
    status: boolean;

    constructor(
        id: number,
        name: string,
        options: Array<string>,
        price: number,
        timeToPrepare: number,
        category: string,
        status: boolean,

    ) {
        this.id = id;
        this.name = name;
        this.options = options;
        this.price = price;
        this.timeToPrepare = timeToPrepare;
        this.category = category;
        this.status = status;
    }
}
