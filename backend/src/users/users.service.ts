import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { EntityNotFoundError, FindOptionsWhere, Repository } from 'typeorm';

import { RequestUserDto } from './dto/request-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: RequestUserDto) {
    const existingUser = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });
    if (existingUser) throw new ConflictException('User already exists');

    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: await hash(createUserDto.password, 10),
    });
    return await this.usersRepository.save(newUser);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findBy(where: FindOptionsWhere<UserEntity>) {
    return await this.usersRepository.findOneByOrFail(where);
  }

  async update(id: string, updateUserDto: Partial<RequestUserDto>) {
    const result = await this.usersRepository.update(id, updateUserDto);
    if (result.affected == 0) throw new NotFoundException('User not found');
    return await this.usersRepository.findOneByOrFail({ id });
  }

  async remove(id: string) {
    const result = await this.usersRepository.softDelete({ id });
    if (result.affected == 0) throw new NotFoundException('User not found');
    return true;
  }

  // AuthService helper methods
  async validateLoginUser(email: string, password: string) {
    try {
      const user = await this.usersRepository.findOneByOrFail({ email });
      const passwordsMatch = await compare(password, user.password);
      if (!passwordsMatch)
        throw new UnauthorizedException('Invalid credentials');
      return user;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new UnauthorizedException('Invalid credentials');
      }
      throw error;
    }
  }
}
