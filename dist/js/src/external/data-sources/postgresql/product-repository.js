"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const product_1 = require("../../../core/entities/product");
const db_connect_1 = require("./db-connect");
class ProductRepository {
    constructor(manager) {
        this.produtos = [
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
        this.repository = db_connect_1.AppDataSource.getRepository(product_1.ProductEntity);
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { id: (id) };
            try {
                yield this.repository.delete(id);
                return true;
            }
            catch (error) {
                throw new Error(`Não foi possivel deletar o produto: ` + id);
            }
            return false;
        });
    }
    update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const productBd = yield this.repository.findOneBy({ id: id });
            productBd.name = product.name;
            productBd.category = product.category;
            productBd.options = product.options;
            productBd.price = product.price;
            productBd.status = product.status;
            productBd.timeToPrepare = product.timeToPrepare;
            yield this.repository.save(productBd);
            return productBd;
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const produto = yield this.repository.findOneBy({ id });
            if (!produto) {
                throw new Error(`Produto with id ${id} not found`);
            }
            return produto;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.repository.find();
            if (products.length == 0) {
                yield this.repository.save(this.produtos);
            }
            return yield this.repository.find();
        });
    }
    create(productBody) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!productBody) {
                throw new Error(`Produto have not been added`);
            }
            yield this.repository.save(productBody);
            return productBody;
        });
    }
}
exports.ProductRepository = ProductRepository;
