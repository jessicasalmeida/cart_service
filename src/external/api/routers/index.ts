import { productRouter } from "./product-router";
import { userRouter } from "./user-router";
import { cartRouter } from "./cart-router";
import { orderRouter } from "./order-router";
import express from "express";

export const routes = express.Router();

routes.use("/product", productRouter);
routes.use("/user", userRouter);
routes.use("/cart", cartRouter);
routes.use("/order", orderRouter);