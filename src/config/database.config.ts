import 'reflect-metadata';
import { registerAs } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';
import { config } from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

config();
import path from 'path';

const {
  NODE_ENV,
  QUERY_DATABASE_HOST,
  QUERY_DATABASE_PORT,
  QUERY_DATABASE_USER,
  QUERY_DATABASE_PASSWORD,
  MUTATION_DATABASE_HOST,
  MUTATION_DATABASE_PORT,
  MUTATION_DATABASE_USER,
  MUTATION_DATABASE_PASSWORD,
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
        type: NODE_ENV === 'test' ? 'sqlite' : 'mysql',
        host:
          NODE_ENV === 'test' ? undefined : QUERY_DATABASE_HOST ?? '127.0.0.1',
        port: NODE_ENV === 'test' ? undefined : +QUERY_DATABASE_PORT ?? 3306,
        username: NODE_ENV === 'test' ? undefined : QUERY_DATABASE_USER,
        password: NODE_ENV === 'test' ? undefined : QUERY_DATABASE_PASSWORD,
        database: NODE_ENV === 'test' ? '.db/test.db' : DATABASE_NAME,
        entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
        synchronize: false,
        logging: NODE_ENV === 'test' ? false : true,
        namingStrategy: new SnakeNamingStrategy(),
      },
      mutation: {
        name: 'mutationConnection',
        type: NODE_ENV === 'test' ? 'sqlite' : 'mysql',
        host:
          NODE_ENV === 'test'
            ? undefined
            : MUTATION_DATABASE_HOST ?? '127.0.0.1',
        port: NODE_ENV === 'test' ? undefined : +MUTATION_DATABASE_PORT ?? 3306,
        username: NODE_ENV === 'test' ? undefined : MUTATION_DATABASE_USER,
        password: NODE_ENV === 'test' ? undefined : MUTATION_DATABASE_PASSWORD,
        database: NODE_ENV === 'test' ? '.db/test.db' : DATABASE_NAME,
        entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
        synchronize: NODE_ENV === 'product' ? false : true,
        logging: NODE_ENV === 'test' ? false : true,
        namingStrategy: new SnakeNamingStrategy(),
      },
    } as DatabaseConfigurations),
);
