import UserDataSource from '../../common/interfaces/user-data-source';
import { UserEntity } from '../../core/entities/user';
import { UserDTO } from '../../common/dtos/user.dto';
import { UserPresenter } from '../presenters/user';
export class UserGateway
{
    userDataSource: UserDataSource;
    constructor(userDataSource: UserDataSource){
        this.userDataSource = userDataSource;
    }

    async createUser(user: UserEntity):Promise<UserDTO | null>
    {
        const userBd = await this.userDataSource.create(user);
        if(userBd)
            {
                const userDTO = UserPresenter.toDTO(user);     
                return userDTO;
            }
        return null;
    }

    async getUserById(id: number): Promise<UserDTO | null>
    {
        const user = await this.userDataSource.getOne(id);
        if(user)
        {
            const userDTO = UserPresenter.toDTO(user);     
            return userDTO;
        }
        return null;
    }

}