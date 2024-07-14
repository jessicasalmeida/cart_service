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
exports.UnitOfWork = void 0;
const user_repository_1 = require("./postgresql/user-repository");
const product_repository_1 = require("./postgresql/product-repository");
const cart_repository_1 = require("./postgresql/cart-repository");
const cart_item_repository_1 = require("./postgresql/cart-item-repository");
class UnitOfWork {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.queryRunner = this.dataSource.createQueryRunner();
        this.productRepository = new product_repository_1.ProductRepository(this.queryRunner.manager);
        this.cartRepository = new cart_repository_1.CartRepository(this.queryRunner.manager);
        this.userRepository = new user_repository_1.UserRepository(this.queryRunner.manager);
        this.cartItemRepository = new cart_item_repository_1.CartItemRepository(this.queryRunner.manager);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.queryRunner.startTransaction();
        });
    }
    complete() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.queryRunner.commitTransaction();
            }
            catch (error) {
                yield this.queryRunner.rollbackTransaction();
                throw error;
            }
            //finally {
            //    await this.queryRunner.release();
            //  }
        });
    }
    rollback() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.queryRunner.rollbackTransaction();
            // await this.queryRunner.release();
        });
    }
}
exports.UnitOfWork = UnitOfWork;
