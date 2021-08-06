import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserId } from './dto/find-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.usersService.create({ ...body });
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  findOne(@Param() param: UserId) {
    return this.usersService.findOne({ ...param });
  }

  @Patch('userId')
  update(@Param() param: UserId, @Body() body: UpdateUserDto) {
    return this.usersService.update({ ...param, ...body });
  }

  @Delete('userId')
  remove(@Param() param: UserId) {
    return this.usersService.remove({ ...param });
  }
}
