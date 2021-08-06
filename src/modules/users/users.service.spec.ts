import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from '../../providers/crypto.provider';
import { databaseConfig, validate } from '../../config';
import { DatabaseModule } from '../database';
import { UserRepositoryProviders } from './repositories/users.repository';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

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
    const createdUser = await service.create({
      email: 'test@naver.com',
      password: 'test',
      nickname: 'test',
    });
    expect(createdUser).toBeInstanceOf(User);
  });

  it('should be find all users', async () => {
    const users = await service.findAll();
    await expect(users[0].userId).toBe(1);
    await expect(users[0].nickname).toBe('test');
  });

  it('should be find one user', async () => {
    const user = await service.findOne({ userId: 1 });

    await expect(user?.userId).toBe(1);
    await expect(user?.nickname).toBe('test');
  });

  it('should be remove user', async () => {
    expect(await service.remove({ userId: 1 })).toBe(undefined);
  });
});
