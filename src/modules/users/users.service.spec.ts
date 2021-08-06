import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from '../../providers/crypto.provider';
import { databaseConfig, validate } from '../../config';
import { DatabaseModule } from '../database';
import { UserRepositoryProviders } from './repositories/users.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env.test'],
          load: [databaseConfig],
          isGlobal: true,
          validate,
        }),
        DatabaseModule,
      ],
      providers: [UsersService, CryptoService, ...UserRepositoryProviders],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be created user', async () => {
    expect(
      await service.create({
        email: 'test@naver.com',
        password: 'test',
        nickname: 'test',
      }),
    ).toEqual('This action adds a new user');
  });

  it('should be find all users', async () => {
    expect(await service.findAll()).toEqual([]);
  });

  it('should be find one user', async () => {
    expect(await service.findOne({ userId: 1 })).toEqual(
      'This action returns a #1 user',
    );
  });

  it('should be remove user', async () => {
    expect(await service.remove({ userId: 1 })).toEqual(
      'This action removes a #1 user',
    );
  });
});
