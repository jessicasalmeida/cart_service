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
exports.cartRouter = void 0;
const express_1 = __importStar(require("express"));
const cart_controller_1 = require("../../../operation/controllers/cart-controller");
const unit_of_work_1 = require("../../data-sources/unit-of-work");
const db_connect_1 = require("../../data-sources/postgresql/db-connect");
exports.cartRouter = (0, express_1.Router)();
const unitOfWork = new unit_of_work_1.UnitOfWork(db_connect_1.AppDataSource);
exports.cartRouter.use(express_1.default.json());
exports.cartRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Cart']
        #swagger.summary = 'Create'
        #swagger.description = 'Endpoint to create a cart' */
    const cart = yield cart_controller_1.CartController.createCart(unitOfWork.cartRepository);
    res.status(200).json(cart);
}));
exports.cartRouter.post('/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Cart']
        #swagger.summary = 'Add a User'
        #swagger.description = 'Endpoint to add a user to cart' */
    const idCart = req.params.id;
    const idUser = req.query.user;
    const cart = yield cart_controller_1.CartController.addUser(idCart, idUser, unitOfWork.cartRepository, unitOfWork.userRepository);
    res.status(200).json(cart);
}));
exports.cartRouter.post('/product/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Cart']
        #swagger.summary = 'Add a Product'
        #swagger.description = 'Endpoint to add a product to cart' */
    const idCart = req.params.id;
    const idProduct = req.query.product;
    const cart = yield cart_controller_1.CartController.addProduct(idCart, idProduct, unitOfWork.cartRepository, unitOfWork.productRepository, unitOfWork.cartItemRepository);
    res.status(200).json(cart);
}));
exports.cartRouter.post('/itens/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Cart']
        #swagger.summary = 'Personalize itens'
        #swagger.description = 'Endpoint to personalize product itens' */
    const id = req.params.id;
    const product = req.query.product;
    const options = req.query.options;
    const cart = yield cart_controller_1.CartController.personalizeItens(id, product, options, unitOfWork.cartRepository, unitOfWork.productRepository, unitOfWork.cartItemRepository);
    res.status(200).json(cart);
}));
exports.cartRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Cart']
        #swagger.summary = 'Resume'
        #swagger.description = 'Endpoint to resume a cart' */
    const id = req.params.id;
    const cart = yield cart_controller_1.CartController.resumeCart(id, unitOfWork.cartRepository);
    res.status(200).json(cart);
}));
exports.cartRouter.post('/close/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Cart']
        #swagger.summary = 'Close'
        #swagger.description = 'Endpoint to close a cart' */
    const id = req.params.id;
    const cart = yield cart_controller_1.CartController.closeCart(id, unitOfWork.cartRepository);
    res.status(200).json(cart);
}));
exports.cartRouter.post('/pay/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Cart']
        #swagger.summary = 'Pay'
        #swagger.description = 'Endpoint to pay a cart' */
    const id = req.params.id;
    const cart = yield cart_controller_1.CartController.payCart(id, unitOfWork.cartRepository);
    res.status(200).json(cart);
}));
exports.cartRouter.post('/kitchen/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Cart']
        #swagger.summary = 'Send to Kitchen'
        #swagger.description = 'Endpoint to send to kitchen a cart' */
    const id = req.params.id;
    const cartSended = yield cart_controller_1.CartController.sendToKitchen(id, unitOfWork.cartRepository);
    if (cartSended) {
        res.status(200).json("Pedido enviado a cozinha");
    }
    else {
        res.status(500).json("Pedido aguardando pagamento. Por favor realize o pagamento para prosseguir");
    }
}));
exports.cartRouter.post('/cancel/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['Cart']
        #swagger.summary = 'Cancel'
        #swagger.description = 'Endpoint to cancel a cart' */
    const id = req.params.id;
    const cart = yield cart_controller_1.CartController.cancelCart(id, unitOfWork.cartRepository);
    res.status(200).json(cart);
}));
