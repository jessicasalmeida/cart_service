import { DataSource, QueryRunner, Repository } from 'typeorm';
import ProductDataSource from '../../common/interfaces/product-data-source';
import { CartDataSource } from '../../common/interfaces/cart-data-source';
import UserDataSource from '../../common/interfaces/user-data-source';
import { UserRepository } from './postgresql/user-repository';
import { ProductRepository } from './postgresql/product-repository';
import { CartRepository } from './postgresql/cart-repository';
import { CartItemRepository } from './postgresql/cart-item-repository';
import { CartItemDataSource } from '../../common/interfaces/cart-item-data-source';

export class UnitOfWork {
  private queryRunner: QueryRunner;
  public productRepository: ProductDataSource;
  public cartRepository: CartDataSource;
  public userRepository: UserDataSource;
  public cartItemRepository: CartItemDataSource;

  constructor(private dataSource: DataSource) {
    this.queryRunner = this.dataSource.createQueryRunner();
    this.productRepository = new ProductRepository(this.queryRunner.manager);
    this.cartRepository = new CartRepository(this.queryRunner.manager);
    this.userRepository = new UserRepository(this.queryRunner.manager);
    this.cartItemRepository = new CartItemRepository(this.queryRunner.manager);
  }

  async start(): Promise<void> {
    await this.queryRunner.startTransaction();
  }

  async complete(): Promise<void> {
    try {
      await this.queryRunner.commitTransaction();
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw error;
     } 
     
     //finally {
  //    await this.queryRunner.release();
  //  }
  }

  async rollback(): Promise<void> {
    await this.queryRunner.rollbackTransaction();
   // await this.queryRunner.release();
  }
}
