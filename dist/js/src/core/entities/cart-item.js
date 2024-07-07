"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemEntity = void 0;
const typeorm_1 = require("typeorm");
const product_1 = require("./product");
const cart_1 = require("./cart");
let CartItemEntity = class CartItemEntity {
    constructor(id, options, price, product, cart) {
        this.id = id;
        this.options = options;
        this.price = price;
        this.productId = product;
        this.cartId = cart;
    }
};
exports.CartItemEntity = CartItemEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CartItemEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CartItemEntity.prototype, "options", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CartItemEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_1.ProductEntity, product => product.id, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }),
    (0, typeorm_1.JoinColumn)([{ name: 'product_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Number)
], CartItemEntity.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cart_1.CartEntity, cart => cart.id, { onDelete: 'CASCADE', onUpdate: 'NO ACTION' }),
    (0, typeorm_1.JoinColumn)([{ name: 'cart_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Number)
], CartItemEntity.prototype, "cartId", void 0);
exports.CartItemEntity = CartItemEntity = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Number, String, Number, Number, Number])
], CartItemEntity);
