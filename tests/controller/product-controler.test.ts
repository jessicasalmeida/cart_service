import { CartDataSource } from '../../src/common/interfaces/cart-data-source';
import { CartItemDataSource } from '../../src/common/interfaces/cart-item-data-source';
import ProductDataSource from '../../src/common/interfaces/product-data-source';
import { ProductUseCase } from '../../src/core/usercases/product-use-case';
import { CartGateway } from '../../src/operation/gateways/cart';
import { CartItemGateway } from '../../src/operation/gateways/cartitem';
import { ProductGateway } from '../../src/operation/gateways/product';
import { ProductController } from '../../src/operation/controllers/product-controller';
import { ProductEntity } from '../../src/core/entities/product';
import { NewProductDTO, ProductDTO } from '../../src/common/dtos/product.dto';
import { ProductPresenter } from '../../src/operation/presenters/product';

jest.mock('../../src/core/usercases/product-use-case');
jest.mock('../../src/operation/gateways/product');
jest.mock('../../src/operation/presenters/product');
jest.mock('../../src/operation/gateways/cart');
jest.mock('../../src/operation/gateways/cartitem');

describe('ProductController', () => {
    const mockProductUseCase = ProductUseCase as jest.Mocked<typeof ProductUseCase>;
    const mockProductGateway = ProductGateway as jest.MockedClass<typeof ProductGateway>;
    const mockCartGateway = CartGateway as jest.MockedClass<typeof CartGateway>;
    const mockCartItemGateway = CartItemGateway as jest.MockedClass<typeof CartItemGateway>;
    const mockProductPresenter = ProductPresenter as jest.Mocked<typeof ProductPresenter>;

    const productDataSource: ProductDataSource = {} as ProductDataSource;
    const cartDataSource: CartDataSource = {} as CartDataSource;
    const cartItemDataSource: CartItemDataSource = {} as CartItemDataSource;

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getProductById', () => {
        it('should get a product by id', async () => {
            const product =  { id: "0", name: "Big Mac", options: "['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles']", category: "lanche", price: 10, timeToPrepare: 15, status: true } as ProductDTO;
            mockProductUseCase.findProductById.mockResolvedValue(product);
            const result = await ProductController.getProductById('1', productDataSource);
            expect(mockProductUseCase.findProductById).toHaveBeenCalledWith(1, expect.any(ProductGateway));
            expect(result).toEqual(product);
        });

        it('should return null if product is not found', async () => {
            mockProductUseCase.findProductById.mockResolvedValue(null);

            const result = await ProductController.getProductById('1', productDataSource);

            expect(result).toBeNull();
        });
    });

    describe('getProductByCategory', () => {
        it('should get a product by category', async () => {
            const product =  [{ id: "0", name: "Big Mac", options: "['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles']", category: "lanche", price: 10, timeToPrepare: 15, status: true }] as ProductDTO[];
            mockProductUseCase.findProductByCategory.mockResolvedValue(product);

            const result = await ProductController.getProductByCategory('Category 1', productDataSource);

            expect(mockProductUseCase.findProductByCategory).toHaveBeenCalledWith('Category 1', expect.any(ProductGateway));
            expect(result).toEqual(product);
        });

        it('should return null if product is not found', async () => {
            mockProductUseCase.findProductByCategory.mockResolvedValue(null);

            const result = await ProductController.getProductByCategory('Category 1', productDataSource);

            expect(result).toBeNull();
        });
    });

    describe('createProduct', () => {
        it('should create a product', async () => {
            const newProductDTO = { name: 'New Product' } as NewProductDTO;
            const productEntity = { id: 0, name: "Big Mac", options: "['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles']", category: "lanche", price: 10, timeToPrepare: 15, status: true } as ProductEntity;
            const product =  { id: "0", name: "Big Mac", options: "['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles']", category: "lanche", price: 10, timeToPrepare: 15, status: true } as ProductDTO;
            mockProductUseCase.createProduct.mockResolvedValue(product);
            mockProductPresenter.toDTO.mockReturnValue(product);

            const result = await ProductController.createProduct(newProductDTO, productDataSource);

            expect(mockProductUseCase.createProduct).toHaveBeenCalledWith(newProductDTO, expect.any(ProductGateway));
            expect(result).toEqual(product);
        });

        it('should return null if product creation fails', async () => {
            const newProductDTO = { name: 'New Product' } as NewProductDTO;
            mockProductUseCase.createProduct.mockResolvedValue(null);

            const result = await ProductController.createProduct(newProductDTO, productDataSource);

            expect(result).toBeNull();
        });
    });

    describe('deleteProductById', () => {
        it('should delete a product by id', async () => {
            const id = '1';
            mockProductUseCase.deleteProduct.mockResolvedValue(true);

            const result = await ProductController.deleteProductById(id, productDataSource, cartDataSource, cartItemDataSource);

            expect(mockProductUseCase.deleteProduct).toHaveBeenCalledWith(Number(id), expect.any(ProductGateway), expect.any(CartGateway), expect.any(CartItemGateway));
            expect(result).toBe(true);
        });

        it('should return false if deletion fails', async () => {
            const id = '1';
            mockProductUseCase.deleteProduct.mockResolvedValue(false);

            const result = await ProductController.deleteProductById(id, productDataSource, cartDataSource, cartItemDataSource);

            expect(result).toBe(false);
        });
    });

    describe('updateProductById', () => {
        it('should update a product by id', async () => {
            const id = '1';
            const newProductDTO = { name: 'Updated Product' } as NewProductDTO;
            const product =  { id: "0", name: "Big Mac", options: "['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles']", category: "lanche", price: 10, timeToPrepare: 15, status: true } as ProductDTO;
            mockProductUseCase.updateProduct.mockResolvedValue(product);

            const result = await ProductController.updateProductById(id, newProductDTO, productDataSource);

            expect(mockProductUseCase.updateProduct).toHaveBeenCalledWith(Number(id), newProductDTO, expect.any(ProductGateway));
            expect(result).toEqual(product);
        });

        it('should return null if update fails', async () => {
            const id = '1';
            const newProductDTO = { name: 'Updated Product' } as NewProductDTO;
            mockProductUseCase.updateProduct.mockResolvedValue(null);

            const result = await ProductController.updateProductById(id, newProductDTO, productDataSource);

            expect(result).toBeNull();
        });
    });

    describe('deactivateProductById', () => {
        it('should deactivate a product by id', async () => {
            const id = '1';
            mockProductUseCase.deactivateProduct.mockResolvedValue(true);

            const result = await ProductController.deactivateProductById(id, productDataSource, cartDataSource, cartItemDataSource);

            expect(mockProductUseCase.deactivateProduct).toHaveBeenCalledWith(Number(id), expect.any(ProductGateway), expect.any(CartGateway), expect.any(CartItemGateway));
            expect(result).toBe(true);
        });

        it('should return false if deactivation fails', async () => {
            const id = '1';
            mockProductUseCase.deactivateProduct.mockResolvedValue(false);

            const result = await ProductController.deactivateProductById(id, productDataSource, cartDataSource, cartItemDataSource);

            expect(result).toBe(false);
        });
    });


    describe('getAllProducts', () => {
        it('should get all products', async () => {
            const products = [{ id: 1, name: 'Product 1' }] as ProductEntity[];
            const productDTOs =  [{ id: "0", name: "Big Mac", options: "['Pão Gergelim', 'Hamburguer', 'Queijo Cheddar', 'Alface Americana', 'Molho Especial', 'Cebola', 'Picles']", category: "lanche", price: 10, timeToPrepare: 15, status: true }] as ProductDTO[];
            mockProductUseCase.getAllProducts.mockResolvedValue(productDTOs);
            mockProductPresenter.toDTO.mockReturnValue(productDTOs[0]);

            const result = await ProductController.getAllProducts(productDataSource);

            expect(mockProductUseCase.getAllProducts).toHaveBeenCalledWith(expect.any(ProductGateway));
            expect(mockProductPresenter.toDTO).toHaveBeenCalledTimes(products.length);
            expect(result).toEqual(productDTOs);
        });

        it('should return null if no products found', async () => {
            mockProductUseCase.getAllProducts.mockResolvedValue([]);

            const result = await ProductController.getAllProducts(productDataSource);

            expect(result).toEqual([]);
        });
    });
});
