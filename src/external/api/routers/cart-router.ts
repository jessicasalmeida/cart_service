import express, { Router } from "express";
import { CartController } from "../../../operation/controllers/cart-controller";
import { UnitOfWork } from "../../data-sources/unit-of-work";
import { AppDataSource } from "../../data-sources/postgresql/db-connect";

export const cartRouter = Router();
const unitOfWork = new UnitOfWork(AppDataSource);
const cartController = new CartController(unitOfWork.cartRepository);

cartRouter.use(express.json());
cartRouter.post('/', async (req, res) => {
    /*  #swagger.tags = ['Cart']
        #swagger.summary = 'Create'
        #swagger.description = 'Endpoint to create a cart' */
    try {
        await unitOfWork.start();
        const cart = await CartController.createCart(unitOfWork.cartRepository, unitOfWork.userRepository);
        await unitOfWork.complete();
        res.status(200).json(cart);
    }
    catch (error) {
        await unitOfWork.rollback();
        res.status(500).send({ message: "Error creating data. " + error })
    }
});

cartRouter.post('/user/:id', async (req, res) => {
    /*  #swagger.tags = ['Cart']
        #swagger.summary = 'Add a User'
        #swagger.description = 'Endpoint to add a user to cart' */
    const idCart = req.params.id;
    const idUser = req.query.user as string;
    try {
        await unitOfWork.start();
        const cart = await CartController.addUser(idCart, idUser, unitOfWork.cartRepository, unitOfWork.userRepository);
        await unitOfWork.complete();
        res.status(200).json(cart);
    }
    catch (error) {
        await unitOfWork.rollback();
        res.status(500).send({ message: "Error updating data. " + error })
    }
});

cartRouter.post('/product/:id', async (req, res) => {
    try {
        await unitOfWork.start();
        /*  #swagger.tags = ['Cart']
            #swagger.summary = 'Add a Product'
            #swagger.description = 'Endpoint to add a product to cart' */
        const idCart = req.params.id;
        const idProduct = req.query.product as string;
        const cart = await CartController.addProduct(idCart, idProduct, unitOfWork.cartRepository, unitOfWork.productRepository, unitOfWork.cartItemRepository);
        await unitOfWork.complete();
        res.status(200).json(cart);
    }
    catch (error) {
        await unitOfWork.rollback();
        res.status(500).send({ message: "Error updating data. " + error })
    }

});

cartRouter.post('/itens/:id', async (req, res) => {
    /*  #swagger.tags = ['Cart']
        #swagger.summary = 'Personalize itens'
        #swagger.description = 'Endpoint to personalize product itens' */
    const id = req.params.id;
    const product = req.query.product as string
    const options = req.query.options as string;
    try {
        await unitOfWork.start();
        const cart = await CartController.personalizeItens(id, product, options, unitOfWork.cartRepository, unitOfWork.productRepository, unitOfWork.cartItemRepository);
        await unitOfWork.complete();
        res.status(200).json(cart);
    }
    catch (error) {
        await unitOfWork.rollback();
        res.status(500).send({ message: "Error updating data. " + error })
    }
});

cartRouter.get('/:id', async (req, res) => {
    /*  #swagger.tags = ['Cart']
        #swagger.summary = 'Resume'
        #swagger.description = 'Endpoint to resume a cart' */
    const id = req.params.id;
    const cart = await CartController.resumeCart(id, unitOfWork.cartRepository, unitOfWork.cartItemRepository, unitOfWork.productRepository);
    res.status(200).json(cart);

});



cartRouter.post('/pay/:id', async (req, res) => {
    /*  #swagger.tags = ['Cart']
        #swagger.summary = 'Pay'
        #swagger.description = 'Endpoint to pay a cart' */
    const id = req.params.id;
    try {
        await unitOfWork.start();
        const cart = await CartController.payCart(id, unitOfWork.cartRepository);
        await unitOfWork.complete();
        res.status(200).json(cart);
    }
    catch (error) {
        await unitOfWork.rollback();
        res.status(500).send({ message: "Error updating data. " + error })
    }
});


cartRouter.post('/kitchen/:id', async (req, res) => {
    /*  #swagger.tags = ['Cart']
        #swagger.summary = 'Pay'
        #swagger.description = 'Endpoint to pay a cart' */
    const id = req.params.id;
    try {
        await unitOfWork.start();
        const cartSended = await CartController.sendToKitchen(id, unitOfWork.cartRepository, unitOfWork.cartItemRepository, unitOfWork.productRepository);
        await unitOfWork.complete();
        if (cartSended) {
            res.status(200).json("Pedido enviado a cozinha");
        }
        else {
            res.status(500).json("Pedido aguardando pagamento. Por favor realize o pagamento para prosseguir");
        }
    }
    catch (error) {
        await unitOfWork.rollback();
        res.status(500).send({ message: "Error updating data. " + error })
    }
});

cartRouter.post('/close/:id', async (req, res) => {
    /*  #swagger.tags = ['Cart']
        #swagger.summary = 'Close'
        #swagger.description = 'Endpoint to pay a cart' */
    const id = req.params.id;
    try {
        await unitOfWork.start();
        const cart = await CartController.closeCart(id, unitOfWork.cartRepository);
        await unitOfWork.complete();
        res.status(200).json(cart);
    }
    catch (error) {
        await unitOfWork.rollback();
        res.status(500).send({ message: "Error updating data. " + error })
    }
});


cartRouter.post('/cancel/:id', async (req, res) => {
    /*  #swagger.tags = ['Cart']
        #swagger.summary = 'Cancel'
        #swagger.description = 'Endpoint to cancel a cart' */
    const id = req.params.id;
    try {
        await unitOfWork.start();
        const cart = await CartController.cancelCart(id, unitOfWork.cartRepository);
        await unitOfWork.complete();
        res.status(200).json(cart);
    } 
    catch (error) {
        await unitOfWork.rollback();
        res.status(500).send({ message: "Error updating data. " + error })
    }
});
