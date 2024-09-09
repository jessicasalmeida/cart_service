import { UserGateway } from '../../operation/gateways/user';
import { UserEntity } from "../entities/user";
import { UserDTO } from '../../common/dtos/user.dto';
import { RabbitMQ } from '../../external/mq/mq';

export class UserUseCase {
    private static mq: RabbitMQ;

    constructor(mq: RabbitMQ) {
        UserUseCase.mq = mq;
    }


    static executeCreate(name: string, cpf: string, email: string, cep: string, telefone: string, userGateway: UserGateway): Promise<UserDTO | null> {
        const novoId = 0;
        const newUser = new UserEntity(
            Number(novoId),
            cpf,
            name,
            email,
            cep,
            telefone
        )
        return userGateway.createUser(newUser);
    }

    static async executeGetOne(id: string, userGateway: UserGateway): Promise<UserDTO | null> {
        return await userGateway.getUserById(Number(id));
    }

    static async deleteUser(id: string, userGateway: UserGateway): Promise<UserDTO | null> {
        const user = await userGateway.getUserById(Number(id));
        if (user) {
            UserUseCase.mq = new RabbitMQ();
            await UserUseCase.mq.connect();
            await UserUseCase.mq.publish('delete_user', { user: user });
            await UserUseCase.mq.close();
        }
        return user;
    }
}