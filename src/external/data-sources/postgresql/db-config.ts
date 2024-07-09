import { DataSourceOptions } from 'typeorm';
import { ProductEntity } from '../../../core/entities/product';
import { CartEntity } from '../../../core/entities/cart';
import { UserEntity } from '../../../core/entities/user';
import { CartItemEntity } from '../../../core/entities/cart-item';



const config: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [ProductEntity, CartEntity, UserEntity, CartItemEntity],
  migrations: [],
  subscribers: [],
};

export default config;
