import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { User } from '../auth/decorators/user.decorator';
import { RequestUserDto } from './dto/request-user.dto';
import { ResponseUserDTO } from './dto/response-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // this is for httponly auth cookie renew session on frontend
  @Get('me')
  @ApiOkResponse({ description: 'User session', type: ResponseUserDTO })
  findMe(@User() user: UserEntity) {
    return new ResponseUserDTO(user);
  }

  @Post()
  @ApiOkResponse({ description: 'Created user', type: ResponseUserDTO })
  async create(@Body() createUserDto: RequestUserDto) {
    const createdUser = await this.usersService.create(createUserDto);
    return new ResponseUserDTO(createdUser);
  }

  @Get()
  @ApiOkResponse({
    description: 'A list of users',
    type: ResponseUserDTO,
    isArray: true,
  })
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user: UserEntity) => new ResponseUserDTO(user));
  }

  @Get(':id')
  @ApiOkResponse({ description: 'A user', type: ResponseUserDTO })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.usersService.findBy({ id });
    return new ResponseUserDTO(user);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'An updated user', type: ResponseUserDTO })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: Partial<RequestUserDto>,
  ) {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    return new ResponseUserDTO(updatedUser);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.usersService.remove(id);
    if (result) return;
  }
}
