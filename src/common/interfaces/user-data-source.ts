import { UserEntity } from "../../core/entities/user";

export default interface UserDataSource {
    create(user: UserEntity): Promise<UserEntity | null>;
    getOne(id: number): Promise<UserEntity | null>;
}