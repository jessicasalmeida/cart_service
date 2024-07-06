import { DataSourceOptions } from 'typeorm';
import { ProductEntity } from '../../../core/entities/product';
import { CartEntity } from '../../../core/entities/cart';
import { UserEntity } from '../../../core/entities/user';

const config: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [ProductEntity, CartEntity, UserEntity],
  migrations: [],
  subscribers: [],
};

export default config;
