import {
  BadRequestException,
  ForbiddenException,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { CryptoService } from '../../providers/crypto.provider';
import { Service } from 'typedi';
import { CreateUserDto } from './dto/create-user.dto';
import { UserId } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
  UserMutationRepository,
  UserQueryRepository,
} from './repositories/users.repository';

export enum UserErrorMessageEnum {
  NotFoundUser = '존재하지 않는 유저입니다.',
  NotMatchedPassword = '비밀번호가 맞지 않습니다.',
  NotEnteredNewPassword = '새로운 비밀번호가 입력되지 않았습니다.',
}

@Service()
export class UsersService {
  constructor(
    @Inject('userQueryRepository')
    private userQueryRepository: UserQueryRepository,
    @Inject('userMutationRepository')
    private userMutationRepository: UserMutationRepository,
    @Inject(CryptoService)
    private cryptoService: CryptoService,
  ) {}

  async create({ email, password, nickname }: CreateUserDto): Promise<User> {
    const hash = await this.cryptoService.hashing({ plainText: password });

    const _user = new User();
    _user.email = email;
    _user.password = hash;
    if (nickname) _user.nickname = nickname;
    const user = await this.userMutationRepository.save(_user);
    delete user.password;
    return user;
  }

  async update({
    userId,
    nickname,
    password,
    newPassword,
  }: UserId & UpdateUserDto): Promise<User> {
    const user = await this.userQueryRepository.findOne({ userId });
    if (!user) throw new NotFoundException(UserErrorMessageEnum.NotFoundUser);

    if (nickname) user.nickname = nickname;
    if (password) {
      if (!newPassword)
        throw new BadRequestException(
          UserErrorMessageEnum.NotEnteredNewPassword,
        );

      const isMatch = await this.cryptoService.compareHashAndPlanText({
        hash: user.password,
        plainText: password,
      });

      if (!isMatch)
        throw new ForbiddenException(UserErrorMessageEnum.NotMatchedPassword);

      user.password = await this.cryptoService.hashing({
        plainText: newPassword,
      });
    }

    return this.userMutationRepository.save(user);
  }

  async findAll(): Promise<Array<User>> {
    return this.userQueryRepository.find({
      select: ['userId', 'email', 'nickname', 'createdAt', 'updatedAt'],
    });
  }

  async findOne({ userId }: UserId) {
    const user = await this.userQueryRepository.findOne({ userId });
    if (!user) throw new NotFoundException(UserErrorMessageEnum.NotFoundUser);

    return user;
  }

  async remove({ userId }: UserId): Promise<void> {
    const user = await this.userQueryRepository.findOne({ userId });
    if (!user) throw new NotFoundException(UserErrorMessageEnum.NotFoundUser);

    console.log(user);
    const result = await this.userQueryRepository.delete(user);

    console.log(result.affected);
    return;
  }
}
