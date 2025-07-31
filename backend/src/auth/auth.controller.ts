import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';
import * as ms from 'ms';

import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { RequestLoginDto } from './dto/request-login.dto';
import { RequestRegisterDto } from './dto/request-register.dto';
import { ResponseLoginDto } from './dto/response-login.dto';
import { ResponseRegisterDto } from './dto/response-register.dto';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalGuard)
  @ApiOkResponse({ description: 'Login', type: ResponseLoginDto })
  async login(
    @Body() loginDto: RequestLoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const login = await this.authService.login(loginDto);

    let expiresIn = ms('12h');
    if (process.env.JWT_EXPIRES_IN) {
      const environValue = process.env.JWT_EXPIRES_IN as ms.StringValue;
      expiresIn = ms(environValue);
    }

    response.cookie('authentication', login.access_token, {
      secure: false, // not recommended for production
      httpOnly: true,
      expires: new Date(Date.now() + expiresIn),
    });

    return new ResponseLoginDto(login, login.access_token);
  }

  @Post('register')
  @ApiOkResponse({ description: 'Register', type: ResponseRegisterDto })
  async register(@Body() registerDto: RequestRegisterDto) {
    const user = await this.authService.register(registerDto);
    return new ResponseRegisterDto(user);
  }
}
