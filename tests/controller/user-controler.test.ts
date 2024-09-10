import UserDataSource from '../../src/common/interfaces/user-data-source';
import { UserEntity } from '../../src/core/entities/user';
import { UserUseCase } from '../../src/core/usercases/user-use-case';
import { UserGateway } from '../../src/operation/gateways/user';
import { userController } from '../../src/operation/controllers/user-controller';
import { UserPresenter } from '../../src/operation/presenters/user';
import { NewUserDTO, UserDTO } from '../../src/common/dtos/user.dto';


jest.mock('../../src/core/usercases/user-use-case');
jest.mock('../../src/operation/gateways/user');
jest.mock('../../src/operation/presenters/user');

describe('userController', () => {
    const mockUserUseCase = UserUseCase as jest.Mocked<typeof UserUseCase>;
    const mockUserGateway = UserGateway as jest.MockedClass<typeof UserGateway>;
    const mockUserPresenter = UserPresenter as jest.Mocked<typeof UserPresenter>;

    const userDataSource: UserDataSource = {} as UserDataSource;

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getUserById', () => {
        it('should get a user by id', async () => {
            const user = { id: '1', cpf: 'User 1', name: "nome", email: "email" } as UserDTO;
            mockUserUseCase.executeGetOne.mockResolvedValue(user);

            const result = await userController.getUserById('1', userDataSource);

            expect(mockUserUseCase.executeGetOne).toHaveBeenCalledWith('1', expect.any(UserGateway));
            expect(result).toEqual(user);
        });

        it('should return null if user is not found', async () => {
            mockUserUseCase.executeGetOne.mockResolvedValue(null);

            const result = await userController.getUserById('1', userDataSource);

            expect(result).toBeNull();
        });
    });

    describe('createUser', () => {
        it('should create a user', async () => {
            const newUserDTO = { cpf: 'User 1', name: "nome", email: "email" } as NewUserDTO;
            const userEntity = { id: 1, cpf: 'User 1', name: "nome", email: "email" } as UserEntity;
            const userDTO = { id: "1", cpf: 'User 1', name: "nome", email: "email" } as UserDTO;
            mockUserUseCase.executeCreate.mockResolvedValue(userDTO);
            mockUserPresenter.toDTO.mockReturnValue(userDTO);
            const result = await userController.createUser(newUserDTO, userDataSource);

            expect(result).toEqual(userDTO);
        });

        it('should return null if user creation fails', async () => {
            const newUserDTO = { name: 'New User', cpf: '12345678900', email: 'newuser@example.com' } as NewUserDTO;
            mockUserUseCase.executeCreate.mockResolvedValue(null);

            const result = await userController.createUser(newUserDTO, userDataSource);

            expect(result).toBeNull();
        });
    });
});
