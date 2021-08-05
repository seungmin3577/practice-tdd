import { Inject } from '@nestjs/common';
import { Service } from 'typedi';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  UserMutationRepository,
  UserQueryRepository,
} from './repositories/users.repository';

@Service()
export class UsersService {
  constructor(
    @Inject('userQueryRepository')
    private userQueryRepository: UserQueryRepository,
    @Inject('userMutationRepository')
    private userMutationRepository: UserMutationRepository,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.userQueryRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
