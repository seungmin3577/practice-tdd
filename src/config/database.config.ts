import 'reflect-metadata';
import { registerAs } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';
import { config } from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

config();
import path from 'path';

const {
  NODE_ENV,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

interface DatabaseConfigurations {
  query: ConnectionOptions;
  mutation: ConnectionOptions;
}

export const databaseConfig = registerAs(
  'database',
  () =>
    ({
      query: {
        name: 'queryConnection',
        type: 'mysql',
        host: DATABASE_HOST ?? '127.0.0.1',
        port: +DATABASE_PORT ?? 3306,
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME,
        entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
        synchronize: false,
        logging: NODE_ENV === 'product' ? false : true,
        namingStrategy: new SnakeNamingStrategy(),
      },
      mutation: {
        name: 'mutationConnection',
        type: 'mysql',
        host: DATABASE_HOST ?? '127.0.0.1',
        port: +DATABASE_PORT ?? 3306,
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME,
        entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
        synchronize: NODE_ENV === 'product' ? false : true,
        logging: NODE_ENV === 'product' ? false : true,
        namingStrategy: new SnakeNamingStrategy(),
      },
    } as DatabaseConfigurations),
);
