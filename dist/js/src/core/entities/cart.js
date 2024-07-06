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
exports.CartEntity = void 0;
const typeorm_1 = require("typeorm");
const cart_item_1 = require("./cart-item");
const user_1 = require("./user");
let CartEntity = class CartEntity {
    constructor(id, user, itensCart, totalValue, status, payment) {
        this.id = id;
        this.user = user;
        this.itensCart = itensCart;
        this.totalValue = totalValue;
        this.status = status;
        this.payment = payment;
    }
};
exports.CartEntity = CartEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CartEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_1.UserEntity, (user) => user.id),
    __metadata("design:type", Number)
], CartEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cart_item_1.CartItemEntity, (cartItem) => cartItem.cart),
    __metadata("design:type", Array)
], CartEntity.prototype, "itensCart", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CartEntity.prototype, "totalValue", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CartEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], CartEntity.prototype, "payment", void 0);
exports.CartEntity = CartEntity = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Number, Number, Array, Number, String, Boolean])
], CartEntity);
