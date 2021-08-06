import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepositoryProviders } from './repositories/users.repository';
import { DatabaseModule } from '../database';
import { CryptoService } from 'src/providers/crypto.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, CryptoService, ...UserRepositoryProviders],
})
export class UsersModule {}
