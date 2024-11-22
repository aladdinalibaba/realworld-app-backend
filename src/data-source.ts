import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from './config';

const dataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.name,
  entities: ['./**/entity.ts'],
  synchronize: true,
});

(async () => {
  try {
    await dataSource.initialize();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Unable to connect to database:', error);
  }
})();

export default dataSource;
