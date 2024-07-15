import { CartDataSource } from '../../src/common/interfaces/cart-data-source';
import { CartItemDataSource } from '../../src/common/interfaces/cart-item-data-source';
import ProductDataSource from '../../src/common/interfaces/product-data-source';
import UserDataSource from '../../src/common/interfaces/user-data-source';
import { CartUseCase } from '../../src/core/usercases/cart-use-case';
import { CartGateway } from '../../src/operation/gateways/cart';
import { CartItemGateway } from '../../src/operation/gateways/cartitem';
import { ProductGateway } from '../../src/operation/gateways/product';
import { UserGateway } from '../../src/operation/gateways/user';
import { CartController } from '../../src/operation/controllers/cart-controller';
import { CartDTO, CartItensDTO } from '../../src/common/dtos/cart.dto';
import { UserDTO } from '../../src/common/dtos/user.dto';

jest.mock('../../src/core/usercases/cart-use-case');
jest.mock('../../src/operation/gateways/cart');
jest.mock('../../src/operation/gateways/user');
jest.mock('../../src/operation/gateways/product');
jest.mock('../../src/operation/gateways/cartitem');

describe('CartController', () => {
    const mockCartUseCase = CartUseCase as jest.Mocked<typeof CartUseCase>;
    const mockCartGateway = CartGateway as jest.MockedClass<typeof CartGateway>;
    const mockUserGateway = UserGateway as jest.MockedClass<typeof UserGateway>;
    const mockProductGateway = ProductGateway as jest.MockedClass<typeof ProductGateway>;
    const mockCartItemGateway = CartItemGateway as jest.MockedClass<typeof CartItemGateway>;

    const cartDataSource: CartDataSource = {} as CartDataSource;
    const userDataSource: UserDataSource = {} as UserDataSource;
    const productDataSource: ProductDataSource = {} as ProductDataSource;
    const cartItemDataSource: CartItemDataSource = {} as CartItemDataSource;

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createCart', () => {
        it('should create a cart', async () => {
            const cart = { id: '1', userId: '1', items: [] };
            mockCartUseCase.createCart.mockResolvedValue(cart as any);

            const result = await CartController.createCart(cartDataSource, userDataSource);

            expect(mockCartUseCase.createCart).toHaveBeenCalledTimes(1);
            expect(result).toEqual(cart);
        });

        it('should return null if cart creation fails', async () => {
            mockCartUseCase.createCart.mockResolvedValue(null);

            const result = await CartController.createCart(cartDataSource, userDataSource);

            expect(result).toBeNull();
        });
    });

    describe('addUser', () => {
        it('should add a user to the cart', async () => {
            const user = { id: '1', cpf: 'User 1', name: "nome", email: "email" } as UserDTO;
            const cart = { id: '1', user: user, totalValue: 0, status: "NEW", payment: true, estimatedTime: 0 } as CartDTO;

            mockCartUseCase.addUser.mockResolvedValue(cart);

            const result = await CartController.addUser('1', '1', cartDataSource, userDataSource);

            expect(mockCartUseCase.addUser).toHaveBeenCalledTimes(1);
            expect(result).toEqual(cart);
        });

        it('should return null if adding user fails', async () => {

            mockCartUseCase.addUser.mockResolvedValue(null);

            const result = await CartController.addUser('1', '1', cartDataSource, userDataSource);

            expect(result).toBeNull();
        });
    });

    describe('addProduct', () => {
        it('should add a product to the cart', async () => {
            const user = { id: '1', cpf: 'User 1', name: "nome", email: "email" } as UserDTO;
            const cart = { id: '1', user: user, totalValue: 0, status: "NEW", payment: true, estimatedTime: 0 } as CartDTO;

            mockCartUseCase.addProduct.mockResolvedValue(cart);

            const result = await CartController.addProduct('1', '1', cartDataSource, productDataSource, cartItemDataSource);

            expect(mockCartUseCase.addProduct).toHaveBeenCalledTimes(1);
            expect(result).toEqual(cart);
        });

        it('should return null if adding product fails', async () => {
            mockCartUseCase.addProduct.mockResolvedValue(null);

            const result = await CartController.addProduct('1', '1', cartDataSource, productDataSource, cartItemDataSource);

            expect(result).toBeNull();
        });
    });

    describe('personalizeItens', () => {
        it('should personalize item in the cart', async () => {
            const user = { id: '1', cpf: 'User 1', name: "nome", email: "email" } as UserDTO;
            const cart = { id: '1', user: user, totalValue: 0, status: "NEW", payment: true, estimatedTime: 0 } as CartDTO;

            mockCartUseCase.personalizeItem.mockResolvedValue(cart as any);

            const result = await CartController.personalizeItens('1', '1', 'options', cartDataSource, productDataSource, cartItemDataSource);

            expect(mockCartUseCase.personalizeItem).toHaveBeenCalledTimes(1);
            expect(result).toEqual(cart);
        });

        it('should return null if personalization fails', async () => {
            mockCartUseCase.personalizeItem.mockResolvedValue(null);

            const result = await CartController.personalizeItens('1', '1', 'options', cartDataSource, productDataSource, cartItemDataSource);

            expect(result).toBeNull();
        });
    });

    describe('resumeCart', () => {
        it('should resume the cart', async () => {
            const user = { id: '1', cpf: 'User 1', name: "nome", email: "email" } as UserDTO;
            const cartItensDTO = { id: '1', user: user, totalValue: 0, status: "NEW", payment: true, estimatedTime: 0, cartItens: {} } as CartItensDTO;

            mockCartUseCase.resumeCart.mockResolvedValue(cartItensDTO);

            const result = await CartController.resumeCart('1', cartDataSource, cartItemDataSource, productDataSource);

            expect(mockCartUseCase.resumeCart).toHaveBeenCalledTimes(1);
            expect(result).toEqual(cartItensDTO);
        });

        it('should return null if resume fails', async () => {
            mockCartUseCase.resumeCart.mockResolvedValue(null);

            const result = await CartController.resumeCart('1', cartDataSource, cartItemDataSource, productDataSource);

            expect(result).toBeNull();
        });
    });

    describe('closeCart', () => {
        it('should close the cart', async () => {
            const user = { id: '1', cpf: 'User 1', name: "nome", email: "email" } as UserDTO;
            const cart = { id: '1', user: user, totalValue: 0, status: "NEW", payment: true, estimatedTime: 0 } as CartDTO;
            mockCartUseCase.closeCart.mockResolvedValue(cart);

            const result = await CartController.closeCart('1', cartDataSource);

            expect(mockCartUseCase.closeCart).toHaveBeenCalledTimes(1);
            expect(result).toEqual(cart);
        });

        it('should return null if closing fails', async () => {
            mockCartUseCase.closeCart.mockResolvedValue(null);

            const result = await CartController.closeCart('1', cartDataSource);

            expect(result).toBeNull();
        });
    });

    describe('payCart', () => {
        it('should pay the cart', async () => {
            const user = { id: '1', cpf: 'User 1', name: "nome", email: "email" } as UserDTO;
            const cart = { id: '1', user: user, totalValue: 0, status: "NEW", payment: true, estimatedTime: 0 } as CartDTO;
            mockCartUseCase.payCart.mockResolvedValue(cart);

            const result = await CartController.payCart('1', cartDataSource);

            expect(mockCartUseCase.payCart).toHaveBeenCalledTimes(1);
            expect(result).toEqual(cart);
        });

        it('should return null if payment fails', async () => {
            mockCartUseCase.payCart.mockResolvedValue(null);

            const result = await CartController.payCart('1', cartDataSource);

            expect(result).toBeNull();
        });
    });

    describe('sendToKitchen', () => {
        it('should send the order to the kitchen', async () => {
            const cartItens = { id: '1', items: [] };
            const orderDTO = {"cart": {"id": "1", "items": []}, "id": "1", "status": "RECEIVED"};
            mockCartUseCase.sendToKitchen.mockResolvedValue(true);
            mockCartUseCase.resumeCart.mockResolvedValue(cartItens as any);
            global.fetch = jest.fn().mockResolvedValue({
                body: JSON.stringify(orderDTO)
            } as any);
            const result = await CartController.sendToKitchen('1', cartDataSource, cartItemDataSource, productDataSource);
            expect(mockCartUseCase.sendToKitchen).toHaveBeenCalledTimes(1);
        });

        it('should return false if sending to kitchen fails', async () => {
            mockCartUseCase.sendToKitchen.mockResolvedValue(false);

            const result = await CartController.sendToKitchen('1', cartDataSource, cartItemDataSource, productDataSource);

            expect(result).toBe(false);
        });
    });

    describe('cancelCart', () => {
        it('should cancel the cart', async () => {
            const user = { id: '1', cpf: 'User 1', name: "nome", email: "email" } as UserDTO;
            const cart = { id: '1', user: user, totalValue: 0, status: "NEW", payment: true, estimatedTime: 0 } as CartDTO;
            
            mockCartUseCase.cancelCart.mockResolvedValue(cart);

            const result = await CartController.cancelCart('1', cartDataSource);

            expect(mockCartUseCase.cancelCart).toHaveBeenCalledTimes(1);
            expect(result).toEqual(cart);
        });

        it('should return null if cancelling fails', async () => {
            mockCartUseCase.cancelCart.mockResolvedValue(null);

            const result = await CartController.cancelCart('1', cartDataSource);

            expect(result).toBeNull();
        });
    });
});
