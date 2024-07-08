import { DataSourceOptions } from 'typeorm';
import { ProductEntity } from '../../../core/entities/product';
import { CartEntity } from '../../../core/entities/cart';
import { UserEntity } from '../../../core/entities/user';
import { CartItemEntity } from '../../../core/entities/cart-item';

const fs = require('fs')
const config: DataSourceOptions = {
  type: 'postgres',
  host: 'terraform-20240708001122858300000001.crviqyiohm3x.us-east-1.rds.amazonaws.com',
  port: 5432,
  username: 'postgres',
  password: 'fiapfase4!',
  database: 'cart-db',
  synchronize: true,
  logging: false,
  entities: [ProductEntity, CartEntity, UserEntity, CartItemEntity],
  migrations: [],
  subscribers: [],
  extra: {
    rejectUnauthorized: true,
    ca: fs.readFileSync('global-bundle.pem').toString(),
  }
};

export default config;
