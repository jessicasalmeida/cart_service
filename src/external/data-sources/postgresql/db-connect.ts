import { DataSource } from 'typeorm';
import config from './db-config';

export const AppDataSource = new DataSource(config);

AppDataSource.initialize().then(() => {
  console.log('Data Source has been initialized!');
}).catch((err) => {
  console.error('Error during Data Source initialization:', err);
});