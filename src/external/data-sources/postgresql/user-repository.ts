import UserDataSource from '../../../common/interfaces/user-data-source';
import { EntityManager, Repository } from 'typeorm';
import { UserEntity } from '../../../core/entities/user';
import { AppDataSource } from './db-connect';

export class UserRepository implements UserDataSource {

  private repository: Repository<UserEntity>;

  constructor(manager: EntityManager) {
    this.repository = AppDataSource.getRepository(UserEntity);
  }

  async create(user: UserEntity): Promise<UserEntity | null> {
    return this.repository.save(user);
  }
  
  async getOne(id: number): Promise<UserEntity | null> {
    const user = await this.repository.findOneBy({id});
    if (!user) {
        throw new Error(`User with id ${id} not found`);
    }
    return user;
}

}
