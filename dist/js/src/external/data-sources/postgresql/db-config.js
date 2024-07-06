"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../../core/entities/product");
const cart_1 = require("../../../core/entities/cart");
const user_1 = require("../../../core/entities/user");
const config = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'postgres',
    synchronize: true,
    logging: false,
    entities: [product_1.ProductEntity, cart_1.CartEntity, user_1.UserEntity],
    migrations: [],
    subscribers: [],
};
exports.default = config;
