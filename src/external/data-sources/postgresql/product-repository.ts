import ProductDataSource from "../../../common/interfaces/product-data-source";
import { ProductEntity } from "../../../core/entities/product";
import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "./db-connect";

export class ProductRepository implements ProductDataSource {

    private repository: Repository<ProductEntity>;

    constructor(manager: EntityManager) {
        this.repository = AppDataSource.getRepository(ProductEntity);
    }

    private produtos: ProductEntity[] = [
        { id: 0, name: "Big Mac", options: "['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles']", category: "lanche", price: 10, timeToPrepare: 15, status: true },
        { id: 0, name: "Big Tasty", options: "['Pão com Gergelim', 'Hamburguer', 'Queijo Emental', 'Alface Americana', 'Molho Tasty', 'Cebola', 'Tomate']", category: "lanche", price: 10, timeToPrepare: 15, status: true },
        { id: 0, name: "Quarteirao", options: "['Pão com Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Ketchup', 'Mostarda', 'Cebola', 'Picles']", category: "lanche", price: 10, timeToPrepare: 15, status: true },
        { id: 0, name: "Coca", options: "['Gelo']", category: "bebida", price: 10, timeToPrepare: 5, status: true },
        { id: 0, name: "Agua", options: "['Gelo']", category: "bebida", price: 10, timeToPrepare: 5, status: true },
        { id: 0, name: "Suco", options: "['Gelo', 'Acucar']", category: "bebida", timeToPrepare: 5, price: 10, status: true },
        { id: 0, name: "Pudim", options: "[]", category: "sobremesa", price: 10, timeToPrepare: 2, status: true },
        { id: 0, name: "Torta de Maça", options: "[]", category: "sobremesa", price: 10, timeToPrepare: 2, status: true },
        { id: 0, name: "Sorvete de Baunilha", options: " []", category: "sobremesa", price: 10, timeToPrepare: 2, status: true },
        { id: 0, name: "Torta de Maça", options: "[]", category: "sobremesa", price: 10, timeToPrepare: 2, status: true },
        { id: 0, name: "Sorvete de Chocolate", options: "[]", category: "sobremesa", price: 10, timeToPrepare: 2, status: false },
        { id: 0, name: "Combo Big Mac + Bebida + Acompanhamento", options: "['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles']", category: "combo", price: 30, timeToPrepare: 15, status: true },
        { id: 0, name: "Combo Big Tasty + Bebida + Acompanhamento", options: "['Pão com Gergelim', 'Hamburguer', 'Queijo Emental', 'Alface Americana', 'Molho Tasty', 'Cebola', 'Tomate']", category: "combo", price: 30, timeToPrepare: 15, status: true },
        { id: 0, name: "Combo Quarteirao+ Bebida + Acompanhamento", options: "['Pão com Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Ketchup', 'Mostarda', 'Cebola', 'Picles']", category: "combo", price: 30, timeToPrepare: 15, status: true },
        { id: 0, name: "Batata", options: "[]", category: "acompanhamento", price: 10, timeToPrepare: 15, status: true },
    ];

    async delete(id: number): Promise<boolean> {
        const query = { id: (id) };
        try {
            await this.repository.delete(id);
            return true;
        } catch (error) {
            throw new Error(`Não foi possivel deletar o produto: ` + id);
        }
        return false;
    }
    async update(id: number, product: ProductEntity): Promise<ProductEntity> {
        const productBd = await this.repository.findOneBy({ id: id });

        productBd!.name = product.name;
        productBd!.category = product.category;
        productBd!.options = product.options;
        productBd!.price = product.price;
        productBd!.status = product.status;
        productBd!.timeToPrepare = product.timeToPrepare;

        await this.repository.save(productBd!);
        return productBd!;
    }

    async getOne(id: number): Promise<ProductEntity> {
        const produto = await this.repository.findOneBy({ id });
        if (!produto) {
            throw new Error(`Produto with id ${id} not found`);
        }
        return produto;
    }

    async getAll(): Promise<ProductEntity[]> {
        const products = await this.repository.find();
        if (products.length == 0) {
            await this.repository.save(this.produtos);
        }
        return await this.repository.find();
    }

    async create(productBody: ProductEntity): Promise<ProductEntity> {
        if (!productBody) {
            throw new Error(`Produto have not been added`);
        }
        await this.repository.save(productBody);
        return productBody;
    }

}