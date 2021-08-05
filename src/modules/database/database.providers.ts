import { createConnection, ConnectionOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    inject: [ConfigService],
    provide: 'queryConnection',
    useFactory: async (configService: ConfigService) => {
      return await createConnection(
        configService.get('database.query') as ConnectionOptions,
      );
    },
  },
  {
    inject: [ConfigService],
    provide: 'mutationConnection',
    useFactory: async (configService: ConfigService) => {
      return await createConnection(
        configService.get('database.mutation') as ConnectionOptions,
      );
    },
  },
];
