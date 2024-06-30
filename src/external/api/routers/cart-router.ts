import express, { Router } from "express";
import { ProductRepositoryMongoBd } from "../../data-sources/mongodb/product-repository-mongo-bd";
import { CartRepositoryMongoBd } from "../../data-sources/mongodb/cart-repository-mongo-bd";
import { userRepositoryMongoBd } from "../../data-sources/mongodb/user-repository-mongo-bd";
import { CartController } from "../../../operation/controllers/cart-controller";
import { UnitOfWork } from "../../data-sources/unit-of-work";
import { AppDataSource } from "../../data-sources/postgresql/db-connect";

export const cartRouter = Router();
const unitOfWork = new UnitOfWork(AppDataSource);

cartRouter.use(express.json());
cartRouter.post('/', async (req, res) => {
    /*  #swagger.tags = ['Cart']
        #swagger.summary = 'Create'
        #swagger.description = 'Endpoint to create a cart' */
    const cart = await CartController.createCart(unitOfWork.cartRepository);
    res.status(200).json(cart);
});

cartRouter.post('/user/:id', async (req, res) => {
    /*  #swagger.tags = ['Cart']
        #swagger.summary = 'Add a User'
        #swagger.description = 'Endpoint to add a user to cart' */
    const idCart = req.params.id;
    const idUser = req.query.user as string;
    const cart = await CartController.addUser(idCart, idUser, unitOfWork.cartRepository, unitOfWork.userRepository);
    res.status(200).json(cart);
});

cartRouter.post('/product/:id', async (req, res) => {
    /*  #swagger.tags = ['Cart']
        #swagger.summary = 'Add a Product'
        #swagger.description = 'Endpoint to add a product to cart' */
    const idCart = req.params.id;
    const idProduct = req.query.product as string;
    const cart = await CartController.addProduct(idCart, idProduct, unitOfWork.cartRepository, unitOfWork.productRepository);
    res.status(200).json(cart);
});

cartRouter.post('/itens/:id', async (req, res) => {
    /*  #swagger.tags = ['Cart']
        #swagger.summary = 'Personalize itens'
        #swagger.description = 'Endpoint to personalize product itens' */
    const id = req.params.id;
    const product = req.query.product as string
    const options = req.query.options as Array<string>;
    const cart = await CartController.personalizeItens(id, product, options, unitOfWork.cartRepository);
    res.status(200).json(cart);
});

cartRouter.get('/:id', async (req, res) => {
    /*  #swagger.tags = ['Cart']
        #swagger.summary = 'Resume'
        #swagger.description = 'Endpoint to resume a cart' */
    const id = req.params.id;
    const cart = await CartController.resumeCart(id, unitOfWork.cartRepository);
    res.status(200).json(cart);
});

cartRouter.post('/close/:id', async (req, res) => {
    /*  #swagger.tags = ['Cart']
        #swagger.summary = 'Close'
        #swagger.description = 'Endpoint to close a cart' */
    const id = req.params.id;
    const cart = await CartController.closeCart(id, unitOfWork.cartRepository);
    res.status(200).json(cart);
});

cartRouter.post('/pay/:id', async (req, res) => {
    /*  #swagger.tags = ['Cart']
        #swagger.summary = 'Pay'
        #swagger.description = 'Endpoint to pay a cart' */
    const id = req.params.id;
    const cart = await CartController.payCart(id, unitOfWork.cartRepository);
    res.status(200).json(cart);
});

cartRouter.post('/kitchen/:id', async (req, res) => {
    /*  #swagger.tags = ['Cart']
        #swagger.summary = 'Send to Kitchen'
        #swagger.description = 'Endpoint to send to kitchen a cart' */
    const id = req.params.id;
    const cartSended = await CartController.sendToKitchen(id, unitOfWork.cartRepository);
    if (cartSended) {
        res.status(200).json("Pedido enviado a cozinha");
    }
    else {
        res.status(500).json("Pedido aguardando pagamento. Por favor realize o pagamento para prosseguir");
    }
});

cartRouter.post('/cancel/:id', async (req, res) => {
    /*  #swagger.tags = ['Cart']
        #swagger.summary = 'Cancel'
        #swagger.description = 'Endpoint to cancel a cart' */
    const id = req.params.id;
    const cart = await CartController.cancelCart(id, unitOfWork.cartRepository);
    res.status(200).json(cart);
});