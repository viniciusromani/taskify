import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { EntityNotFoundError } from 'typeorm';

import { RequestLoginDto } from './dto/request-login.dto';
import { RequestRegisterDto } from './dto/request-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async login(loginDto: RequestLoginDto) {
    const user = await this.userService.findBy({
      email: loginDto.email,
    });
    const accessToken = await this.jwtService.signAsync({ sub: user.id });
    return { ...user, access_token: accessToken };
  }

  async register(registerDto: RequestRegisterDto) {
    return await this.userService.create(registerDto);
  }

  // guard helper methods
  async validateUserPassword(email: string, password: string) {
    return await this.userService.validateLoginUser(email, password);
  }

  async validateUserJwt(userId: string) {
    try {
      return await this.userService.findBy({ id: userId });
    } catch (error) {
      // catching to return unauthorized instead of notfound
      if (error instanceof EntityNotFoundError)
        throw new UnauthorizedException('user not found');

      throw error;
    }
  }
}
