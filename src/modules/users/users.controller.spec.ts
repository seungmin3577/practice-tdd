import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from '../../providers/crypto.provider';
import { databaseConfig, validate } from '../../config';
import { DatabaseModule } from '../database';
import { UserRepositoryProviders } from './repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env'],
          load: [databaseConfig],
          isGlobal: true,
          validate,
        }),
        DatabaseModule,
      ],
      controllers: [UsersController],
      providers: [UsersService, CryptoService, ...UserRepositoryProviders],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
