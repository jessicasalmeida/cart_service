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
exports.ProductRepositoryMongoBd = void 0;
const db_connect_1 = require("./db-connect");
const generators_1 = require("../../../common/helpers/generators");
class ProductRepositoryMongoBd {
    constructor() {
        this.produtos = [
            { id: (0, generators_1.generateRandomString)(), name: "Big Mac", options: ['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles'], category: "lanche", price: 10, timeToPrepare: 15, status: true },
            { id: (0, generators_1.generateRandomString)(), name: "Big Tasty", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Emental', 'Alface Americana', 'Molho Tasty', 'Cebola', 'Tomate'], category: "lanche", price: 10, timeToPrepare: 15, status: true },
            { id: (0, generators_1.generateRandomString)(), name: "Quarteirao", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Ketchup', 'Mostarda', 'Cebola', 'Picles'], category: "lanche", price: 10, timeToPrepare: 15, status: true },
            { id: (0, generators_1.generateRandomString)(), name: "Coca", options: ['Gelo'], category: "bebida", price: 10, timeToPrepare: 5, status: true },
            { id: (0, generators_1.generateRandomString)(), name: "Agua", options: ['Gelo'], category: "bebida", price: 10, timeToPrepare: 5, status: true },
            { id: (0, generators_1.generateRandomString)(), name: "Suco", options: ['Gelo', 'Acucar'], category: "bebida", timeToPrepare: 5, price: 10, status: true },
            { id: (0, generators_1.generateRandomString)(), name: "Pudim", options: [], category: "sobremesa", price: 10, timeToPrepare: 2, status: true },
            { id: (0, generators_1.generateRandomString)(), name: "Torta de Maça", options: [], category: "sobremesa", price: 10, timeToPrepare: 2, status: true },
            { id: (0, generators_1.generateRandomString)(), name: "Sorvete de Baunilha", options: [], category: "sobremesa", price: 10, timeToPrepare: 2, status: true },
            { id: (0, generators_1.generateRandomString)(), name: "Torta de Maça", options: [], category: "sobremesa", price: 10, timeToPrepare: 2, status: true },
            { id: (0, generators_1.generateRandomString)(), name: "Sorvete de Chocolate", options: [], category: "sobremesa", price: 10, timeToPrepare: 2, status: false },
            { id: (0, generators_1.generateRandomString)(), name: "Combo Big Mac + Bebida + Acompanhamento", options: ['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles'], category: "combo", price: 30, timeToPrepare: 15, status: true },
            { id: (0, generators_1.generateRandomString)(), name: "Combo Big Tasty + Bebida + Acompanhamento", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Emental', 'Alface Americana', 'Molho Tasty', 'Cebola', 'Tomate'], category: "combo", price: 30, timeToPrepare: 15, status: true },
            { id: (0, generators_1.generateRandomString)(), name: "Combo Quarteirao+ Bebida + Acompanhamento", options: ['Pão com Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Ketchup', 'Mostarda', 'Cebola', 'Picles'], category: "combo", price: 30, timeToPrepare: 15, status: true },
            { id: (0, generators_1.generateRandomString)(), name: "Batata", options: [], category: "acompanhamento", price: 10, timeToPrepare: 15, status: true },
        ];
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = { id: (id) };
            try {
                yield ((_a = db_connect_1.collections.product) === null || _a === void 0 ? void 0 : _a.deleteOne(query));
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
            var _a;
            const query = { id: (id) };
            yield ((_a = db_connect_1.collections.product) === null || _a === void 0 ? void 0 : _a.updateOne(query, { $set: product }));
            return product;
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = { id: (id) };
            const produto = yield ((_a = db_connect_1.collections.product) === null || _a === void 0 ? void 0 : _a.findOne(query));
            if (!produto) {
                throw new Error(`Produto with id ${id} not found`);
            }
            return produto;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (this.produtos.length > 0) {
                yield ((_a = db_connect_1.collections.product) === null || _a === void 0 ? void 0 : _a.insertMany(this.produtos));
                this.produtos = {};
            }
            return yield ((_b = db_connect_1.collections.product) === null || _b === void 0 ? void 0 : _b.find({}).toArray());
        });
    }
    create(productBody) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!productBody) {
                throw new Error(`Produto have not been added`);
            }
            yield ((_a = db_connect_1.collections.product) === null || _a === void 0 ? void 0 : _a.insertOne(productBody));
            return productBody;
        });
    }
}
exports.ProductRepositoryMongoBd = ProductRepositoryMongoBd;
