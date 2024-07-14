import { UserEntity } from '../../core/entities/user';
import { UserDTO } from '../../common/dtos/user.dto';

export class UserPresenter {
  static toDTO(
    user: UserEntity
  ): UserDTO {
    let dto: UserDTO = {
      id: user.id.toString(),
      name: user.name,
      cpf: user.cpf,
      email: user.email
    };
    return dto;
  }
}
