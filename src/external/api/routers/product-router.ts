import express, { Router } from "express";
import { ProductController } from "../../../operation/controllers/product-controller";
import { UnitOfWork } from "../../data-sources/unit-of-work";
import { AppDataSource } from "../../data-sources/postgresql/db-connect";

export const productRouter = Router();
const unitOfWork = new UnitOfWork(AppDataSource);

productRouter.use(express.json());
productRouter.get('/categoria/:categoria', async (req, res) => {
    /*  #swagger.tags = ['Product']
        #swagger.summary = 'GetCategoria'
        #swagger.description = 'Endpoint to get the list of specific product on category. Ex: Lanche, Combo, Sobremesa, Bebida*/

    const categoria = req.params.categoria;
    const produto = await ProductController.getProductByCategory(categoria, unitOfWork.productRepository);
    res.status(200).json(produto);

});

productRouter.get('/:id', async (req, res) => {
    /*  #swagger.tags = ['Product']
        #swagger.summary = 'GetID'
            #swagger.description = 'Endpoint to get the specific product.' */

    const id = req.params.id;
    const product = await ProductController.getProductById(id, unitOfWork.productRepository);
    res.status(200).json(product);
});

productRouter.post('/', async (req, res) => {
    /*  #swagger.tags = ['Product']
            #swagger.description = 'Endpoint to add a product' 
            #swagger.summary = 'Create'*/
    /*#swagger.requestBody = {
    required: true,
    content: {
        "application/json": {
            schema: {
                $ref: "#/components/schemas/product"
            }  
        }
    }
} 
*/
    const newProduct = req.body;
    const product = await ProductController.createProduct(newProduct, unitOfWork.productRepository);
    res.status(200).json(product);
});
productRouter.delete('/:id', async (req, res) => {
    /*  #swagger.tags = ['Product']
        #swagger.summary = 'Delete'
        #swagger.description = 'Endpoint to delete a product' */
    const id = req.params.id;
    const product = await ProductController.deleteProductById(id, unitOfWork.productRepository, unitOfWork.cartRepository);
    if (product) {
        res.status(200).json("Produto deletado com sucesso");
    }
    else {
        res.status(500).json("O produto está em um pedido ativo e não pode ser deletado")
    }
});

productRouter.post('/:id', async (req, res) => {
    /*  #swagger.tags = ['Product']
        #swagger.summary = 'Update'
        #swagger.description = 'Endpoint to update a product' */

    /*#swagger.requestBody = {
   required: true,
   content: {
       "application/json": {
           schema: {
               $ref: "#/components/schemas/product"
           }  
       }
   }
} 
*/
    const id = req.params.id;
    const newProduct = req.body;
    const product = await ProductController.updateProductById(id, newProduct, unitOfWork.productRepository);
    res.status(200).json(product);
});


productRouter.post('/deactive/:id', async (req, res) => {
    /*  #swagger.tags = ['Product']
        #swagger.summary = 'Deactive'
        #swagger.description = 'Endpoint to deactive a product' */
    const id = req.params.id;
    const product = await ProductController.deactivateProductById(id, unitOfWork.productRepository, unitOfWork.cartRepository);
    if (product) {
        res.status(200).json("Produto desativado com sucesso");
    }
    else {
        res.status(500).json("O produto está em um pedido ativo e não pode ser desativado")
    }
});

productRouter.get('/', async (req, res) => {
    /*  #swagger.tags = ['Product']
       #swagger.summary = 'GetAll'
       #swagger.description = 'Endpoint to get  all products' */
    const product = await ProductController.getAllProducts(unitOfWork.productRepository);
    res.status(200).json(product);
});


