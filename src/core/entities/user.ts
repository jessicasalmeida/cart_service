import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    public id: number
    @Column()
    public cpf: string;
    @Column()
    public name: string;
    @Column()
    public email: string;

    constructor(
        id: number,
        cpf: string,
        name: string,
        email: string,
    ) {
        this.id = id;
        this.cpf = cpf;
        this.name = name;
        this.email = email;
    }

}