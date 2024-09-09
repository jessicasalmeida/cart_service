import { DataSourceOptions } from 'typeorm';
import { ProductEntity } from '../../../core/entities/product';
import { CartEntity } from '../../../core/entities/cart';
import { UserEntity } from '../../../core/entities/user';
import { CartItemEntity } from '../../../core/entities/cart-item';
import * as dotenv from "dotenv";
import { readFileSync } from 'fs';

dotenv.config();
const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_CONN_STRING,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [ProductEntity, CartEntity, UserEntity, CartItemEntity],
  migrations: [],
  subscribers: [],

};

export default config;
