import { UserGateway } from '../../operation/gateways/user';
import { UserEntity } from "../entities/user";
import { generateRandomString } from '../../common/helpers/generators';
import { UserDTO } from '../../common/dtos/user.dto';

export class UserUseCase{

    static executeCreate(name: string, cpf: string, email: string, userGateway: UserGateway) : Promise<UserDTO | null>
    {
        const novoId = 0;
        const newUser = new UserEntity(
            Number(novoId),
            cpf,
            name,
            email
        )
        return userGateway.createUser(newUser);
    }
    
    static async executeGetOne(id: string, userGateway: UserGateway) : Promise<UserDTO | null>
    {
        return await userGateway.getUserById(Number(id));
    }
}