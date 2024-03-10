"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.orderRouter = void 0;
const express_1 = __importStar(require("express"));
const cart_repository_mongo_bd_1 = require("../../data-sources/mongodb/cart-repository-mongo-bd");
const order_repository_mongo_bd_1 = require("../../data-sources/mongodb/order-repository-mongo-bd");
const order_controller_1 = require("../../../operation/controllers/order-controller");
const cartRepository = new cart_repository_mongo_bd_1.CartRepositoryMongoBd();
const orderRepository = new order_repository_mongo_bd_1.OrderRepositoryMongoBd();
exports.orderRouter = (0, express_1.Router)();
exports.orderRouter.use(express_1.default.json());
exports.orderRouter.post('/receive/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const order = yield order_controller_1.OrderController.receiveOrder(id, orderRepository, cartRepository);
    res.status(200).json(order);
}));
exports.orderRouter.post('/prepare/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const order = yield order_controller_1.OrderController.prepareOrder(id, orderRepository);
    res.status(200).json(order);
}));
exports.orderRouter.get('/estimate/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const order = yield order_controller_1.OrderController.estimateDelivery(id, orderRepository);
    res.status(200).json(order);
}));
exports.orderRouter.post('/update/ready/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const order = yield order_controller_1.OrderController.updateStatusToReady(id, orderRepository);
    res.status(200).json(order);
}));
exports.orderRouter.post('/update/delivered/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const order = yield order_controller_1.OrderController.updateStatusToDelivered(id, orderRepository);
    res.status(200).json(order);
}));
exports.orderRouter.post('/update/closed/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const order = yield order_controller_1.OrderController.updateStatusToClosed(id, orderRepository);
    res.status(200).json(order);
}));
exports.orderRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_controller_1.OrderController.getAllActiveOrders(orderRepository);
    res.status(200).json(order);
}));