"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const product_router_1 = require("./product-router");
const user_router_1 = require("./user-router");
const cart_router_1 = require("./cart-router");
const express_1 = __importDefault(require("express"));
exports.routes = express_1.default.Router();
exports.routes.use("/product", product_router_1.productRouter);
exports.routes.use("/user", user_router_1.userRouter);
exports.routes.use("/cart", cart_router_1.cartRouter);
