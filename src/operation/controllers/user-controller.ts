import { NewUserDTO, UserDTO } from '../../common/dtos/user.dto';
import UserDataSource from '../../common/interfaces/user-data-source';
import { UserGateway } from '../gateways/user';
import { UserPresenter } from '../presenters/user';
import { UserUseCase } from '../../core/usercases/user-use-case';
import { UserEntity } from '../../core/entities/user';

export class userController {

  constructor(private readonly userUseCase: UserUseCase) { }

  static async getUserById(id: string, userDataSource: UserDataSource): Promise<UserDTO | null> {

    const userGateway = new UserGateway(userDataSource);
    if (!userGateway) {
      throw new Error("Gateway inválido");
    }
    const user = await UserUseCase.executeGetOne(id, userGateway);

    if (!user) {
      return null;
    }
    return user;
  }
  static async createUser(newUserDTO: NewUserDTO, userDataSource: UserDataSource): Promise<UserDTO | null> {

    const userGateway = new UserGateway(userDataSource);
    if (!userGateway) {
      throw new Error("Gateway inválido");
    }
    const user = await UserUseCase.executeCreate(newUserDTO.name, newUserDTO.cpf, newUserDTO.email, userGateway) as unknown as UserEntity;
    if (!user) {
      return null;
    }
    return UserPresenter.toDTO(user);
  }
}
