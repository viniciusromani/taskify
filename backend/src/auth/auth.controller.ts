import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { RequestLoginDto } from './dto/request-login.dto';
import { RequestRegisterDto } from './dto/request-register.dto';
import { LocalGuard } from './guards/local.guard';
import * as ms from 'ms';
import { Response } from 'express';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalGuard)
  async login(@Body() loginDto: RequestLoginDto, @Res({ passthrough: true }) response: Response) {
    const login = await this.authService.login(loginDto);
    const expiresIn = ms('12h');

    response.cookie('authentication', login.access_token, {
      secure: false,      // not recommended for production
      httpOnly: true,
      expires: new Date(Date.now() + expiresIn as number),
    });

    return login;
  }

  @Post('register')
  async register(@Body() registerDto: RequestRegisterDto) {
    return await this.authService.register(registerDto);
  }
}
