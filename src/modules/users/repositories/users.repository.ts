import { User } from '../entities/user.entity';
import { Connection, EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(User)
export class UserQueryRepository extends Repository<User> {}

@Injectable()
@EntityRepository(User)
export class UserMutationRepository extends Repository<User> {}

export const UserRepositoryProviders = [
  {
    providers: [UserQueryRepository],
    inject: ['queryConnection'],
    provide: 'userQueryRepository',
    useFactory: async (connection: Connection) => {
      return connection.getCustomRepository(UserQueryRepository);
    },
  },
  {
    providers: [UserMutationRepository],
    inject: ['mutationConnection'],
    provide: 'userMutationRepository',
    useFactory: async (connection: Connection) => {
      return connection.getCustomRepository(UserMutationRepository);
    },
  },
];
