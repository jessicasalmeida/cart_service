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
exports.OrderRepositoryMongoBd = void 0;
const db_connect_1 = require("./db-connect");
class OrderRepositoryMongoBd {
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield ((_a = db_connect_1.collections.orders) === null || _a === void 0 ? void 0 : _a.insertOne(order));
            return order;
        });
    }
    update(id, order) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = { id: (id) };
            yield ((_a = db_connect_1.collections.orders) === null || _a === void 0 ? void 0 : _a.updateOne(query, { $set: order }));
            return order;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return yield ((_a = db_connect_1.collections.orders) === null || _a === void 0 ? void 0 : _a.find({}).toArray());
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = { id: (id) };
            const order = yield ((_a = db_connect_1.collections.orders) === null || _a === void 0 ? void 0 : _a.findOne(query));
            if (!order) {
                throw new Error(`Order with id ${id} not found`);
            }
            return order;
        });
    }
}
exports.OrderRepositoryMongoBd = OrderRepositoryMongoBd;
